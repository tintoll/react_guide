export function getAuthToekn() {
  const token = localStorage.getItem("token");
  return token;
}
