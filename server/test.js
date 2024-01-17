import db from "./config/db.js";
await db.sync({force: true});