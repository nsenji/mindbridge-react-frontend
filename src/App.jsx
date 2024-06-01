import FadeLoader from "react-spinners/FadeLoader";
import { useRoutes } from 'react-router-dom'
import Router from './router'
import isValidToken from './utils/isValidToken'
import { useQuery } from 'react-query'
function App() {

  const { isLoading, error, data } = useQuery("getToken", isValidToken, { enabled: true })

  if (data) {
    var [tokenValid,_] = data;
    console.log(`data has now come and token is ${tokenValid}` )
  }
  
  if (error){
    console.log(error);
  }
  
  const routing = useRoutes(Router(tokenValid))

  // const { isAuthenticated } = useContext(AuthContext)
  return (
    <>
      {isLoading ?
        <div className='flex justify-center items-center h-screen'>
          <FadeLoader
            color={'#0c008a'}
            loading={isLoading}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        : error? 
        <h1>there is a terrible error </h1>
        : routing}
    </>
  )
}

export default App
