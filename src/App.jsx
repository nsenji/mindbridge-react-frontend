import './App.css'
import { useContext } from 'react'
import { AuthContext } from './Services/authprovider'
import { useRoutes } from 'react-router-dom'
import Router from './router'

function App() {
  const { isAuthenticated } = useContext(AuthContext)
  const routing = useRoutes(Router(isAuthenticated))
  return (
   <>
    {routing}
   </>
  )
}

export default App
