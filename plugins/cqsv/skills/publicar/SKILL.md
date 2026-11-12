---
name: publicar
description: Conecta y publica un shell local de CQSV como una nueva web app de Google Apps Script, guiando el login de Google y manteniendo el acceso restringido al propietario. Use when someone invokes `/cqsv:publicar`.
argument-hint: "[nombre del proyecto]"
---

# Publicar el shell CQSV

Guía a una persona no técnica para conectar el shell local a Google Apps Script y crear su primera implementación. Explica cada etapa con palabras sencillas; no le pidas ejecutar comandos manualmente. La persona autoriza los pasos con Claude Code cuando aparezcan permisos de herramientas y realiza en su navegador los inicios de sesión de Google.

## Reglas que protegen el proyecto

- Trabaja desde la carpeta del proyecto abierta en Claude Code Desktop.
- Usa exclusivamente un proyecto de Apps Script nuevo y dedicado a esta carpeta. Nunca reutilices ni adivines el `.clasp.json` de otro proyecto. Si encuentras `.clasp.json` en la raíz del proyecto o en una carpeta superior, detente.
- Si existe `.clasp.json`, detente antes de llamar a `clasp`. No leas ni muestres su contenido ni el ID. Explica que esta carpeta ya está conectada y pregunta qué quiere hacer la persona.
- No ejecutes `clasp push` sobre un proyecto existente. La creación de un proyecto nuevo debe completarse antes de subir los archivos.
- Conserva `executeAs: USER_ACCESSING` y `access: MYSELF`. No amplíes el acceso al dominio ni habilites acceso anónimo.
- No pidas ni manejes contraseñas de Google o Claude, códigos de verificación, tokens, llaves API ni credenciales. La persona completa el login de Google en el navegador oficial.
- No publiques el ID de Apps Script. Mantén `.clasp.json` fuera de Git; nunca lo imprimas ni lo leas en la conversación.
- No cambies otros archivos, despliegues o proyectos de Apps Script.

## Flujo guiado

1. Confirma que la carpeta abierta es la que la persona quiere publicar. Busca los tres archivos en `src/` o `templates/cqsv-shell/src/`. Usa la carpeta que contenga `Code.gs`, `Index.html` y `appsscript.json`; si ambas los tienen, pregunta cuál quiere publicar. Si ninguna los tiene, detente y ofrece iniciar con `/cqsv init`.
2. Revisa `appsscript.json`. Si el acceso no es `MYSELF` o la ejecución no es `USER_ACCESSING`, detente y explica que el shell debe empezar restringido al propietario.
3. Revisa si hay un `.clasp.json` en la raíz del proyecto o en sus carpetas superiores, sin leer su contenido. Si ya existe, aplica la regla de protección anterior.
4. Si el proyecto usa Git, confirma que `.clasp.json` no está seguido por Git. Agrega solo la línea `.clasp.json` a `.gitignore`, sin reemplazar otras reglas. Si ya estaba seguido, detente y avisa para que el equipo resuelva el secreto antes de continuar.
5. Verifica `node --version`, `npm --version` y `clasp --version`. Google Apps Script requiere Node.js 20 o posterior para clasp. Si falta Node.js o npm, detente y guía a la persona para instalar Node.js LTS desde [nodejs.org](https://nodejs.org/); indícale que cierre y vuelva a abrir Claude Desktop después. Si falta clasp, explícale que es el conector de Google y pide permiso antes de instalar el paquete oficial `@google/clasp` con npm. Solo después de su aprobación ejecuta `npm install -g @google/clasp`. No instales software sin su aprobación.
6. Comprueba solo si existe el archivo de sesión de clasp en el perfil de la persona; nunca leas su contenido. Si no existe, o la autenticación falla, solicita permiso para iniciar `clasp login`. Deja que la persona se autentique y apruebe los scopes en la página oficial de Google. No escribas ni solicites credenciales.
7. Propón un título legible para el proyecto, usando el nombre de la carpeta si no se indicó uno. Antes de crear el proyecto remoto, pregunta de forma sencilla: «Voy a crear en tu Google Drive un proyecto Apps Script nuevo para esta app, subir sus archivos y publicar una primera versión que solo tú podrás abrir. ¿Continúo?» Espera un sí explícito.
8. Tras la confirmación, ejecuta desde la raíz del proyecto `clasp create --type webapp --title "<título elegido>" --rootDir "<carpeta elegida>"` para crear el proyecto web independiente. La carpeta elegida puede ser `src` o `templates/cqsv-shell/src`. Ninguna carpeta superior debe contener `.clasp.json`; el nuevo proyecto debe quedar asociado a esta carpeta.
9. Ejecuta `clasp show-file-status`. Confirma que el proyecto remoto nuevo está vacío y que solo están pendientes los tres archivos del shell. Si aparece cualquier otro archivo o destino inesperado, detente y pregunta.
10. Después de confirmar esos tres archivos, ejecuta `clasp push`, crea una versión con `clasp version`, toma el número devuelto y publica con `clasp deploy <versión>`. No uses `--force` ni cambies el manifiesto.
11. Usa `clasp deployments` para encontrar la implementación recién creada y arma su enlace web; el ID solo debe aparecer como parte del enlace, nunca por separado. Devuelve el enlace de la app. Abre el editor con `clasp open-script` y guía a la persona para ejecutar `bootstrapInitialAdmin` una vez: selecciona la función, pulsa **Ejecutar** y aprueba la autorización de Google. Esta función registra la cuenta propietaria como administradora inicial.
12. Indica que, hasta que termine el bootstrap, la app mostrará que falta configurar el acceso. Espera a que la persona confirme que ya lo ejecutó antes de declarar el acceso inicial listo. El acceso continúa restringido a `MYSELF`.
13. Termina explicando en lenguaje cotidiano qué se creó, dónde quedó la copia local y qué acceso tiene la web app. Si algo falla, detente en el paso actual y reporta qué se completó; no repitas `create`, `push` o `deploy` a ciegas.

Para una persona usuaria, resume `clasp` como «la herramienta que lleva los archivos de esta carpeta a tu proyecto nuevo de Apps Script». No le presentes los comandos como tarea ni le pidas administrar IDs.
