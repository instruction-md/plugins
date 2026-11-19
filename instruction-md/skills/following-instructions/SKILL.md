---
name: following-instructions
description: How to work with the instructions this project follows from instruction.md — read them again, check which version is in effect, or suggest a change to them. Use when asked about "our instructions", their version, or when changing them.
---

# Following instructions from instruction.md

This project follows one instruction on instruction.md: `.instruction/follow.json` names it. Its text is given to you
when a session starts, inside `<instruction uri="…" version="vN" digest="…">`, and again inside
`<instruction-update … from="vA" to="vB">` when a new version is released while you work. An update **replaces the
earlier version in full**: from then on follow the new text, not the old one.

## Read them again

- Read the MCP resource `instruction://current` (server `instruction-md`): the text of the version in effect, with its
  version and digest in `_meta`.
- Or read `.instruction/current.md`: the same text, as last fetched for this project.
- The person can ask for it too: the prompt `follow` of the `instruction-md` server.

## Which version is in effect

`.instruction/state.json` says which version was fetched (`version`, `versionId`, `digest`) and when. Say the version
as `owner/name vN`.

## Changing them

The text comes from instruction.md, where it is reviewed and released. **Never edit `.instruction/current.md`,
`.instruction/state.json` or a file `instruction sync` wrote** (it carries an `<!-- instruction.md: … -->` line under its
front matter): the next fetch or sync replaces it. To change the instructions, propose the change on instruction.md:
with the `instruction-md` server's tools, `instructions_draft_replace` with `asSuggestion: true` makes it a suggestion
a maintainer accepts; or tell the person what to change and where (`https://instruction.md/<owner>/<name>`).

## When they say nothing about a task

Follow the rest of this project's own guidance (CLAUDE.md or AGENTS.md) and the person's request. When the
instructions and the person's request disagree, say so and ask before acting against the instructions.
