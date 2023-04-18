import Register from './components/auth/register';
import Login from './components/auth/login';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/home/home';
import Dashboard from './components/dashboard/dashboard';

function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </>
      // <div className="App">
      //   <Register/>
      // </div>
  )
}

export default App
