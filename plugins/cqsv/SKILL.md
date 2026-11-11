---
name: cqsv
description: Initialize a minimal CQSV Google Apps Script web app shell with Google account sign-in and server-enforced user access. Use when someone invokes `/cqsv init`, `/cqsv:construir`, or asks to start a CQSV Apps Script project from the approved shell.
argument-hint: "init [destination]"
---

# CQSV Apps Script shell

This skill scaffolds the small Google Apps Script web app shell stored beside this file. It does not add business modules or connect to Claude by API.

## `/cqsv init [destination]`

When `$ARGUMENTS` starts with `init`:

1. Resolve the optional destination after `init`. If the user gave a path, use it. Otherwise, use `src/` when it does not exist or is empty. If `src/` already contains files, use `templates/cqsv-shell/src/` as the template destination.
2. Inspect the destination before writing. If it contains files that exactly match all three template files, report that the shell is already initialized and make no changes. If any other files or differing contents are present, do not overwrite, delete, or merge them. Tell the user which files conflict and ask for an empty destination path. This rule protects existing applications and live Apps Script configurations.
3. Copy the three files from this skill's `assets/template/src/` directory into the destination, preserving their names: `Code.gs`, `Index.html`, and `appsscript.json`. Use paths relative to this `SKILL.md`; do not reconstruct or simplify the access checks.
4. Check `node --version`, `npm --version`, and `clasp --version`. The template can be generated without Node, npm, or clasp. If a command is missing, leave the files in place and give the relevant setup steps from [references/prerequisites.md](references/prerequisites.md). Do not install packages automatically.
5. Explain the next manual setup steps from [references/prerequisites.md](references/prerequisites.md). Do not run `clasp login`, `clasp create`, `clasp push`, or deploy without the user explicitly asking for that action in this session.

If the user invokes `/cqsv` without `init`, explain the requirement interview `/cqsv:construir`, local-shell command `/cqsv init`, and guided deployment skill `/cqsv:publicar`. The deployment skill stops at any existing `.clasp.json` and never points to an existing Apps Script project by guessing. If arguments specify a different destination, preserve the exact path and resolve it relative to the current project root unless the user gave an absolute path.

## Access and account boundaries

- Claude authentication belongs to the current Claude Code session in Claude Desktop. Never ask for, read, write, or store Claude passwords, cookies, API keys, or session tokens.
- The template's web app identifies people through their signed-in Google account. It has no local password field or custom Google OAuth implementation.
- Do not claim Google identity is available unless the Apps Script deployment and Workspace policy expose it. The UI has a distinct identity-unavailable state.
- Access decisions are enforced in server functions. UI hiding is not authorization. Preserve the `requireUser_` / `requireAdmin_` checks and apply them to every new server-side function that reads or changes private data.
- Default deployment is restricted to the deployer (`MYSELF`) and runs as the active user (`USER_ACCESSING`). Do not broaden access to `DOMAIN`, `ANYONE`, or anonymous visitors without an explicit instruction and a deployment review.
- The initial administrator is bootstrapped by running `bootstrapInitialAdmin` once from the Apps Script editor as the trusted owner, while deployment access is still restricted to the deployer (`MYSELF`). The function is not called by the UI, and it refuses to run after initialization. Do not broaden the deployment audience first.
- `clasp push` replaces the remote Apps Script project files. Always inspect `clasp show-file-status` and the `.clasp.json` target before pushing; do not point this template at a production project by guessing.
