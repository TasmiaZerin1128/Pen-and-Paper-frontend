
# Pen & Paper - Frontend

A project during internship of 7th Semester in Cefalo. This is a blog website containing following features -  
1. Register & Login
2. View all blogs, with or without Login
3. Create a blog if registered user
4. Click a blog to view in a new page
5. Update and delete self blog
6. View an author's profile and blogs
7. Update own profile
8. Delete own profile  
  
Authentication is made with JWT token and cookie.




## Tech Stack

ReactJS, Material UI


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the application

```bash
  npm run dev
```


## Proxy Configuration

Instructions for running the frontend from any host and backend in one IP  
Edit vite.config.js -> 
```bash 
export default defineConfig({
server: {
proxy : {
'/api': {
target: 'https://penpaper.cyclic.app',
// if target is localhost --> http//localhost:3000
changeOrigin: true,
secure: false,
},
}
},
plugins: [react()],
});
```
## Live Website
https://pen-paper.netlify.app/
