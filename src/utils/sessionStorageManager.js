const SESSION_KEY = "newProfileData";

export const newProfileStorage = {
  set: (data, expireMinutes = 5) => {
    const now = new Date().getTime();
    const item = {
      data,
      expiry: now + expireMinutes * 60 * 1000,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(item));
  },

  get: () => {
    const itemStr = sessionStorage.getItem(SESSION_KEY);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      const now = new Date().getTime();

      if (item.expiry && now > item.expiry) {

        sessionStorage.removeItem(SESSION_KEY);
        return null;
      }

      return item.data;
    } catch (err) {
      console.error("Erro ao ler newProfileData do sessionStorage", err);
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
  },

  clear: () => sessionStorage.removeItem(SESSION_KEY),
};
