import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../../Components/Loading/Loading'
import Player from '../../Components/Player/Player'
import { IMusic } from '../../Redux/Slices/Music.Slices'
import { playTrack, setActiveTrack } from '../../Redux/Slices/TrackPlayer'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import axios from '../../utils/axios'
import './Style.css'
const SearchPage = () => {
    const {album, track} = useAppSelector(state => state.track)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {pause} = useAppSelector(state => state.player)
    const {active} = useAppSelector(state => state.player)
    async function addMusicAxios(id: string) {
        const response = axios.post(`auth/addMusic/${id}`)
        if((await response).data) {
            toast('Трек успішно додано')
        }
        return (await response).data
    }
    const play = (mus: IMusic) => { 
       dispatch(setActiveTrack(mus))
       dispatch(playTrack())
    }
    
    const loader = () => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    
      loader()
    
  return (
    <>
    {loading ?
    <Loading />
    :
    <>
    {album && album?.length > 0 || track && track?.length > 0 ? <h1 style={{textAlign: 'center', color: 'white'}}>Знайдені {album ? 'альбоми' : 'треки'}</h1> 
    : 
    <h1 style={{textAlign: 'center', color: 'white', marginTop: 300}}>Нічого не знайдено за результатами пошуку</h1>}
   <>
    {album ? <div className="music-group">
        <div className="music-group__container">
            <div className="music-group__item">
                {album.map((mus, index) => 
                    <motion.div initial={{x: -1000, opacity: 0}} 
                    animate={{x: 0, opacity: 1}} transition={{delay: index*0.5}} className="music-group__card" key={index}>
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
    : 
    <div className="music">
    <div className="music__container">
        <div className="music__block_2">
            <div className="music__block__title">
                <p className='music__p2'>Кліп</p>
                <p className='music__p1'>До улюблених</p>
            </div>
                {track?.map((mus, index) => 
                <div className="music__block__img_title">
                    <div className="music__block__picture" key={index}>
                        <div className="play">
                        <div className="triangle1" onClick={() => play(mus)}></div>
                        </div>
                        <img src={'http://localhost:3000/' + mus.picture} alt={mus.name}
                        style={{width: 80, borderRadius: 2, height: 80}}/>
                        <div className="music__title__picture">
                            <p className='music__title__picture_p1' style={{margin: 0, color: 'white', fontWeight: 700}}>{mus.name}</p>
                            <p className='music__title__picture_p2' style={{margin: 0, color: 'white', marginTop: 8}}>{mus.text}</p>
                        </div>
                    </div>
                    <div className="music__block__heart" onClick={() => addMusicAxios(mus._id)}>
                      <div className="heart"></div>
                    </div>
                </div>
                )}
        </div>
        {active ? <div className="player__open"><Player /></div> : null}
    </div>
</div>  
    }
    </>
    </>
    }
    </>
  )
}

export default SearchPage