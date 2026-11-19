// instruction.md for Amp (docs/research/other-agent-harnesses.md §3.10, §5 step 8): the instruction a project follows
// (`.instruction/follow.json`) reaches each thread — the whole of it at the thread's first turn, a new version at the
// next prompt, nothing while it is unchanged — and the person is told of a new version.
//
// Amp runs a plugin's `agent.start` handler when a prompt is submitted; what it answers as `message` is appended after
// the user's content in the user message (@ampcode/plugin, AgentStartResult). The handler asks `instruction turn amp`
// (the `instruction.md` npm package): the same reads, keep-last-good, signatures, given-once and reports as
// `instruction hook`, with host "amp".
//
// Install: copy this file into `.amp/plugins/` (one project) or `~/.config/amp/plugins/` (every project on this
// machine), then run `plugins: reload` from the command palette, or restart Amp.
import type { PluginAPI } from '@ampcode/plugin'

export const description = 'instruction.md: the instruction this project follows (.instruction/follow.json) at the start of a thread, and a new version at the next prompt'

/** What `instruction turn` answers. */
interface Turn {
	context?: string
	notice?: string
}

export default function (amp: PluginAPI) {
	// (the threads this plugin process has given a first turn: a thread opened again is told by the CLI's own record
	// that it already has this version)
	const seen = new Set<string>()

	amp.on('agent.start', async (event, ctx) => {
		try {
			const root = amp.system.workspaceRoot ? amp.helpers.filePathFromURI(amp.system.workspaceRoot) : null
			if (!root) return {}
			const thread = String(event.thread.id)
			const first = !seen.has(thread)
			seen.add(thread)
			const r = first
				? await ctx.$`npx -y instruction.md turn amp --session ${thread} --start --cwd ${root}`
				: await ctx.$`npx -y instruction.md turn amp --session ${thread} --cwd ${root}`
			const out = r.exitCode === 0 ? r.stdout.trim().split('\n').pop() : ''
			if (!out) return {}
			const turn = JSON.parse(out) as Turn
			if (turn.notice) await ctx.ui.notify(turn.notice).catch(() => {})
			return turn.context ? { message: { content: turn.context, display: false } } : {}
		} catch (e) {
			// never a broken turn: the thread goes on without it
			ctx.logger.log(`instruction.md: ${e instanceof Error ? e.message : String(e)}`)
			return {}
		}
	})
}
