const express = require('express'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const db = require('../config/db'); 
const router = express.Router(); 
require('dotenv').config(); 
 
// ✅ Test route to verify router works 
router.get('/test', (req, res) => { 
  res.send('Auth route working'); 
}); 
 
// ------------------- SIGNUP ------------------- 
router.post('/signup',  (req, res) => { 
  const { username, email, password } = req.body; 
 
  // Check if user exists 
  db.query("SELECT * FROM recipe_room WHERE email = ?", [email], async (err, results) =>
     { 
    if (err) return res.status(500).json({ message: "DB Error" }); 
 
    if (results.length > 0) { 
      return res.status(400).json({ message: "User already exists" }); 
    } 
 
    // Hash password 
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Hash Error" });

      // Insert new user
      db.query(
        "INSERT INTO recipe_room (name, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: "DB Error" });

          // ✅ Generate JWT token immediately after signup
          const token = jwt.sign(
            { id: result.insertId },         // user id from DB
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );

          // ✅ Send token & user info to frontend
          res.status(200).json({
            message: "User Registered",
            token,
            user: { id: result.insertId, username }
          });
        }
      );
    });
  });
});

 
// ------------------- LOGIN ------------------- 
router.post('/login', (req, res) => { 
  const { email, password } = req.body; 
 
  db.query("SELECT * FROM recipe_room WHERE email = ?", [email], async (err, results) => { 
    if (err || results.length === 0) { 
      return res.status(400).json({ message: "Invalid credentials" }); 
    } 
 
    const isMatch = await bcrypt.compare(password, results[0].password); 
    if (!isMatch) return res.status(401).json({ message: "Wrong Password" }); 
 
    // Generate JWT token 
    const token = jwt.sign( 
      { id: results[0].id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    ); 
 
    // ✅ Return 'name' as username for frontend compatibility 
    res.json({ 
      token, 
      user: { id: results[0].id, username: results[0].name } 
    }); 
  }); 
}); 
 
module.exports = router; // ✅ Must export router