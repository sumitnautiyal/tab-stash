document.addEventListener('DOMContentLoaded', () => {
  const copyCloseBtn = document.getElementById('copy-close');
  const copyOnlyBtn = document.getElementById('copy-only');
  const status = document.getElementById('status');

  async function stashTabs(shouldClose) {
    try {
      status.textContent = "Processing...";
      
      // Query only unpinned tabs in the current window.
      // We explicitly exclude pinned tabs (email, music, etc.) from the stash.
      const tabs = await browser.tabs.query({ 
        currentWindow: true, 
        pinned: false 
      });

      if (tabs.length === 0) {
        status.textContent = "No unpinned tabs to stash.";
        status.className = "error"; // visual feedback if you added CSS for .error
        return;
      }
      
      // Generate Markdown
      const date = new Date().toISOString().split('T')[0];
      let content = `## Stashed Session - ${date}\n\n`;
      
      tabs.forEach(tab => {
        // Filter out the extension itself or empty new tabs
        if (tab.url.startsWith("moz-extension://") || tab.url === "about:newtab") return;
        content += `- [${tab.title}](${tab.url})\n`;
      });

      await navigator.clipboard.writeText(content);

      // UI Feedback
      const count = tabs.length;
      status.textContent = `Stashed ${count} tabs to clipboard.`;
      
      // "Nuclear Mode" - Close tabs after stashing
      if (shouldClose) {
        // Safety check: Create a blank tab first so the window doesn't close
        // when we remove all other tabs.
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