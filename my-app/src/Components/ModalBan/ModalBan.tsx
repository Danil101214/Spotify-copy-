import { motion } from 'framer-motion'
import React, { Dispatch, SetStateAction, useState, ChangeEvent, FormEventHandler, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { AddBanAxios } from '../../Actions/AddBanAxios'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import './Style.css'

interface MusicState {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalBan = ({open, setOpen}: MusicState) => {
    const option = [
        {id: 1, choice: 'Ні'},
        {id: 2, choice: 'Так'},
    ]
    const [filter, setFilter] = useState({
        category: ''
    })
    const [ban_description, setBan_description] = useState<string>('')
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.AddBan)
    const BanResponseServer = () => {
        dispatch(AddBanAxios({ban: add, ban_description: ban_description, id_user: user?.map(id => id)})).then(() => {
            toast('Бан виданий')
        })
    }
    const add = filter.category == 'Так' ? true : false
    console.log(add)
    const changeHandler = (e: any) => {
        setFilter({category: e.target.value})
        console.log(filter)
    }

    const animate = {
        after: {
            height: 'auto',
            opacity: 1,
            transition: {
                duration: 1.5
            },
            overflow: 'hidden'
        },
        before: {
            height: 0,
            opacity: 0
        }
    }
  return (
    <div className='modalBan'>
        <motion.div variants={animate} initial={'before'} animate={'after'} className="modalBan__container">
            <div className="modalBan__item">
                <h2 style={{color: 'white', textAlign: 'center'}}>Функції</h2>
                <div className="modalBan__block_2">
                <p style={{color: 'white', fontSize: 20, marginLeft: 6, marginTop: 0, marginBottom: 2}}>Дати бан</p>
                <select value={filter.category} onChange={changeHandler}>
                <option value='' disabled>Категорія</option>
                    {option.map(mus => 
                        <option>{mus.choice}</option>    
                    )}
                </select>
                </div>
                <input type="text" placeholder='Опис бану' className='ban__input' onChange={(e) => setBan_description(e.target.value)}/>
                <div className="modalBan__block">
                    <button className='modalBan__go_out' onClick={() => setOpen(!open)}>Вийти</button>
                    <button className='modalBan__ban' onClick={BanResponseServer}>Видати бан</button>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default ModalBan