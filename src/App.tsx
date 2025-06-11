
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/login'
import DashBoard from './pages/recipes/dashboard/dashboard'



function App() {

  return (
  <div>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={"/dashboard/:token"} element={<DashBoard/>} /> 
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
