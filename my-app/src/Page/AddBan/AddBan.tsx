import { motion } from 'framer-motion'
import React, {useState, useEffect} from 'react'
import ModalBan from '../../Components/ModalBan/ModalBan'
import AddBanSlices, {addBan} from "../../Redux/Slices/AddBan.Slices"
import { useAppDispatch } from '../../ReduxTypezation/ReduxType'
import axios from '../../utils/axios'
import './Style.css'

export interface IUser {
    ban: boolean
    ban_description: string
    name: string
    email: string
    _id: string
}

const AddBan = () => {
    const [addBan_1, setAddBan] = useState<IUser[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    async function BanAxios() {
        const response = await axios.get('auth/')
        setAddBan(response.data)
        return response.data
    }
    useEffect(() => {
        BanAxios()
    }, [])
    console.log(addBan)
    return (
    <div className='addBan'>
        <motion.h1 initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{duration: 1}} style={{fontSize: 40, margin: 10, textAlign: 'center', 
        color: 'white'}}>Додавання банів до користувачів</motion.h1>
        <div className='addBan__container'>
        <div className="addBan__item">
            <div className="addBan__block_1">
                <motion.p initial={{opacity: 0}} animate={{opacity: 1}} 
                transition={{duration: 1.5}} className='addBan__users'>Імена користувачів</motion.p>
                {addBan_1.map((ban, index) =>
                <motion.div initial={{y: 1000, opacity: 0}} 
                animate={{y: 0, opacity: 1}} 
                transition={{delay: index*1, duration: 1.5}} key={index}>
                    <p className='addBan__users_name'>{ban.name}</p>
                </motion.div>
                )}
            </div>
            <div className="addBan__block_2">
                <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1.5}} className='addBan__users'>Пошти користувачів</motion.p>
                {addBan_1.map((ban, index) => 
                <motion.div initial={{y: -1000, opacity: 0}} 
                animate={{y: 0, opacity: 1}} 
                transition={{delay: index*1, duration: 1}} key={index} className='addBan__block_email'>
                    <p className='addBan__users_email'>{ban.email}</p>
                </motion.div>
                )}
            </div>
            <div className="addBan__block_3">
                {addBan_1.map((ban, index) => 
                    <motion.div initial={{x: 1000}} animate={{x: 0}} transition={{delay: index*1, duration: 1.5}} onClick={() => dispatch(addBan.actions.fetchId(ban._id))}>
                    <div className="triangle2" onClick={() => setOpen(!open)}></div>
                    </motion.div>
                )}
                {open && <ModalBan open={open} setOpen={setOpen}/>}
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddBan