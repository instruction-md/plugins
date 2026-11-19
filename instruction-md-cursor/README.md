# instruction.md — the plugin for Cursor

The same job as [`../instruction-md`](../instruction-md) (Claude Code, Codex, Copilot, Droid, Goose, Junie), in
Cursor's own plugin layout. It is a folder of its own because Cursor reads a plugin's `hooks/hooks.json` in its own
format (`{"version": 1, "hooks": {"sessionStart": …}}`), at the same path where the other plugin keeps Claude Code's.

| Part | File |
| --- | --- |
| Manifest | `.cursor-plugin/plugin.json` |
| Hooks: the text at `sessionStart`, a new version after a tool call (`postToolUse`), forgotten at `preCompact` | `hooks/hooks.json` → `instruction hook cursor` (`additional_context`) |
| MCP server `instruction-md` (through the CLI's stdio server) | `mcp.json` |
| An always-applied rule pointing the agent at `.instruction/current.md` | `rules/instruction-md.mdc` |

Some Cursor builds drop a hook's `additional_context` (forum reports, 2026). The rule, and `.instruction/current.md`
— which the hooks keep current at every event even when the context is dropped — are the path that doesn't depend on
it. For a rule that is the instruction itself, keep one with `npx -y instruction.md watch --out
.cursor/rules/instruction-md.mdc --rule` (git-ignore it).

Unverified: the manifest's fields beyond `name` (Cursor's plugin reference names it the only required one), and how
Cursor resolves `hooks/hooks.json` inside a plugin. Not in a marketplace yet.
