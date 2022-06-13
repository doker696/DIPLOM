export const getLocalAccessToken = () => {
  return localStorage.getItem("token");
};

export const getLocalRefreshToken = () => {
  return localStorage.getItem("tokenRefresh");
};

export const updateLocalAccessToken = (token) => {
  localStorage.setItem("token", token);
};

export const updateLocalRefreshToken = (token) => {
  localStorage.setItem("tokenRefresh", token);
};
