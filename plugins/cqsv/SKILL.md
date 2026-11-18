---
name: cqsv
description: Help choose and initialize a CQSV solution for a web app, Google Sheet, or Google Doc. Use when someone invokes `/cqsv init`, `/cqsv:construir`, or asks to start a CQSV Apps Script project. Also use for `/cqsv github` when someone in the CQSV course needs help creating a GitHub account.
argument-hint: "init [app|sheets|docs] [destination] | github"
---

# CQSV project starter

Help the person choose where the solution should live before preparing files. The person should not need to know technical terms. Do not assume every solution needs a separate web app or login.

## `/cqsv init [app|sheets|docs] [destination]`

When `$ARGUMENTS` starts with `init`:

1. Determine the target from the optional argument or a confirmed `docs/requisito.md`. Accept simple aliases such as `app`, `web`, `hoja`, `sheets`, `documento`, and `docs`.
2. If the target is still unknown, ask one plain-language question and wait: «¿Dónde quieres que viva el resultado? En una app con su propia pantalla, dentro de una hoja de cálculo, o en un documento de Google». Explain briefly that a separate app has its own screen, while Sheets or Docs automation works inside that file. Do not write files until the person chooses.
3. If they choose a web app, resolve the optional destination after the target. If no path was given, use `src/` when it does not exist or is empty; if `src/` already contains files, use `templates/cqsv-shell/src/`.
4. Inspect the web app destination before writing. If it contains files that exactly match all three template files, report that the shell is already initialized and make no changes. If any other files or differing contents are present, do not overwrite, delete, or merge them. Tell the person which files conflict and ask for an empty destination path.
5. For a web app, copy the three files from this skill's `assets/template/src/` directory: `Code.gs`, `Index.html`, and `appsscript.json`. Use paths relative to this `SKILL.md`; do not reconstruct or simplify the access checks.
6. If they choose a Google Sheet or Doc, do not copy the web app shell or its login screen. This version of the plugin has no approved Sheet or Doc starter yet. Say so simply, keep the confirmed target in mind, and continue with `/cqsv:construir` to define and build the local solution. Do not claim that `/cqsv:publicar` can connect or publish that kind of project; it currently handles web apps only.
7. For the web app shell, check `node --version`, `npm --version`, and `clasp --version`. It can be generated without these tools. If one is missing, leave the files in place and give the relevant setup steps from [references/prerequisites.md](references/prerequisites.md). Do not install packages automatically.
8. Explain the next steps in everyday language. Do not run `clasp login`, `clasp create`, `clasp push`, or deploy without the user explicitly asking for that action in this session.

If the user invokes `/cqsv` without `init` or `github`, explain the requirement interview `/cqsv:construir`, target choice in `/cqsv init`, and guided web app publishing skill `/cqsv:publicar`. Mention `/cqsv github` only as optional help for creating a GitHub account, which CQSV does not need. The deployment skill stops at any existing `.clasp.json` and never points to an existing Apps Script project by guessing. If arguments specify a different destination, preserve the exact path and resolve it relative to the current project root unless the user gave an absolute path.

## `/cqsv github`

Use this when `$ARGUMENTS` starts with `github`, when the person asks for help creating a GitHub account, or when they say Claude Desktop is asking them to connect GitHub. Speak in short, plain Spanish sentences.

1. First say that CQSV does not need a GitHub account. The plugin repository is public. `/cqsv init`, `/cqsv:construir`, and `/cqsv:publicar` work without one, and publishing uses their Google account.
2. Ask one question and wait: «¿Ya tienes cuenta de GitHub?».
3. If they already have one, skip account creation. Continue only with the «Si Claude Desktop pide conectar GitHub» section of [references/cuenta-github.md](references/cuenta-github.md), and only if Claude Desktop asked them to connect GitHub. Otherwise stop.
4. If they do not have one and still want it, follow [references/cuenta-github.md](references/cuenta-github.md) one step at a time. Wait for the person to say they finished each step before giving the next.
5. Check the result as the reference describes: confirm the public username exists without credentials, and ask the person to confirm that the email is verified.
6. Do not offer to create repositories, upload this project to GitHub, or set up Git. That is outside this plugin's flow.

## Access and account boundaries

- Claude authentication belongs to the current Claude Code session in Claude Desktop. Never ask for, read, write, or store Claude passwords, cookies, API keys, or session tokens.
- A GitHub account belongs to the person. Never create it, sign in for them, solve its verification puzzle, or type, ask for, or store GitHub passwords, email codes, recovery codes, or tokens. Do not run `gh auth login`. The person does each step in their own browser; Claude guides and checks only public results.
- The template's web app identifies people through their signed-in Google account. It has no local password field or custom Google OAuth implementation.
- Do not claim Google identity is available unless the Apps Script deployment and Workspace policy expose it. The UI has a distinct identity-unavailable state.
- Access decisions are enforced in server functions. UI hiding is not authorization. Preserve the `requireUser_` / `requireAdmin_` checks and apply them to every new server-side function that reads or changes private data.
- Default deployment is restricted to the deployer (`MYSELF`) and runs as the active user (`USER_ACCESSING`). Do not broaden access to `DOMAIN`, `ANYONE`, or anonymous visitors without an explicit instruction and a deployment review.
- The initial administrator is bootstrapped by running `bootstrapInitialAdmin` once from the Apps Script editor as the trusted owner, while deployment access is still restricted to the deployer (`MYSELF`). The function is not called by the UI, and it refuses to run after initialization. Do not broaden the deployment audience first.
- `clasp push` replaces the remote Apps Script project files. Always inspect `clasp show-file-status` and the `.clasp.json` target before pushing; do not point this template at a production project by guessing.
