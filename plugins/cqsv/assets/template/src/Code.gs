const APP = Object.freeze({
  name: 'CQSV · Área de trabajo',
  brand: 'COMPROMISO QUE SUMA VALOR',
  version: '0.1.0'
});

const ACCESS_KEY_ = 'CQSV_USERS';
const ROLES_ = Object.freeze({ ADMIN: 'Administración', EDITOR: 'Edición', VIEWER: 'Consulta' });

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle(APP.name)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/** Run once from the Apps Script editor while web-app access is restricted to the deployer. */
function bootstrapInitialAdmin() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty(ACCESS_KEY_)) {
    throw new Error('La lista de accesos ya está inicializada. No se hicieron cambios.');
  }
  const email = String(Session.getEffectiveUser().getEmail() || '').trim().toLowerCase();
  if (!email) throw new Error('Google no devolvió el correo del propietario. Revisa la cuenta que ejecuta el proyecto.');
  const users = {};
  users[email] = { name: 'Administración', role: 'ADMIN', active: true, createdAt: new Date().toISOString() };
  props.setProperty(ACCESS_KEY_, JSON.stringify(users));
  return 'Administrador inicial configurado: ' + email;
}

function getCurrentSession() {
  const email = currentEmail_();
  if (!email) return { status: 'identity-unavailable' };
  const users = readUsers_();
  if (!Object.keys(users).length) return { status: 'setup-required', email: email };
  const user = users[email];
  if (!user || user.active !== true) return { status: 'denied', email: email };
  return { status: 'ready', user: publicUser_(email, user) };
}

function listAccessUsers() {
  requireAdmin_();
  const users = readUsers_();
  return Object.keys(users).sort().map(function (email) { return publicUser_(email, users[email]); });
}

function saveAccessUser(input) {
  const actor = requireAdmin_();
  const email = String(input && input.email || '').trim().toLowerCase();
  const name = String(input && input.name || '').trim();
  const role = String(input && input.role || '');
  const active = input && input.active !== false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Escribe un correo válido.');
  if (!name || name.length > 100) throw new Error('Escribe un nombre de hasta 100 caracteres.');
  if (!Object.prototype.hasOwnProperty.call(ROLES_, role)) throw new Error('El rol seleccionado no es válido.');
  if (email === actor.email && (active !== true || role !== 'ADMIN')) {
    throw new Error('No puedes desactivar ni cambiar tu propio rol de administración.');
  }

  const users = readUsers_();
  const previous = users[email];
  users[email] = {
    name: name,
    role: role,
    active: Boolean(active),
    createdAt: previous ? previous.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  ensureActiveAdmin_(users);
  writeUsers_(users);
  return listAccessUsers();
}

function requireUser_() {
  const session = getCurrentSession();
  if (session.status !== 'ready') throw new Error('NO_AUTORIZADO:' + (session.email || session.status));
  return session.user;
}

function requireAdmin_() {
  return requireRole_(['ADMIN']);
}

function requireRole_(allowedRoles) {
  const user = requireUser_();
  if (!Array.isArray(allowedRoles) || allowedRoles.indexOf(user.role) < 0) {
    throw new Error('SIN_PERMISO:Tu cuenta no tiene el rol necesario para esta acción.');
  }
  return user;
}

function currentEmail_() {
  return String(Session.getActiveUser().getEmail() || '').trim().toLowerCase();
}

function readUsers_() {
  const raw = PropertiesService.getScriptProperties().getProperty(ACCESS_KEY_);
  if (!raw) return {};
  try {
    const data = JSON.parse(raw);
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch (error) {
    throw new Error('La configuración de accesos no se puede leer. Revisa la propiedad ' + ACCESS_KEY_ + '.');
  }
}

function writeUsers_(users) {
  PropertiesService.getScriptProperties().setProperty(ACCESS_KEY_, JSON.stringify(users));
}

function publicUser_(email, user) {
  return {
    email: email,
    name: String(user.name || ''),
    role: ROLES_[user.role] ? user.role : 'VIEWER',
    roleLabel: ROLES_[user.role] || ROLES_.VIEWER,
    active: user.active === true,
    createdAt: String(user.createdAt || '')
  };
}

function ensureActiveAdmin_(users) {
  const activeAdmins = Object.keys(users).filter(function (email) {
    return users[email].active === true && users[email].role === 'ADMIN';
  });
  if (!activeAdmins.length) throw new Error('Debe quedar al menos una cuenta administradora activa.');
}
