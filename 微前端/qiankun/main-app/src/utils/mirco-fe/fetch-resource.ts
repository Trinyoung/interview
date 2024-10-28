const fetchResource = async (url: string) => {
    const content = await fetch(url).then((res) => res.text())
    return content
}
export default fetchResource