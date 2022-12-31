import { prototype } from 'events'
import { motion } from 'framer-motion'
import React, {useState, ChangeEvent, useEffect, MouseEventHandler, useCallback, useRef, FormEvent} from 'react'
import { toast } from 'react-toastify'
import { CreateMusicAxios } from '../../Actions/CreateMusicAxios'
import Loading from '../../Components/Loading/Loading'
import { CreateMusicSlices } from '../../Redux/Slices/CreateMusic.Slices'
import { MusicGroup } from '../../Redux/Slices/MusicGroup.Slices'
import { useAppDispatch } from '../../ReduxTypezation/ReduxType'
import axios from '../../utils/axios'
import './Style.css'

const CreateMusic = () => {
    const [name, setName] = useState<string>('')
    const [artist, setArtist] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const [id_artist, setId_artist] = useState('')
    const [music, setMusic] = useState<MusicGroup[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const dispatch = useAppDispatch()
    const createMusic = useCallback((e: any) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name)
        formData.append('artist', artist)
        formData.append('text', text)
        formData.append('picture', picture ? picture : '')
        formData.append('audio',  audio ? audio : '')
        formData.append('id_artist', id_artist)
        dispatch(CreateMusicAxios(formData)).then(() => {
            toast('Вітаємо, трек створений')
        })
    }, [dispatch, name, artist, text, picture, audio, id_artist])

    console.log(id_artist)
    async function MusicSortResponse() {
        const response = await axios.get('music-sort/')
        setMusic(response.data)
        return response.data
    }
    useEffect(() => {
        MusicSortResponse()
    }, [])

    const loader = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    loader()

    const changeUploadPicture = (e: any) => {
        const file = e.target.files
        setPicture(file[0])
    }

    const changeUploadAudio = (e: any) => {
        const file = e.target.files
        setAudio(file[0])
    }
    console.log(audio)
    const idArtistUpload = (e: any) => {
        setId_artist(e.target.value)
    }
    return (
    <>
    {loading ? <Loading /> :
    <div className="createMusic">
        <div className="createMusic__container">
            <div className="createMusic__item">
                <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1.5}} style={{textAlign: 'center', color: 'white', fontSize: 40, marginTop: 4}}>Створити трек</motion.h1>
                <div className="createMusic__form">
                    <form>
                        <div className="createMusic__block">
                        <motion.label initial={{x: -1000, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 2}}>Ім'я треку</motion.label>
                        <motion.input type="text" placeholder='Введіть ім`я треку' initial={{x: 2000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                        transition={{duration: 1.5}} style={{border: '1px solid white'}}
                        onChange={(e) => setName((e.target as HTMLInputElement).value)}/>
                        </div>
                        <div className="createMusic__block">
                        <motion.label initial={{x: 2000, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 2}}>Ім'я артиста</motion.label>
                        <motion.input initial={{x: -1000, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 1.5}} 
                        type="text" placeholder='Введіть ім`я артиста' style={{border: '1px solid white'}}
                        onChange={(e) => setArtist((e.target as HTMLInputElement).value)}/>
                        </div>
                        <div className="createMusic__block">
                        <motion.label initial={{x: -1000, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 2}}>Невеликий опис треку</motion.label>
                        <motion.input initial={{x: 2000, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 1.5}} 
                        type="text" placeholder='Введіть опис треку' style={{border: '1px solid white'}}
                        onChange={(e) => setText((e.target as HTMLInputElement).value)}/>
                        </div>
                        <div className="createMusic__bigBlock">
                        <div className="createMusic__block">
                        <motion.label initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 2}}>Зображення до треку</motion.label>
                        <input type="file" id='createMusic__picture'
                        onChange={changeUploadPicture} accept='image/*'/>
                        <motion.label initial={{y: 1000, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 2.5}} 
                        htmlFor='createMusic__picture' className='createMusic__label'>Оберіть файл</motion.label>
                        </div>
                        <div className="createMusic__block">
                        <motion.label initial={{y: 1000, opacity: 0}} animate={{y: 0, opacity: 1}} 
                        transition={{duration: 2}}>Додайте файл з треком</motion.label>
                        <input type="file" id='createMusic__picture_2' onChange={changeUploadAudio}/>
                        <motion.label initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}} 
                        transition={{duration: 2.5}} htmlFor='createMusic__picture_2' className='createMusic__label_2'>Оберіть файл</motion.label>
                        </div>
                        <div className="createMusic__block">
                        <motion.label initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 2}}>Оберіть артиста</motion.label>
                        <motion.select initial={{y: 1000, opacity: 0}} animate={{y: 0, opacity: 1}} 
                        transition={{duration: 2.5}} className='createMusic__select' value={id_artist} onChange={idArtistUpload}>
                            <option value='' disabled>Альбом</option>
                            {music.map((mus, index) => 
                                <option key={index} value={mus._id}>{mus.artist}</option>
                            )}
                        </motion.select>
                        </div>
                        </div>
                        <motion.button initial={{x: 2000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                        transition={{duration: 2.5}} onClick={createMusic} className='createMusic__button'>Створити трек</motion.button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default CreateMusic