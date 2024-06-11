export function setUsernameFromJWT(token) {
  try {
    const parts = token.split('.');
    const payload = JSON.parse(atob(parts[1]));
    const username = payload.username;
    return username;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}
