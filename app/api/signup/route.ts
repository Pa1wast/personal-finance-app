import { pool } from "@/app/_lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const result1 = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const existingUser = result1.rows[0];

    if (existingUser) {
      throw new Error(
        `Could not sign up | ${existingUser.email} is assigned to an existing account`,
      );
    }

    const query = `
      INSERT INTO users (full_name, email, password, profile_img_path, gender, balance, income, expenses) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      name,
      email,
      hashedPassword,
      "http://dummyimage.com/113x100.png/dddddd/000000",
      "Certified bug",
      0,
      0,
      0,
    ];

    const result2 = await pool.query(query, values);
    const newUser = result2.rows[0];

    return NextResponse.json(
      {
        status: 200,
        message: "Signed up successfully",
        user: newUser,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500 },
    );
  }
}
