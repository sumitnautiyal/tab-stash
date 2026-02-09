document.addEventListener('DOMContentLoaded', () => {
  const copyCloseBtn = document.getElementById('copy-close');
  const copyOnlyBtn = document.getElementById('copy-only');
  const status = document.getElementById('status');

  async function stashTabs(shouldClose) {
    try {
      const tabs = await browser.tabs.query({ currentWindow: true });
      
      const date = new Date().toISOString().split('T')[0];
      let content = `## Stashed Session - ${date}\n\n`;
      
      tabs.forEach(tab => {
        if (tab.url.startsWith("moz-extension://") || tab.url === "about:newtab") return;
        content += `- [${tab.title}](${tab.url})\n`;
      });

      await navigator.clipboard.writeText(content);

      const count = tabs.length;
      status.textContent = `Copied ${count} tabs to clipboard.`;

      if (shouldClose) {
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