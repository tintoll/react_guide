export function getAuthToekn() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToekn();
}
