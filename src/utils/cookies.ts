export const getCookies = () => {
    var pairs = document.cookie.split(";");
    var cookies:any = {};
    for (var i=0; i<pairs.length; i++){
        var pair = pairs[i].split("=");
        cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
}

export const saveCookie = (name: string, coockie: string) => {
    document.cookie = `${name}=${coockie}`;
}

export const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}