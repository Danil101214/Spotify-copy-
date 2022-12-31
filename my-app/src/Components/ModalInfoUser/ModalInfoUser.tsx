import { AnimatePresence, motion } from 'framer-motion'
import React, { Dispatch, SetStateAction } from 'react'
import { useAppSelector } from '../../ReduxTypezation/ReduxType'
import user_image from './01.png'
import './Style.css'

interface InfoState {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalInfoUser = ({open, setOpen}: InfoState) => {
  const {email, name, user} = useAppSelector(state => state.users)
  return (
    <AnimatePresence>
      {open && 
      (
    <motion.div  className={open ? "modal active" : "modal"}>
      <motion.div initial={{width: 0, opacity: 0, x: -1000}} animate={{width: 'auto', overflow: 'hidden', opacity: 1, x: 0}} exit={{x: 0, width: 0}} transition={{duration: 2}} className="modal__content">
      <div className="close__block">
        <div className="close" onClick={() => setOpen(!open)}></div>
        </div>
        <h1 style={{marginTop: 3}}>Інформація про користувача</h1>
        <img src={user_image} alt="image" style={{maxHeight: 200, maxWidth: 200, display: 'flex', justifyContent: 'center', margin: '0px auto'}}/>
        <p style={{fontWeight: 600, fontSize: 20, marginBottom: 4}}>Пошта: {email}</p>
        <p style={{marginTop: 0, fontWeight: 600, fontSize: 20, marginBottom: 4}}>Ім'я: {name}</p>
        {user.ban == 'false' ? <p style={{marginTop: 0, fontWeight: 600, fontSize: 20, marginBottom: 4}}>Бани: У вас немає банів</p>
        : 
        <p style={{marginTop: 0, fontWeight: 600, fontSize: 20, marginBottom: 4}}>Бани: У вас є бани</p>}
        {user.ban == 'true' ? <p>Опис бану: {user.ban_description}</p> : null}
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalInfoUser