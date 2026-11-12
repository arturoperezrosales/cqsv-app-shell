# CQSV Apps Script Shell

Plugin de Claude Code para iniciar y publicar una web app local de Google Apps Script con el shell CQSV.

## Instalar en Claude Desktop

1. Abre **Customize → Plugins** y selecciona **Add marketplace**.
2. Agrega `arturoperezrosales/cqsv-app-shell` y el plugin `cqsv`.
3. Abre **Code** y elige la carpeta local del proyecto.

## Flujo de trabajo

1. **Definir la necesidad:** ejecuta `/cqsv:construir`. Claude hace preguntas sencillas, una por una, resume el requisito y espera tu confirmación antes de escribir código.
2. **Elegir dónde vivirá:** `/cqsv init` pregunta si necesitas una app con su propia pantalla, una hoja de cálculo o un documento. También puedes indicarlo al iniciar, por ejemplo `/cqsv init app`. El shell de app y su skill de publicación están listos; Sheets y Docs requieren un flujo de inicio propio.
3. **Publicar:** ejecuta `/cqsv:publicar`. Claude verifica requisitos, te guía en el login de Google y prepara una implementación nueva, inicialmente privada para la cuenta propietaria.

La skill de construcción puede guardar el brief confirmado en `docs/requisito.md`. Usa ejemplos inventados; no compartas datos financieros reales durante la práctica.

## Acceso y protección

- El acceso inicial de Apps Script queda limitado a la persona propietaria. El primer acceso requiere ejecutar `bootstrapInitialAdmin` una vez desde el editor; Claude guía ese paso.
- La skill de publicación se detiene si encuentra un `.clasp.json` existente para evitar modificar otro proyecto.
- El archivo `.clasp.json` contiene el vínculo al proyecto Apps Script y se mantiene local, fuera de Git.
- El manifiesto inicia con `MYSELF` y ejecuta como `USER_ACCESSING`.
- Node.js 20 o posterior es requisito para clasp. Si falta, Claude explica cómo instalarlo y espera a que esté disponible.
- La sesión de Claude y el login Google de la app son cuentas distintas.
