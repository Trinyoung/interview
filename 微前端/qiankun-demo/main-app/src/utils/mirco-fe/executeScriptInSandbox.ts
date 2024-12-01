function executeScriptInSandbox(script: string, sandbox: any) {
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.textContent = script;
    if (sandbox && sandbox.proxy) {
        // scriptElement.src = sandbox.proxy(scriptElement.src);
        const originalWindow = window;
        scriptElement.onload = function () {
            // sandbox.expose(originalWindow);
            // resolve(originalWindow);
            // eslint-disable-next-line no-global-assign
            (window as any) = originalWindow;
            resolve(void 0);
        }
        scriptElement.onerror = function () {
            reject(new Error(`Failed to load script: ${scriptElement.src}`));
        }
        document.head.appendChild(scriptElement);
    } else {
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
      document.head.appendChild(scriptElement);
    }
      // document.head.appendChild(scriptElement);
  })
}

export default executeScriptInSandbox;
