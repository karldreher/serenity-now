export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
  // This should work in getting the storage to be gett-able from content script but doesnt
  chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

});
