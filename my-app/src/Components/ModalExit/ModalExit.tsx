import { motion } from 'framer-motion'
import React, {Dispatch, SetStateAction} from 'react'
import { toast } from 'react-toastify'
import { usersSlices } from '../../Redux/Slices/Users.Slices'
import { useAppDispatch } from '../../ReduxTypezation/ReduxType'
import './Style.css'

interface ExitState {
  exit: boolean
  setExit: Dispatch<SetStateAction<boolean>>
}

const ModalExit = ({exit, setExit}: ExitState) => {
  const dispatch = useAppDispatch()
  const logOut = () => {
    dispatch(usersSlices.actions.logOut())
    setExit(!exit)
    if(dispatch(usersSlices.actions.logOut())) {
      toast('Ви вийшли зі свого профіля')
    }
  }
  return (
    <div className='modalExit'>
        <motion.div initial={{height: 0, opacity: 0}} 
        animate={{height: 'auto', opacity: 1, overflow: 'hidden'}} transition={{duration: 1}} 
        className="modalExit__container">
        <div className="modalExit__close"></div>
            <div className="modalExit__item">
                <h1 style={{fontSize: 40, color: 'white', marginTop: 3}}>Вихід</h1>
                <p>Ви точно впевнені, що хочете вийти?</p>
                <p>Якщо, ви вийдете, то усі ваші дані будуть скинуті.</p>
                <div className="modalExit__item_button">
                <button className='modalExit__item_button_1' onClick={() => setExit(!exit)}>Ні</button>
                <button className='modalExit__item_button_2' onClick={logOut}>Так, вийти</button>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default ModalExit