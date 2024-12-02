import { useCookies } from 'react-cookie';

// Function to set a cookie
export const useSetCookie = (name, value, options = { path: '/' }) => {
  const [, setCookie] = useCookies([name]);  // Use setCookie to modify cookies
  setCookie(name, value, options);
};

// Function to get a cookie
export const useGetCookie = (name) => {
  const [cookies] = useCookies([name]);  // Access the cookies
  return cookies[name];
};

// Function to remove a cookie
export const useRemoveCookie = (name) => {
  const [, removeCookie] = useCookies([name]);  // Use removeCookie to delete cookies
  removeCookie(name);
};