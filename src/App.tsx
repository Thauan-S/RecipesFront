import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import DashBoard from './pages/recipes/dashboard/Dashboard'
import { AppContextProvider } from './context/appContext'

function App() {
  return (
    <AppContextProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path={"/dashboard/:token"} element={<DashBoard/>} /> 
          </Routes>
        </BrowserRouter>
      </div>
    </AppContextProvider>
  )
}

export default App
