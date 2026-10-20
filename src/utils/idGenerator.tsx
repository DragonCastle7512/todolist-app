import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getNextId(): Promise<number> {
  const key = '@lastId';

  const value = await AsyncStorage.getItem(key);
  const nextId = Number(value ?? '0') + 1;

  await AsyncStorage.setItem(key, String(nextId));

  return nextId;
}