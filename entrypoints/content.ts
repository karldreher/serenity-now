async function redditHandler(ignore: string) {
  let d = document.getElementsByTagName("article");

  Array.from(d).forEach(element => {
      let ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.toLowerCase().includes(ignore.toLowerCase())) {
          element.remove();
          console.log('removed', ariaLabel);
      }
  });
}

async function getOptions(): Promise<string[]> {
  try {
    const ignores = await storage.getItem('local:ignores');
    console.log(ignores);
    if (Array.isArray(ignores)) {
      return ignores;
    }
  } catch {
    return [];
  }
  return [];
}

export default defineContentScript({
  matches: ['*://*.google.com/*', '*://*.reddit.com/*'],
  world: 'MAIN',
  async main() {
    console.log("content script loaded");
    const observer = new MutationObserver(async () => {
      const options = await getOptions();
      console.log(options)
      // TODO: make sure each handler only called on the specific origin
      options.forEach(ignore => {
      redditHandler(ignore);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
});
