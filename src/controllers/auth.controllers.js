import bcrypt from "bcrypt";
import { db } from "../database/database.connection.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const queryUser = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    const user = queryUser.rows;
    console.table(user);
    if (user.lenght > 0) res.status(409).send("Email já cadastrado.");

    const hash = bcrypt.hashSync(password, 10);
    await db.query(
      `
    INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3);
    `,
      [name, email, hash]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
