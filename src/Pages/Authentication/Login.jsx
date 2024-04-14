import { useState } from 'react'
import './style.css'
import logo from '../../assets/logo-main.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Services/authprovider'
import { useContext } from 'react'
import Auth from '../../Services/authentication'

export default function Login(){
    const navigate = useNavigate()

    const { setAuthUser, setAuthenticated } = useContext(AuthContext)

    const [user, setUser] = useState({email: '', password:''})
    const [error, setError] = useState('')

    async function handleLogin(e){
        e.preventDefault()
        try{
            const response = await Auth.signIn(user)
            setAuthUser(response.data)
            setAuthenticated(true)
            console.log(response.data)
            response.data ? navigate('/dashboard') : navigate('/login')
        } catch(error){
            console.log(error)
            setError(error.response.data.message)
            setTimeout(()=>{
                setError('')
            }, 3000)
        }
        
    }

    return(
        <div className="signup">
            <div className='loginleft'>
            <img src={logo} style={{height:'75px', width:'190px'}} className='logo-image'/>
            </div>
            <form className='loginform' onSubmit={handleLogin}>
                <div className='d-flex flex-column login'>
                    {error && <span className='text-danger align-self-center'>{error}</span>}
                    <img src={logo} style={{height:'100px', width:'250px'}} className='align-self-center'/>
                    <div className='d-flex justify-content-center flex-column'>
                        <div className="mb-2">
                            <input placeholder={'Email'} type="email" className="form-control" autoComplete='username' id="email" aria-describedby="email" onChange={(e)=> setUser({...user, email: e.target.value})} required/>
                        </div>
                        <div className="mb-4">
                            <input type="password" placeholder={'Password'} className="form-control" id="password" autoComplete="current-password" onChange={(e)=> setUser({...user, password: e.target.value})} required/>
                        </div>
                        <button className="align-self-center submit-btn mb-5" type="submit" style={{width:'50%'}}>Login</button>
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