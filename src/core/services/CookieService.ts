// import axios from "axios";

const SESSION_ID_KEY = "sessionId";

export const getSessionId = (): string | null => {
  return null;
};

export const saveSessionId = (sessionId: string): void | null => {
  // 不直接设置 document.cookie// axios.defaults.headers.Cookie = `${SESSION_ID_KEY}=${sessionId}`
  return null;
};

export const destroySessionId = (): void | null => {
  // 使用 axios 移除 Cookie 头
  // axios.defaults.headers.Cookie = "";
  return null;
};

export default { getSessionId, saveSessionId, destroySessionId };
