import { Routes, Route, Navigate } from 'react-router';
import Navbar from './components/Header/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

import './App.css';
import {More} from "./pages/More.tsx";
import {Register} from "./pages/register.tsx";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
          <Route index element={<Navigate to="/home" />}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/more' element={<More/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/sign-up' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
