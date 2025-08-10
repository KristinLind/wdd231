export const save = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));
  
  export const load = (key, fallback = null) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
};
  