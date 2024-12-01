import fetchResource from './fetch-resource'
import createSandbox from './createSandbox'
import executeScriptInSandbox from './executeScriptInSandbox'

export const importHtml = async (app: any) => {
    const content = await fetchResource(app.entry);
    console.log('content:', content)
    const template = document.createElement('div');
    template.innerHTML = content;
    const scripts = Array.from(template.querySelectorAll('script'))
    function getExternalScripts() {
        return Promise.all(scripts.map((script) => {
            const src = script.getAttribute('src') || '';
            
            if (!src) return Promise.resolve(script.innerHTML);
            return fetchResource(src.startsWith('/') ? `${app.entry}${src}` : src).then((code) => {
                script.innerHTML = code;
                return code;
            })
        }))
    }
    async function execScripts() {
        const scripts = await getExternalScripts()
        const sandbox = createSandbox(app.name);
        scripts.forEach((script: string) => {
            executeScriptInSandbox(script, sandbox.proxy);
        })
        sandbox.expose(window);
    }
    return {
        template,
        getExternalScripts,
        execScripts
    }
}