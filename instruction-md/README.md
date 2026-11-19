# instruction.md — the plugin for Claude Code and Codex

Your agent follows its instructions from [instruction.md](https://instruction.md): the version a project follows at
each session's start, and a new version at the next prompt once it is released, its signature checked. One plugin for
both hosts.

## What it does

| Part | Claude Code | Codex |
| --- | --- | --- |
| Hooks: the text at `SessionStart`, a new version at `UserPromptSubmit` | `hooks/hooks.json` → `instruction hook auto` | the same file (Codex reads a plugin's `hooks/hooks.json` with its own manifest, `.codex-plugin/plugin.json`); Codex asks once to approve a plugin's hooks (`/hooks`) |
| MCP server `instruction-md`: `instruction://current`, the prompt `follow`, the registry's tools when signed in | `.mcp.json` | `.mcp.json` |
| Skill `following-instructions`: reading them again, which version, proposing a change | `skills/` | `skills/` |
| Monitor: a line in an idle session when a new version is applied | `monitors/monitors.json` | — |

Other hosts load the same folder (docs/research/other-agent-harnesses.md):

| Host | What it reads | What the hook does there |
| --- | --- | --- |
| GitHub Copilot CLI | the portable `plugin.json`, hooks only at `com.github.copilot/hooks/hooks.json` (Copilot's own format), `mcp.json` | `instruction hook copilot`: the text at `sessionStart`, a new version after a tool call and (if Copilot passes it on) at a prompt |
| Factory Droid | `.claude-plugin/plugin.json`, `hooks/hooks.json` | `hook auto` answers as Droid (Claude Code's shape) |
| Goose | `plugin.json` + `hooks/hooks.json` (Open Plugins) | Goose takes no context from a hook: `hook auto` keeps `.instruction/current.md` fresh, which `GOOSE_MOIM_MESSAGE_FILE` makes Goose re-read every turn |
| Junie CLI | `hooks/hooks.json` as an extension | `hook auto` answers at `UserPromptSubmit`; Junie ignores context at `SessionStart` |
| Cursor | — | Cursor reads `hooks/hooks.json` in its own format: its plugin is [`../instruction-md-cursor`](../instruction-md-cursor) |

Everything runs `npx -y instruction.md`; nothing else is installed.

## Use it in a project

```sh
npx instruction.md login                       # once: sign in (or INSTRUCTION_MD_TOKEN for an agent)
npx instruction.md connect --host claude-code acme/support@stable --with-hooks --write
```

or write `.instruction/follow.json` yourself and commit it:

```json
{ "follow": "instruction://acme/support@stable", "requireSignature": true }
```

A project without `.instruction/follow.json` is left as it is: the hooks print nothing.

## Install

- Claude Code: `/plugin marketplace add instruction-md/plugins`, then `/plugin install instruction-md@instruction-md`.
- Codex: `codex plugin marketplace add instruction-md/plugins`, then `codex plugin add instruction-md@instruction-md`. Codex asks you to trust the plugin's hooks before they
  run (Settings ▸ Hooks).

## Notes

- The hooks read; they hold no live connection. The monitor holds one (`instruction watch`): on the free plan, which
  gives live updates to one agent at a time, a second monitor reads on schedule instead.
- Codex runs plugin hooks where the plugin's files are on the machine (installed in the CLI or the desktop app).
- See https://instruction.md/docs/claude-code/ and https://instruction.md/docs/codex/.
