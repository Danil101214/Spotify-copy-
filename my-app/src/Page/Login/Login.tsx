import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthUsersAxios, UsersAxios } from '../../Actions/UsersAxios'
import Loading from '../../Components/Loading/Loading'
import ToastContainerComponent from '../../Components/ToastContainer/ToastContainer'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import { MUSIC } from '../Constants'
import './Style.css'
const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {status, message} = useAppSelector(state => state.users)
  const login = async (e: any) => {
    e.preventDefault();
    await dispatch(AuthUsersAxios({email: email, password: password}))
    navigate(MUSIC)
    if(status == 201) {
      toast(message)
    }
  }

  const loader = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  loader()

  return (
    <>
    {loading ?
    <Loading />
    :
    <div className='login'>
    <div className="login__container">
        <div className="login__item">
            <motion.h1 initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1.5}} 
            style={{margin: 0, color: '#FFFFFF', textAlign: 'center', marginTop: 60}}>Вхід</motion.h1>
            <motion.p initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1.5}} 
            style={{margin: 0, color: '#FFFFFF', textAlign: 'center', marginTop: 10}}>Скоріше входьте, щоб слухати свою улюблену пісню</motion.p>
            <div className="login__block">
            <form>
                <motion.input initial={{x: -1000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                transition={{duration: 2}} type="email" placeholder='Введіть свій email' onChange={(e) => setEmail((e.target as HTMLInputElement).value)}/>
                <motion.input initial={{x: 1000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                transition={{duration: 2}} type="password" placeholder='Введіть свій пароль' onChange={(e) => setPassword((e.target as HTMLInputElement).value)}/>
                <motion.button initial={{y: 1000, opacity: 0}} animate={{y: 0, opacity: 1}} 
                transition={{duration: 2}} onClick={login}>Увійти</motion.button>
            </form>
            </div>
        </div>
    </div>
  </div>
  }
  </>
  )
}

export default Login