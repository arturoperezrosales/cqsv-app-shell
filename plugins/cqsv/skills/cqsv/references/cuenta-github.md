# Crear tu cuenta de GitHub

Guía para acompañar a una persona que no tiene cuenta de GitHub. La persona hace todo en su navegador. Claude explica cada paso y comprueba el resultado.

## Antes de empezar

- Para usar CQSV no necesitas GitHub. El repositorio del plugin es público.
- `/cqsv init`, `/cqsv:construir` y `/cqsv:publicar` funcionan sin cuenta de GitHub. Para publicar se usa tu cuenta de Google.
- Pregunta primero: «¿Ya tienes cuenta de GitHub?». Espera la respuesta.
- Si ya tiene cuenta, no le expliques cómo crearla. Ve a [Si Claude Desktop pide conectar GitHub](#si-claude-desktop-pide-conectar-github) solo si Claude Desktop se lo pidió. Si no, termina aquí.
- Da un paso a la vez. Espera a que la persona diga «listo» antes de seguir.

## Lo que hace la persona y lo que hace Claude

- La persona crea la cuenta, escribe su contraseña y resuelve la prueba de seguridad.
- La persona escribe en la página de GitHub el código que llega a su correo.
- Claude no crea la cuenta ni inicia sesión por la persona.
- Claude no escribe ni pide contraseñas, códigos del correo, códigos de recuperación ni tokens.
- Claude no ejecuta `gh auth login` ni conecta GitHub desde la terminal.
- Si la persona escribe una contraseña o un código en la conversación, no lo uses. Pídele que no lo comparta. Si fue su contraseña, sugiérele cambiarla en GitHub.

## Crear la cuenta

1. Abre [github.com/signup](https://github.com/signup) en tu navegador.
2. Elige cómo registrarte:
   - **Con Google:** pulsa **Continue with Google** y elige tu cuenta. Es lo más sencillo si ya usas Google.
   - **Con tu correo:** escribe tu correo, una contraseña nueva y un nombre de usuario.
3. Elige bien el nombre de usuario. Todos pueden verlo. Usa algo sencillo, como tu nombre y apellido.
4. GitHub puede mostrar una prueba para comprobar que eres una persona. Resuélvela tú.
5. GitHub te envía un correo con un código. Escríbelo en la página de GitHub. No lo copies aquí.
6. ¿No llega el correo? Espera unos minutos y revisa spam o promociones. Si sigue sin llegar, prueba con otro correo. Los correos temporales no funcionan.
7. Cuando veas tu página de inicio de GitHub, la cuenta está lista. Dile a Claude tu nombre de usuario.

## Verificar el correo

1. En GitHub, pulsa tu foto, arriba a la derecha.
2. Entra a **Settings** y luego a **Emails**.
3. Si tu correo dice **Unverified**, pulsa **Resend verification email**.
4. Abre el correo de GitHub y pulsa el enlace. El enlace vence en 24 horas.
5. Vuelve a **Emails**. Ya no debe decir **Unverified**.

Sin el correo verificado, GitHub no te deja crear repositorios ni recibir avisos.

## Comprobar el resultado

- Con el nombre de usuario, consulta sin credenciales `https://api.github.com/users/<usuario>`. Si responde, la cuenta existe. Si no aparece, revisa con la persona cómo lo escribió.
- Claude no puede ver si el correo ya está verificado. Pregúntale a la persona si en **Emails** ya no dice **Unverified**.
- Termina con un resumen corto: la cuenta existe, el correo está verificado y CQSV no necesita nada más de GitHub.

## Si Claude Desktop pide conectar GitHub

Esto solo pasa con repositorios privados. El repositorio de CQSV es público, así que no debería aparecer al agregarlo.

1. En el aviso de Claude Desktop, pulsa el botón para conectar GitHub (en inglés, **Connect GitHub**).
2. Se abre GitHub en tu navegador. Inicia sesión tú.
3. Si te pide instalar la app de Claude en GitHub (**Install the Claude GitHub App**), dale acceso solo al repositorio que necesitas.
4. Aprueba en GitHub y vuelve a Claude Desktop.
5. Intenta de nuevo agregar el repositorio en **Personalización → Plugins**.

Claude comprueba el resultado preguntando si el plugin ya aparece en la lista.

## Más adelante

GitHub puede pedirte activar la verificación en dos pasos. Hazlo tú, con una app en tu celular. Guarda los códigos de recuperación en un lugar seguro. No los compartas con Claude.

## Referencias oficiales

- [GitHub: crear una cuenta](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github)
- [GitHub: verificar tu correo](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/verifying-your-email-address)
- [Claude: plugins y repositorios privados de GitHub](https://claude.com/docs/plugins/overview)
