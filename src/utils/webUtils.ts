export const redirect = (path: string) => {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
    const absoluteUrl = `${baseUrl}${path}`;
    window.location.href = absoluteUrl;
}