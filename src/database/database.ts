import * as SQLite from 'expo-sqlite';
let db: SQLite.SQLiteDatabase | null = null;
const getDB = async () => { if (!db) { db = await SQLite.openDatabaseAsync('app.db'); } return db; };
export const initDB = async (): Promise<void> => {
  const database = await getDB();
  await database.execAsync(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);`);
};
export const registerUser = async (name: string, email: string, password: string): Promise<boolean> => {
  try { const database = await getDB(); await database.runAsync('INSERT INTO users (name, email, password) VALUES (?, ?, ?);', [name, email, password]); return true; }
  catch (error) { return false; }
};
export const loginUser = async (email: string, password: string): Promise<{ id: number; name: string; email: string } | null> => {
  try { const database = await getDB(); return await database.getFirstAsync('SELECT id, name, email FROM users WHERE email = ? AND password = ?;', [email, password]); }
  catch (error) { return null; }
};
