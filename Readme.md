# Todo App

## How to Clone and Run

1. **Clone the repository:**

```
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

2. **Set up the backend:**

````
  cd backend
  cp .env.example .env
  # Edit the `.env` file change environment variables, change the password and username
  npm install
  npx prisma migrate reset
  npm run dev
  ```

3. **Set up the frontend:**
Open a new terminal window/tab, then:
````

cd frontend
npm install
npm run dev

```

4. **Open the app:**
- Visit `http://localhost:5173` in your browser.

---

**Note:**
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.
```
