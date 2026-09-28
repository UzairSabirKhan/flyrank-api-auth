require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// POST /auth/signup - Register new user
app.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  // Validation: ensure both fields exist
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: "Both 'email' and 'password' are required" });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data.user);
});

// POST /auth/login - Authenticate and return JWT
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Validation: ensure both fields exist
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: "Both 'email' and 'password' are required" });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ error: "Invalid login credentials" });
  }

  res.status(200).json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token
  });
});


// Initialize Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT} and connected to Supabase`,
  );
});
