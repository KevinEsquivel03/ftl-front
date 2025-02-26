import { Routes, Route, Navigate } from 'react-router';
import Navbar from './components/Header/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

import './App.css';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Navigate to="/home" />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
