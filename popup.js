document.addEventListener('DOMContentLoaded', () => {
  const copyCloseBtn = document.getElementById('copy-close');
  const copyOnlyBtn = document.getElementById('copy-only');
  const status = document.getElementById('status');

  async function stashTabs(shouldClose) {
    try {
      // 1. get all tabs in the current window
      const tabs = await browser.tabs.query({ currentWindow: true });
      
      // 2. format as Markdown list with Date Header
      const date = new Date().toISOString().split('T')[0];
      let content = `## Stashed Session - ${date}\n\n`;
      
      tabs.forEach(tab => {
        // 3. skip empty tabs or the extension itself
        if (tab.url.startsWith("moz-extension://") || tab.url === "about:newtab") return;
        content += `- [${tab.title}](${tab.url})\n`;
      });

      // 4. write to Clipboard
      await navigator.clipboard.writeText(content);

      // 5. update Status
      const count = tabs.length;
      status.textContent = `Copied ${count} tabs to clipboard.`;

      // 6. Close Tabs (Nuclear Mode)
      if (shouldClose) {
        // leave one new tab open so the window doesn't close entirely
        await browser.tabs.create({}); 
        const tabIds = tabs.map(t => t.id);
        await browser.tabs.remove(tabIds);
        status.textContent += " Tabs closed.";
      }

    } catch (err) {
      status.textContent = "Error: " + err.message;
      console.error(err);
    }
  }

  copyCloseBtn.addEventListener('click', () => stashTabs(true));
  copyOnlyBtn.addEventListener('click', () => stashTabs(false));
});