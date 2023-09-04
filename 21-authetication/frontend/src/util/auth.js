import { redirect } from "react-router-dom";

export function getAuthToekn() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToekn();
}

export function checkAuthLoader() {
  const token = getAuthToekn();

  if (!token) {
    return redirect("/auth");
  }

  return null; // 이 부분은 다음 강의 비디오에 빠져 있고, 여러분이 추가하셔야 합니다.
}
