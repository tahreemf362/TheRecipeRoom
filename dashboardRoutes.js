const express = require('express'); 
const router = express.Router(); 
const db = require('../config/db'); 
const authenticateToken = require('../middleware/auth.js'); 

// ✅ Test route first 
router.get('/test', (req, res) => { 
  res.send('Dashboard route working'); 
});

// GET current user's recipes
router.get('/my-recipes', authenticateToken, (req, res) => { 
  const userId = req.user.id; 
  db.query("SELECT * FROM recipes WHERE user_id = ?", [userId], (err, results) => { 
    if (err) return res.status(500).json({ message: "DB Error" }); 
    res.json(results); 
  }); 
});

// ADD new recipe
router.post('/add-recipe', authenticateToken, (req, res) => { 
  const userId = req.user.id; 
  const { title, description } = req.body; 

  db.query(
    "INSERT INTO recipes (user_id, title, description) VALUES (?, ?, ?)", 
    [userId, title, description], 
    (err, result) => { 
      if (err) return res.status(500).json({ message: "DB Error" }); 
      res.json({ message: "Recipe Added" }); 
    }
  ); 
});

// GET other users’ recipes
router.get('/all-recipes', authenticateToken, (req, res) => { 
  const userId = req.user.id; 
  db.query(` 
    SELECT users.name, recipes.title, recipes.description 
    FROM recipes 
    JOIN users ON recipes.user_id = users.id  
    WHERE users.id != ? 
  `, [userId], (err, results) => { 
    if (err) return res.status(500).json({ message: "DB Error" }); 
    res.json(results); 
  }); 
}); 

module.exports = router;  // ✅ must export router
