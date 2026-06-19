import * as SecureStore from 'expo-secure-store';

export const getItem = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.warn('[kv] getItem failed', e);
    return null;
  }
};

export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.warn('[kv] setItem failed', e);
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.warn('[kv] removeItem failed', e);
  }
};
