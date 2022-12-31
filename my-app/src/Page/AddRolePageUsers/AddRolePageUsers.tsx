import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import AddRole from '../../Components/AddRole/AddRole'
import { addBan } from '../../Redux/Slices/AddBan.Slices'
import { useAppDispatch } from '../../ReduxTypezation/ReduxType'
import axios from '../../utils/axios'
import { IUser } from '../AddBan/AddBan'
import './Style.css'

const AddRolePageUsers = () => {
    const dispatch = useAppDispatch()
    const [role, setRole] = useState<IUser[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [id_user, setId_user] = useState('')
    console.log(id_user)

    async function RolesAxios() {
        const response = await axios.get('auth/')
        setRole(response.data)
        return response.data
    }
    useEffect(() => {
        RolesAxios()
    }, [])
    console.log(role)
    return (
    <div className='addRole'>
        <motion.h1 initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}}
        transition={{duration: 1}} style={{fontSize: 40, margin: 10, textAlign: 'center', 
        color: 'white'}}>Видача ролей користувачам</motion.h1>
        <div className='addRole__container'>
        <div className="addRole__item">
            <div className="addRole__block_1">
                <motion.p initial={{opacity: 0}} animate={{opacity: 1}} 
                transition={{duration: 1.5}} className='addRole__users'>Імена користувачів</motion.p>
                {role.map((role, index) =>
                <motion.div initial={{y: 1000, opacity: 0}} 
                animate={{y: 0, opacity: 1}} 
                transition={{delay: index*1, duration: 1.5}} key={index}>
                    <p className='addRole__users_name'>{role.name}</p>
                </motion.div>
                )}
            </div>
            <div className="addRole__block_2">
                <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1.5}} className='addRole__users'>Пошти користувачів</motion.p>
                {role.map((role, index) => 
                <motion.div initial={{y: -1000, opacity: 0}} 
                animate={{y: 0, opacity: 1}} 
                transition={{delay: index*1, duration: 1}} key={index}>
                    <p className='addRole__users_email'>{role.email}</p>
                </motion.div>
                )}
            </div>
            <div className="addRole__block_3">
                {role.map((role, index) => 
                    <motion.div initial={{x: 1000}} animate={{x: 0}} transition={{delay: index*1, duration: 1.5}} onClick={() => setId_user(role._id)}>
                    <div className="triangle2" onClick={() => setOpen(!open)}></div>
                    </motion.div>
                )}
            </div>
        </div>
        </div>
        {open && <AddRole open={open} setOpen={setOpen} id_user={id_user}/>}
    </div>
  )
}

export default AddRolePageUsers