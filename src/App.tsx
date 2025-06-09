
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/login'
import DashBoard from './pages/recipes/dashboard/dashboard'



function App() {

  return (
  <div>
  <BrowserRouter>
  
      {/* <nav className="p-4 bg-gray-100">
        <Link className="mr-4" to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={"/dashboard"} element={<DashBoard/>} /> 
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
