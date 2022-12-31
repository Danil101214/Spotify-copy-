import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { CreateMusicSortAxios } from '../../Actions/CreateMusicSortAxios'
import { ICreateMusic } from '../../Redux/Slices/CreateMusicSort.Slices'
import { useAppDispatch } from '../../ReduxTypezation/ReduxType'
import axios from '../../utils/axios'
import './Style.css'

interface openCreateProps {
  openCreate: boolean
  setOpenCreate: Dispatch<SetStateAction<boolean>>
}

const CreateMusicSort = ({openCreate, setOpenCreate}: openCreateProps) => {
  const [artist, setArtist] = useState<string>('')
  const [picture, setPicture] = useState(null)
  const [description, setDescription] = useState('')

  console.log(artist)
  const dispatch = useAppDispatch()
  
  async function CreateMusicSortAxios(data: any) {
    const response = await axios.post('music-sort', data)
    const musicSort = {
      artist: data.artist,
      picture: data.picture,
      description: data.description
    }
      return {
        musicSort: console.log(musicSort),
        response: console.log(response.data)
      }
  }

  const createMusicSort = useCallback((e: any) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('artist', artist)
    formData.append('picture', picture ? picture : '')
    formData.append('description', description)
    CreateMusicSortAxios(formData).then(() => {
      toast('Вітаємо, альбом створений')
    })
  }, [artist, picture, description])
  const addPicture = (e: any) => {
    const file = e.target.files
    setPicture(file[0])
  }

  return (
    <div className="createMusicSort">
        <AnimatePresence>
          {openCreate && (
          <motion.div initial={{height: 0}} animate={{height: 'auto', overflow: 'hidden'}} transition={{duration: 2}} className="createMusicSort__container">
            <div className="close__block">
            <div className="close" onClick={() => setOpenCreate(!openCreate)}>
                <div className="close__1"></div>
                <div className="close__2"></div>
            </div>
            </div>
            <div className="createMusicSort__item">
            <h1>Створення альбому</h1>
            <div className="createMusicSort__bigBlock">
            <label htmlFor="">Ім'я артиста</label>
            <input type="text" name='artist' placeholder='Введіть ім`я артиста' onChange={(e) => setArtist(e.target.value)}/>
            </div>
            <div className="createMusicSort__bigBlock_2">
            <label>Фотографія артиста</label>
            <input type="file" name='artist' id='createMusicSort__file' onChange={addPicture}/>
            <label htmlFor="createMusicSort__file">Оберіть файл</label>
            </div>
            <div className="createMusicSort__bigBlock">
            <label htmlFor="">Невеликий опис про артиста</label>
            <input type="text" name='artist' placeholder='Введіть опис про артиста' onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <button className='createMusicSort__button' onClick={createMusicSort}>Створити альбом</button>                
            </div>
        </motion.div>
        )}
        </AnimatePresence>
    </div>
  )
}

export default CreateMusicSort