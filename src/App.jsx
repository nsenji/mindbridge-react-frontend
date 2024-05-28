import './App.css'
import FadeLoader from "react-spinners/FadeLoader";

import { useContext, useEffect } from 'react'
import { AuthContext } from './Services/authprovider'
import { useRoutes } from 'react-router-dom'
import Router from './router'
import isValidToken from './utils/isValidToken'
import { useQuery } from 'react-query'
function App() {

  const { isLoading, error, data } = useQuery("getToken", isValidToken, { enabled: true })



  const { isAuthenticated } = useContext(AuthContext)
  const routing = useRoutes(Router(isAuthenticated, data))
  return (
    <>
      {isLoading ?
        <div className='d-flex justify-content-center'>
          <FadeLoader
            color={'#0c008a'}
            loading={isLoading}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        : routing}
    </>
  )
}

export default App
