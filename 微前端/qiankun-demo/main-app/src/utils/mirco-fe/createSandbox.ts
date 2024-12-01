function createSandbox(name: string) {
    const fakeWindow: any = {};
    // fakeWindow.__POWERED_BY_QIANKUN__ = true;
    const sandbox = new Proxy(fakeWindow, {
      get: (target, key) => {
        if (key in target) return target[key];
        return undefined;
      },
      set: (target, key, value) => {
        target[key] = value;
        return true;
      }
    })
    return {
      proxy: sandbox,
      expose: (exposedObject: any) => {
        Object.keys(exposedObject).forEach((key) => {
          sandbox[key] = exposedObject[key];
        })
      }
    };
}

export default createSandbox;