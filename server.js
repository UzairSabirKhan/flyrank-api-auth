require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
