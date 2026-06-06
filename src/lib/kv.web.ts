export const getItem = (key: string): Promise<string | null> =>
  Promise.resolve(localStorage.getItem(key));

export const setItem = (key: string, value: string): Promise<void> => {
  localStorage.setItem(key, value);
  return Promise.resolve();
};
