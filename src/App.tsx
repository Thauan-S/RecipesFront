import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import DashBoard from './pages/recipes/dashboard/Dashboard'
import { AppContextProvider } from './context/appContext'
import {
  SidebarProvider,
  SidebarInset,
} from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import UserProfile from './pages/user/UserProfile'

function App() {
  return (
    <AppContextProvider>
    <BrowserRouter>
      <SidebarProvider>
        <Layout />
      </SidebarProvider>
    </BrowserRouter>
  </AppContextProvider>
  )
}
function Layout() {
  const location = useLocation();

  const hideSidebar = location.pathname === '/';//escondendo a sidebar no login

  return (
    <>
      {!hideSidebar && <AppSidebar  />}
      <SidebarInset>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/:token" element={<DashBoard />} />
          <Route path="/userProfile" element={<UserProfile/>}/>
        </Routes>
      </SidebarInset>
    </>
  );
}
export default App
