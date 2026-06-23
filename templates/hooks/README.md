# Hook templates

Optional hooks `/devkit-init` can install into a project's **local** settings
(`.claude/settings.local.json`) — only with the user's consent.

## SessionStart — auto-load project context

`session-hooks.json` adds a SessionStart hook that prints a project context file into the
session at startup, so the assistant resumes with the project's status in view. It tries
`.session/CONTEXT.md` then `PROJECT.md` (adjust to your project's context file).

Merge the `hooks` block into the project's `.claude/settings.local.json` (don't overwrite
existing hooks — combine the arrays).

## Stop — save session context (optional, project-specific)

If the project keeps a rolling context file, add a Stop hook that runs your save script, e.g.:

```json
{ "hooks": { "Stop": [ { "hooks": [ { "type": "command", "command": "python3 scripts/save-session.py" } ] } ] } }
```

The save script itself is project-specific (what to capture, where to write). Keep its path
**relative to the project root** and ensure the working directory stays at the root.

> Hooks run shell commands; review them before enabling. Claude Code may prompt to approve a
> new hook command on the next session start.
