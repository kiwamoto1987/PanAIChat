import type { NextApiRequest, NextApiResponse } from "next";

const users = [
  { id: 1, username: "user1", password: "password" }
];

export default function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = "dummy-token";
  return res.status(200).json({ token });
}
