# instruction.md for Amp

`instruction-md.ts` is an [Amp plugin](https://ampcode.com/docs/customize/plugins). In a project that follows an
instruction (`.instruction/follow.json`, written by `npx -y instruction.md connect … --with-hooks --write` or by hand),
each thread gets that instruction at its first turn, a new version at the next prompt after a release, and nothing
while it is unchanged. Amp tells you when a new version arrives.

How it works: on `agent.start` the plugin runs `npx -y instruction.md turn amp --session <thread> [--start] --cwd
<workspace>` and returns what it prints as the turn's `message` (appended after your prompt, not shown). The command
reads the instruction the way `instruction hook` does — at most every `refreshSeconds`, within 1.5 s, else the last good
copy — checks signatures when `requireSignature` is set, gives each thread each version once, and, signed in
(`npx -y instruction.md login`), reports the version a thread applied with host `amp`.

## Install

Copy `instruction-md.ts` into one of Amp's plugin locations, then run `plugins: reload` from the command palette (or
restart Amp):

- `.amp/plugins/` in the project, for that project;
- `~/.config/amp/plugins/` (or `$XDG_CONFIG_HOME/amp/plugins/`), for every project on this machine.

Once the plugin is published at a public address, `amp plugins add <url>` installs it for every project on the
machine.

Checked against `@ampcode/plugin` 0.0.0-20261119001231 (its `PluginAPI`, `agent.start` and `AgentStartResult` types).
Not yet run inside Amp itself: Amp is closed source and needs an account.
