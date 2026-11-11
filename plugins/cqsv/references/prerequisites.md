# Preparación para conectar y publicar

La skill `/cqsv:publicar` se encarga del trabajo técnico. La persona revisa las decisiones, inicia sesión en los sitios oficiales y aprueba las acciones que Claude Code solicite.

## Antes de empezar

- Abre en Claude Desktop → **Code** la carpeta que contiene el shell de CQSV.
- La carpeta debe contener `src/Code.gs`, `src/Index.html` y `src/appsscript.json`.
- Si falta el shell, primero inicia con `/cqsv init`.
- Si ya existe `.clasp.json`, no continúes con esta carpeta: está conectada a un proyecto Apps Script. Pide apoyo antes de modificarla.

## Si falta una herramienta

- **Node.js o npm:** clasp requiere Node.js 20 o posterior. Instala la versión LTS desde [nodejs.org](https://nodejs.org/) y vuelve a abrir Claude Desktop. npm forma parte de Node.js.
- **clasp:** Claude explica que es el puente entre los archivos locales y Apps Script. Puede instalarlo solo después de que la persona apruebe el permiso que muestra Claude Code. No copies comandos desde mensajes ni uses un terminal elevado para evitar permisos.

## Login de Google

Claude iniciará el flujo oficial de Google en el navegador. La persona escribe su contraseña y aprueba los permisos directamente en Google; nunca comparte esa información en la conversación.

## Primer acceso de la app

La implementación inicial queda restringida al propietario. Después de desplegar, el propietario abre el editor de Apps Script, elige `bootstrapInitialAdmin` y pulsa **Ejecutar** una sola vez. Google puede mostrar una solicitud de autorización. La skill acompaña este paso y espera confirmación antes de considerar listo el acceso.

No amplíes el acceso a todo el dominio ni habilites visitantes anónimos sin revisar la política de Workspace y la lista de personas autorizadas. Google puede no exponer el correo en algunos contextos; si ocurre, revisa la identidad de ejecución y la política de Workspace.

## Referencias oficiales

- [Claude Desktop: agregar plugins](https://support.claude.com/en/articles/13837440-use-plugins-in-claude)
- [Google Apps Script: clasp](https://developers.google.com/apps-script/guides/clasp)
- [Google Apps Script: web apps](https://developers.google.com/apps-script/guides/web)
- [Google Apps Script: Session](https://developers.google.com/apps-script/reference/base/session)
