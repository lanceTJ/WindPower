const SESSION_ID_KEY = "sessionId" as string;

/**
 * @description get sessionId from localStorage
 */
export const getSessionId = async (): Promise<string | null> => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    if (name === "sessionId") {
      const val = cookie.substr(eqPos + 1);
      return val;
    }
  }
  return null;
};

/**
 * @description save sessionId into localStorage
 * @param sessionId: string
 */
export const saveSessionId = (sessionId: string): void => {
  window.localStorage.setItem(SESSION_ID_KEY, sessionId);
  console.log(sessionId);
};

/**
 * @description remove sessionId from localStorage
 */
export const destroySessionId = (): void => {
  window.localStorage.removeItem(SESSION_ID_KEY);
};

export default { getSessionId, saveSessionId, destroySessionId };
