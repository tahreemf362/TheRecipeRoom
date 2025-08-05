# 🍽 The Recipe Room

*The Recipe Room* is a full-stack web application where users can explore, add, and share delicious recipes in a cozy and modern interface. Built with a focus on clean UI, secure authentication, and interactive user features.

---

## 🔗 Live Demo

https://www.linkedin.com/in/tahreem-fatima-250550274/



## 🚀 Features

- 👤 User Authentication (Signup/Login) using JWT
- 🧑‍🍳 Personalized User Dashboard
- ➕ Add, View, and Manage Recipes
- 📬 Send Recipe Requests via Email
- 📋 View Recipes Shared by Other Users
- 🧠 Clean UI with Stylish Fonts and Responsive Design

---

## 🛠 Tech Stack

*Frontend:*
- HTML5, CSS3, JavaScript
- Google Fonts
- Responsive Design

*Backend:*
- Node.js
- Express.js
- MySQL
- JWT Authentication
- Nodemailer (Email Integration)

---

## 📂 Folder Structure

The-Recipe-Room/ │

├── client/

# Frontend files │  

├── index.html │ 

├── login.html │ 

├── signup.html │  

├── about.html │ 

└── dashboard.html │

├── server/        

# Backend API │  

├── routes/ │   │

├── authRoutes.js │   

│   └── dashboardRoutes.js │  

├── controllers/ 
│  
├── db.js │ 

├── middleware/ │  

│   └── verifyToken.js │  

└── index.js

│ └── README.md

---

## 🔐 Authentication

- Secure user sessions using *JWT*
- Passwords hashed before storing in DB
- Protected routes for dashboard and recipe handling

---

## 📧 Email Integration

- Nodemailer is used to send requested recipes via email
- A success message appears once the request is sent

---

## 🖼 UI & Design

- Hero section with background image
- Stylish black and white containers for sections
- Modern fonts: Pacifico, Poppins
- Aesthetic color palette and responsive layout

---

## 📌 Installation


git clone https://github.com/yourusername/the-recipe-room.git

cd the-recipe-room/server

npm install

node server.js

Make sure to create your MySQL database and update DB credentials in db.js.


---

🔧 .env Example

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=yourpassword

DB_NAME=recipe_room

JWT_SECRET=your_jwt_secret

EMAIL_USER=youremail@example.com

EMAIL_PASS=your_email_password



---

📞 Contact

Built by Tahreem Fatima
📧 tfatima362@gmail.com



---

⭐ Credits

Thanks to free tools and platforms that made this project possible:

Unsplash (background image)

Google Fonts

OBS Studio (screen recording)



---

📜 License

This project is open-source and free to use for educational purposes.
