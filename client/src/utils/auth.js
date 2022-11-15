import decode from "jwt-decode";

const ACCESS_TOKEN_KEY = "expiration-token";

export function getExpToken() {
  return getCookie(ACCESS_TOKEN_KEY);
}

export function setExpToken(expToken) {
  setCookie(ACCESS_TOKEN_KEY, expToken);
}

export function isLoggedIn() {
  const accessToken = getExpToken();
  return !!accessToken && !isTokenExpired(accessToken);
}

export function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate.getTime() - Date.now() <= 0;
}

export function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

export function clearCookies() {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}

function setCookie(cName, cValue, exDays) {
  if (exDays) {
    let d = new Date();
    d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cName}=${cValue};${expires};path=/`;
  } else {
    document.cookie = `${cName}=${cValue};path=/`;
  }
}

function getCookie(cName) {
  let name = `${cName}=`;
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
