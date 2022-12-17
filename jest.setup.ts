// @see - https://github.com/jsdom/jsdom/issues/2112

interface Window {
  // eslint-disable-next-line
  _virtualConsole: any;
}

const listeners = window._virtualConsole.listeners('jsdomError');
const originalListener = listeners && listeners[0];

window._virtualConsole.removeAllListeners('jsdomError');

// eslint-disable-next-line
window._virtualConsole.addListener('jsdomError', (error: any) => {
  if (
    error.type !== 'not implemented' &&
    error.message !== 'Not implemented: navigation (except hash changes)' &&
    originalListener
  ) {
    originalListener(error);
  }
});
