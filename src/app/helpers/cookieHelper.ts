// src/helpers/cookieHelper.ts

export const setCookie = (name: string, value: string, maxAge: number) => {
  const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}`;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, "\\$1") + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;  // Definindo o Max-Age como 0 vai apagar o cookie

};
