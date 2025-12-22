const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const app = express();
app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());

// MySQL connection for XAMPP
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // XAMPP default: empty password
  database: "futuretrack_db",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Session store
const sessionStore = new MySQLStore(
  {
    createDatabaseTable: true,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db
);

// Session middleware
app.use(
  session({
    key: "session_cookie",
    secret: "your_session_secret", // Replace with a secure key
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
    },
  })
);

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
};

// Sign Up
app.post("/api/auth/signup", async (req, res) => {
  const { email, username, password, role } = req.body;

  // Input validation
  if (!email || !username || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  if (username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters long" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }
  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    // Check for existing email or username
    const [existing] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ? OR username = ?", [
        email,
        username,
      ]);
    if (existing.length > 0) {
      const field = existing[0].email === email ? "Email" : "Username";
      return res.status(400).json({ error: `${field} already taken` });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)",
        [email, username, hashedPassword, role]
      );

    // Store user ID in session
    req.session.userId = result.insertId;

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Failed to create account" });
  }
});

// Sign In
app.post("/api/auth/signin", async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find user
    const [users] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = users[0];
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Store user ID in session
    req.session.userId = user.id;

    res.json({ message: "Signed in successfully" });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Failed to sign in" });
  }
});
// save Roadmaps
app.post("/api/saveRoadmap", isAuthenticated, (req, res) => {
  const { roadmap } = req.body;

  if (!roadmap) {
    return res.status(400).json({ error: "Roadmap data is required" });
  }

  // Optionally store user ID with roadmap
  const userId = req.session.userId;

  db.query(
    "INSERT INTO roadmaps (user_id, career, description, data) VALUES (?, ?, ?, ?)",
    [userId, roadmap.career, roadmap.description, JSON.stringify(roadmap)],
    (err, result) => {
      if (err) {
        console.error("Error saving roadmap:", err);
        return res.status(500).json({ error: "Failed to save roadmap" });
      }
      res.json({ message: "Roadmap saved successfully", id: result.insertId });
    }
  );
});
// Get Roadmaps
app.get("/api/getRoadmaps", isAuthenticated, (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    console.error("No userId in session");
    return res.status(401).json({ error: "Not authenticated" });
  }

  console.log("Fetching roadmaps for userId:", userId);

  db.query(
    "SELECT * FROM roadmaps WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching roadmaps:", err);
        return res.status(500).json({ error: "Failed to fetch roadmaps" });
      }

      const roadmaps = results.map((row) => ({
        ...row,
        data: JSON.parse(row.data),
      }));

      res.json(roadmaps);
    }
  );
});

// Get User Data
app.get("/api/auth/me", isAuthenticated, async (req, res) => {
  try {
    const [users] = await db
      .promise()
      .query("SELECT email, username, role FROM users WHERE id = ?", [
        req.session.userId,
      ]);
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      email: users[0].email,
      username: users[0].username,
      role: users[0].role,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Logout
app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
