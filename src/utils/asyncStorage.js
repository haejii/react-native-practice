import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveItem(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadItem(key) {
  const value = await AsyncStorage.getItem(key);
  return JSON.parse(value);
}

export async function removeItem(key) {
  await AsyncStorage.removeItem(key);
}
