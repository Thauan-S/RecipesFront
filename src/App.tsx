import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/login'
import DashBoard from './pages/recipes/dashboard/dashboard'
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
