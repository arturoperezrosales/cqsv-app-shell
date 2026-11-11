# CQSV Apps Script Shell

Plugin público de Claude Code para iniciar una web app local de Google Apps Script con el shell CQSV.

## Instalar en Claude Desktop

1. Abre **Customize → Plugins** y selecciona **Add marketplace**.
2. Agrega el repositorio `arturoperezrosales/cqsv-app-shell`.
3. Agrega el plugin `cqsv`.
4. Abre **Code** y elige la carpeta local del proyecto.

## Iniciar el proyecto

En la carpeta elegida, ejecuta `/cqsv init`. Claude crea `Code.gs`, `Index.html` y `appsscript.json`. Este paso no conecta con Google ni despliega.

## Conectar y publicar

Cuando el shell esté listo, ejecuta `/cqsv:publicar`. Claude guía la instalación de lo que falte, inicia el login de Google, pide confirmación antes de crear un proyecto Apps Script independiente, sube los archivos revisados y prepara una implementación con acceso solo para la cuenta propietaria.

El primer acceso requiere que la persona propietaria ejecute una vez `bootstrapInitialAdmin` desde el editor de Apps Script. Claude abre el editor y la guía. La skill nunca amplía la audiencia a todo el dominio ni habilita acceso anónimo.

La sesión de Claude usa la cuenta iniciada en Claude Desktop. La web app identifica a las personas con su cuenta Google; son accesos separados.

## Protección del proyecto

- Si la carpeta ya contiene `.clasp.json`, la skill se detiene para no modificar un proyecto existente.
- El archivo `.clasp.json` contiene el vínculo al proyecto Apps Script y se mantiene local, fuera de Git.
- El manifiesto inicia con `MYSELF` y ejecuta como `USER_ACCESSING`.
- Node.js 20 o posterior es requisito para clasp. Si falta, Claude explica cómo instalarlo desde la fuente oficial y espera a que esté disponible.
