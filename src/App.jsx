import Register from './components/auth/register';
import Login from './components/auth/login';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/home/home';

function App() {

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </>
      // <div className="App">
      //   <Register/>
      // </div>
  )
}

export default App
