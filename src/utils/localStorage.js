const ACCESS_TOKEN = "token";

export const saveAuthTokens = (accessToken) => {
  try {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  } catch (err) {
    console.log(err)
  }
};

export const deleteAuthTokens = () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = () => {
  try {
    let token = localStorage.getItem(ACCESS_TOKEN);
    return token
  } catch (err) {
    console.log(err);
  }
};