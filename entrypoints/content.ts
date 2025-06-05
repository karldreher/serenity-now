import { storage } from '@wxt-dev/storage';

/**
 * Handlers are site-specific.  
 * Given a string, it will remove posts from Reddit during browsing that match the string.
 * @param ignore 
 */
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
    const ignoresStr = await storage.getItem('local:ignores');
    console.debug('Raw ignores:', ignoresStr);
    
    // If we have a string, try to parse it
    if (typeof ignoresStr === 'string') {
      try {
        const ignores = JSON.parse(ignoresStr);
        if (Array.isArray(ignores)) {
          return ignores;
        }
      } catch (e) {
        console.debug('Failed to parse ignores:', e);
        // Reset storage to empty array on parse error
        await storage.setItem('local:ignores', JSON.stringify([]));
      }
    } else {
      // Initialize storage if it's empty
      await storage.setItem('local:ignores', JSON.stringify([]));
    }
  } catch (e) {
    console.debug('Failed to get ignores:', e);
  }
  return [];
}

export default {
  matches: ['*://*.reddit.com/*'],
  world: 'ISOLATED',
  async main() {
    const observer = new MutationObserver(async () => {
      //TODO can we only get options on content load?
      const options = await getOptions();
      console.log(options)
      // TODO: make sure each handler only called on the specific origin
      options.forEach(ignore => {
      redditHandler(ignore);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
};
