import fetchResource from './fetch-resource'
export const importHtml = async (app: any) => {
    // const content = await fetch(app.entry).then((res) => res.text())
    // console.log(content, 'content')
    // document.querySelector(app.container)!.innerHTML = content;
    // eval(content)
    const content = await fetchResource(app.entry);
    console.log(content, 'content')
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
        scripts.forEach((script: string) => {
            // eslint-disable-next-line no-eval
            eval(script)
        })
    }
    return {
        template,
        getExternalScripts,
        execScripts
    }
}