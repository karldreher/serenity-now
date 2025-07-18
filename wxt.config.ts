import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['storage'],
    host_permissions: ['*://*.reddit.com/*'],
  },
  manifestVersion: 3,
});
