# CQSV Apps Script Shell

Marketplace de Claude Code para iniciar una aplicación web local de Google Apps Script con el shell CQSV.

## Instalar en Claude Code Desktop

```text
/plugin marketplace add arturoperezrosales/cqsv-app-shell
/plugin install cqsv@gan-cqsv-app-shell
```

Abre el proyecto de trabajo en Claude Desktop → Code e invoca:

```text
/cqsv init
```

La skill utiliza la sesión de Claude que ya está iniciada en la app; cada colaborador se autentica con su propia cuenta. La app de Apps Script usa su propio login Google y lista de accesos.

## Qué crea

Copia `Code.gs`, `Index.html` y `appsscript.json` en una carpeta vacía. Si `src/` ya tiene archivos, propone `templates/cqsv-shell/src/`. Si faltan Node.js, npm o clasp, deja el shell creado y muestra las instrucciones para instalarlos. No instala paquetes, inicia sesión en Google ni despliega automáticamente.

El manifiesto de Apps Script deja acceso inicial restringido a `MYSELF`. Revisa `plugins/cqsv/SKILL.md` y `plugins/cqsv/references/prerequisites.md` antes de ampliar la audiencia o ejecutar `clasp push`.
