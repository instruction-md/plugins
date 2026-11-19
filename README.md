# instruction.md plugins

Your coding agent follows its instructions from [instruction.md](https://instruction.md): the version a project follows
at the start of every session, and a new version at your next prompt once it is released, its signature checked.

A project names the instruction it follows in `.instruction/follow.json`. These plugins run the
[`instruction.md`](https://www.npmjs.com/package/instruction.md) package's hook for you, so there is nothing to set up
per project beyond that file (`npx -y instruction.md connect --host <tool> <instruction> --with-hooks --write` writes it,
or writes the hooks into the project instead of using a plugin).

## Claude Code

```
/plugin marketplace add instruction-md/plugins
/plugin install instruction-md@instruction-md
```

The plugin brings the hooks, the instruction.md MCP server, a skill on working with followed instructions, and a monitor
that tells an idle session when a new version arrives. Guide: <https://instruction.md/docs/claude-code/>

## Codex

```
codex plugin marketplace add instruction-md/plugins
codex plugin add instruction-md@instruction-md
```

Codex asks you once to trust the plugin's hooks (`/hooks`).
Guide: <https://instruction.md/docs/codex/>

## Cursor, Amp and others

- `instruction-md-cursor/`: the same hooks and MCP server for Cursor, and an always-applied rule.
- `amp/`: a plugin file for Amp (copy it into `.amp/plugins/` or `~/.config/amp/plugins/`).
- GitHub Copilot CLI reads `instruction-md/com.github.copilot/hooks/hooks.json`.

Every tool, with its setup: <https://instruction.md/docs/other-agents/>

## For organizations

`npx -y instruction.md connect --host claude-code|codex <instruction> --managed` prints the settings an administrator
deploys so every session on a machine follows an instruction, this marketplace included.
Guide: <https://instruction.md/docs/managed-agents/>

## About this repository

It is published from instruction.md's source; changes made here directly are overwritten. Report problems at
<https://github.com/instruction-md/specification/issues>.

MIT licensed.
