
export const loadLink = (url: string, rel: string) => {
    const link = document.createElement('link')
    link.rel = rel;
    link.href = url;
    document.head.appendChild(link);
}

export default (url: string) => {
    const script = document.createElement('script')
    script.src = url;
    script.async = true;
    document.head.appendChild(script)
}