import { JSONFile } from 'lowdb/node'
import { Low } from 'lowdb'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// db.json file path
const filePath = path.join(__dirname, 'db.json');

const adapter = new JSONFile(filePath)
const db = new Low(adapter, { courses: [] });

export default db;