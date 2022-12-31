import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { REGISTRATION } from '../../Page/Constants'
import { usersSlices } from '../../Redux/Slices/Users.Slices'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import './Style.css'

const ModalBanUser = () => {
    const {user} = useAppSelector(state => state.users)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logOut = () => {
        dispatch(usersSlices.actions.logOut())
        navigate(REGISTRATION)
    }
    return (
    <div className="ModalBanUser">
        <motion.div initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1, overflow: 'hidden'}} 
        transition={{duration: 1}} className="ModalBanUser__container">
            <h1 style={{textAlign: 'center'}}>Вікно бану</h1>
            <p style={{marginBottom: 8}}>Змушені, вам повідомити, що ви отримали бан.</p>
            <p style={{marginTop: 11}}>Причина бану: {user.ban_description}</p>
            <button className='ModalBanUser__button' onClick={logOut}>Вийти з акаунта</button>
        </motion.div>
    </div>
  )
}

export default ModalBanUser