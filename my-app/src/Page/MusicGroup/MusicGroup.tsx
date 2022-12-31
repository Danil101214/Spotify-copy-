import { motion } from 'framer-motion'
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
//import { useNavigate } from 'react-router-dom'
import { MusicGroupAxios } from '../../Actions/MusicGroupAxios'
import Loading from '../../Components/Loading/Loading'
import ModalExit from '../../Components/ModalExit/ModalExit'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import './Style.css'

const MusicGroup = () => {
    const {musicGroup, loading} = useAppSelector(state => state.musicGroup)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(MusicGroupAxios())
    }, [dispatch])
    const animation = {
        after: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i*0.5
            }
        }),
        before: {
            opacity: 0,
            x: -1000
        }
    }
    console.log(musicGroup)
  return (
    <>
    {loading ? 
        <Loading />
    :
    <div className="music-group">
        <div className="music-group__container">
            <div className="music-group__item">
                {musicGroup.map((mus, i) => 
                    <motion.div variants={animation} initial={'before'} animate={'after'} custom={i} className="music-group__card" key={i}>
                        <img src={'http://localhost:3000/' + mus.picture} width={200} height={200}/>
                        <h3>{mus.artist}</h3>
                        <p>{mus.description}</p>
                         <div className="play" onClick={() => navigate(`/music/${mus._id}`)}>
                            <div className="triangle">
                            </div>
                        </div>
                     </motion.div>
                )}
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default MusicGroup