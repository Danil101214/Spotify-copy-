import { motion } from 'framer-motion'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../ReduxTypezation/ReduxType'
import axios from '../../utils/axios'
import './Style.css'

interface Role {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    id_user: string
}

const AddRole = ({open, setOpen, id_user}: Role) => {
    const {user} = useAppSelector(state => state.AddBan)
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')

    async function addRoleAxios(e: any) {
        e.preventDefault()
        const role = {
            id_user: id_user,
            value: value.toUpperCase(),
            description: description
        }
        const response = await axios.post('auth/roles', role)
        console.log(role)
        if(role) {
            toast('Роль додана')
        }
        return response.data
    }
  return (
    <div className="AddRole">
        <motion.div initial={{height: 0, opacity: 0}} 
        animate={{height: 'auto', opacity: 1, overflow: 'hidden'}} 
        transition={{duration: 1.5}} className="AddRole__container">
            <div className="close" onClick={() => setOpen(!open)}></div>
            <h1 style={{textAlign: 'center', marginTop: 0}}>Видача ролі</h1>
            <form>
            <div className="AddRole__block">
                <label>Напишіть роль</label>
                <input type="text" placeholder='Назва ролі' onChange={(e) => setValue(e.target.value)}/>
            </div>
            <div className="AddRole__block" style={{marginTop: 4}}>
                <label>Опишіть роль</label>
                <input type="text" placeholder='Опис ролі' onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="AddRole__block_button">
            <button className='AddRole__button' onClick={addRoleAxios}>Видати роль</button>                
            </div>
            </form>
        </motion.div>
    </div>
  )
}

export default AddRole