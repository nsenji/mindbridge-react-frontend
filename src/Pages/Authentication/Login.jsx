import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Services/authprovider'
import { useContext } from 'react'
import Auth from '../../Services/authentication'
import './style.css'
import logo from '../../assets/logo-main.png'
import FadeLoader from "react-spinners/FadeLoader";

export default function Login(){

   
    const navigate = useNavigate()

    const { setAuthUser, setAuthenticated } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({email: '', password:''})
    const [error, setError] = useState('')

    async function handleLogin(e){
        e.preventDefault()
        try{
            setIsLoading(true)
            const response = await Auth.signIn(user)
            setAuthUser(response.data)
            setAuthenticated(true)
            setIsLoading(false)
            response.data ? navigate('/dashboard') : navigate('/login')
        } catch(error){
            setError(error.response.data.message)
            setIsLoading(false)
            setTimeout(()=>{
                setError('')
            }, 3000)
        }
        
    }

    return(
        <div className="signup">
            <div className='loginleft'>
                <img src={logo} style={{height:'42px', width:'190px'}} className='logo-image'/>
            </div>
            <form className='loginform' onSubmit={handleLogin}>
            <img src={logo} style={{height:'55px', width:'250px'}} className='align-self-center'/>
            <h1 className='smallheading'>Let's Solve Mental Health</h1>
                <div className='d-flex flex-column login'>
                    {error && <span className='text-danger align-self-center'>{error}</span>}
                    <div className='d-flex justify-content-center flex-column'>
                        <div className="mb-2">
                            <input placeholder={'Email'} type="email" className="form-control" autoComplete='username' id="email" aria-describedby="email" onChange={(e)=> setUser({...user, email: e.target.value})} required/>
                        </div>
                        <div className="mb-4">
                            <input type="password" placeholder={'Password'} className="form-control" id="password" autoComplete="current-password" onChange={(e)=> setUser({...user, password: e.target.value})} required/>
                        </div>
                        {
                            isLoading 
                            ?
                                <div className='d-flex justify-content-center'>
                                    <FadeLoader
                                        color={'#0c008a'}
                                        loading={isLoading}
                                        size={80}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div>
                            :
                            <button className="align-self-center submit-btn mb-5" type="submit" style={{width:'50%'}}>Login</button>}
                    </div>
                    <div className='d-flex justify-content-between gap-5'>
                        <Link to={'/signup'}>Create An Account!</Link>
                        <Link>Forgot Password?</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}