# Tab Stash for Firefox

**The "Unix Philosophy" for your browser tabs.**

Tab Stash is a minimalist extension that serializes your open tabs into a clean Markdown list and copies them to your clipboard. 

It solves the "I have 50 tabs open for research but I need to reboot my brain" problem without using heavy session managers or cloud sync.

## The Philosophy

I built this because I realized that if a tab is truly important, it belongs in my notes, not in my RAM. If I never click the link in my notes later, it wasn't important anyway.

<div align="center">
  <img src="screenshots/Waiting for input.png" width="400" alt="Tab Stash Interface">
</div>

<div align="center">
  <img src="screenshots/Copy Only.png" width="400" alt="Copy All">
</div>

## The Workflow

1. **Accumulate:** Open 20+ tabs while researching a topic.
2. **Stash:** Click **"Copy & Kill"**.
3. **Paste:** Pipe the Markdown list into Obsidian, VS Code, or Notion.
4. **Focus:** Your browser is now empty, fast, and ready for the next task.

## Features

- **Zero Dependencies:** Written in vanilla JS. <10KB size.
- **Privacy First:** No cloud sync, no analytics, no API calls.
- **Markdown Output:** Formats links as `- [Title](URL)` automatically.
- **Memory Safety:** Safely opens a new tab before closing others to prevent window collapse.

## Installation

### From Firefox Add-ons

*Status: Currently Under Review* (Link coming soon)

### Developer Mode (Run from Source)

1. Clone this repo.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on...**
4. Select `manifest.json`.

## The Minimalist Collection

This tool is part of a series on digital minimalism and high-performance engineering.
* **[Epoch Focus](https://github.com/sumitnautiyal/epoch-focus):** A 17ms, distraction-free New Tab page.

## License

MIT