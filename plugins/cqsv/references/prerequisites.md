# Setup after `/cqsv init`

## Claude Code account

Use Claude Code in the Claude Desktop app. Each collaborator signs in with their own Claude account and opens the project folder in the Code tab. The skill uses that existing session; it does not create or connect Claude accounts. Availability depends on the user's plan and organization settings.

## Node.js, npm, and clasp

The shell files are plain Apps Script files, so they can be scaffolded even when these tools are absent.

1. Check the tools in a new terminal:

   ```text
   node --version
   npm --version
   clasp --version
   ```

2. If `node` or `npm` is missing, install the current Node.js LTS release from [nodejs.org](https://nodejs.org/), then open a new terminal and check again.
3. If only `clasp` is missing, install the official CLI:

   ```text
   npm install -g @google/clasp
   ```

4. If a command is not recognized after installation, close and reopen the terminal so its PATH is refreshed. For permission or managed-device errors, stop and follow the organization's software-installation process; do not work around it with an elevated shell.

## Google identity and access

1. Create or select a dedicated Apps Script project. Keep its `src/` separate from other projects.
2. Deploy the first web-app version restricted to the deployer. Keep the manifest's `executeAs` set to `USER_ACCESSING`.
3. While deployment access is still restricted to the deployer, run `bootstrapInitialAdmin` once in the Apps Script editor as the trusted project owner. The UI never calls this one-time initializer. Review the authorization prompt and grant only the scopes shown for this project.
4. Open the test deployment with the owner account. Confirm the account and administrator role appear.
5. Before inviting coworkers, choose the web-app audience in the deployment settings. If the project needs a Workspace-only audience, configure the domain restriction there and keep the app-level allowlist. Do not enable anonymous access.
6. Add only the coworkers who should use the app, assign the smallest appropriate role, and verify a non-listed account is denied.

Google may withhold an email address in some execution contexts. If the UI reports that it cannot identify the Google account, verify the deployment identity, audience, signed-in account, and Workspace policy; do not add a password field as a workaround.

## Connect `clasp` only when ready

From the project root, after checking the target directory:

```text
clasp login
clasp create --type webapp --title "CQSV · Área de trabajo" --rootDir src
clasp show-file-status
clasp push
```

`clasp create` creates a remote Apps Script project; `clasp push` replaces the remote project files. Confirm the Google account, project title, target project, and push contents before running these commands. Create a versioned deployment and set the audience in Apps Script only after the development copy has been reviewed.

For a template added to an existing Git repository that already has a `.clasp.json`, do not run `clasp create`. Inspect the existing configuration and use a separate Apps Script project for the shell.

Official references: [Claude Code setup](https://docs.anthropic.com/en/docs/claude-code/getting-started), [Google clasp guide](https://developers.google.com/apps-script/guides/clasp), [Apps Script web-app permissions](https://developers.google.com/apps-script/guides/web), and [Session identity](https://developers.google.com/apps-script/reference/base/session).
