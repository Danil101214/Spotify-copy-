import React, {useState, ChangeEvent} from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { UsersAxios } from '../../Actions/UsersAxios'
import Loading from '../../Components/Loading/Loading'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import 'react-toastify/dist/ReactToastify.css';
import './Style.css'
import ToastContainerComponent from '../../Components/ToastContainer/ToastContainer'
import { useNavigate } from 'react-router-dom'
import { MUSIC } from '../Constants'
import { motion } from 'framer-motion'
type ChangeInput = ChangeEvent<HTMLInputElement> 
const Registration = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()
  const {status, message} = useAppSelector(state => state.users)
  const registration = async (e: any) => {
    e.preventDefault();
    await dispatch(UsersAxios({email: email, name: name, password: password}))
    navigate(MUSIC)
    console.log(name)
    if(status == "Created") {
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
    <div className='registration'>
        <div className="registration__container">
            <div className="registration__item">
                <motion.h1 initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}} 
                transition={{duration: 1.5}} style={{margin: 0, color: '#FFFFFF', textAlign: 'center', marginTop: 60}}>Реєстрація</motion.h1>
                <motion.p initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}} 
                transition={{duration: 1.5}}>Скоріше реєструйся, щоб слухати свою улюблену пісню</motion.p>
                <div className="registration__block">
                <form>
                  <motion.input initial={{x: -1000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                  transition={{duration: 2}} type="email" placeholder='Ваш email' onChange={(e) => setEmail((e.target as HTMLInputElement).value)}/>
                  <motion.input initial={{x: 1000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                  transition={{duration: 2}} type="text" placeholder='Ваше ім`я' onChange={(e) => setName((e.target as HTMLInputElement).value)}/>
                  <motion.input initial={{x: -1000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                  transition={{duration: 2}} type="password" placeholder='Створіть свій пароль' onChange={(e) => setPassword((e.target as HTMLInputElement).value)}/>
                  <motion.button initial={{y: 1000, opacity: 0}} animate={{y: 0, opacity: 1}} 
                  transition={{duration: 2}} onClick={registration}>Зареєструватися</motion.button>
                </form>
                </div>
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default Registration