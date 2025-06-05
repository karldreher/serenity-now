export default {
  main() {
    console.log('Background script loaded', { id: chrome.runtime.id });
    
    // Set storage access for content scripts
    chrome.storage.session.setAccessLevel({ 
      accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' 
    });
  }
};
