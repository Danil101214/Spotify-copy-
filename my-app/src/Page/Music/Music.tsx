import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MusicGroupIdAxios } from '../../Actions/MusicGroupIdAxios'
import Player from '../../Components/Player/Player'
import { IMusic } from '../../Redux/Slices/Music.Slices'
import { playTrack, setActiveTrack } from '../../Redux/Slices/TrackPlayer'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import './Style.css'
import axios from '../../utils/axios'
import Loading from '../../Components/Loading/Loading'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const Music = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(MusicGroupIdAxios(id))
    }, [dispatch])
    const {pause} = useAppSelector(state => state.player)
    const {music} = useAppSelector(state => state.MusicId)
    const {musicsGroup, loading} = useAppSelector(state => state.MusicId)
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

    const animate = {
        after: (index: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: index*0.5,
                duration: 1.25
            }
        }),
        before: {
            x: -1000,
            opacity: 0
        }
    }
  return (
    <>
    {loading ? 
    <Loading />
    :
    <div className="music">
        <div className="music__container">
            <div className="music__item__1">
                <div className="music__block_1">
                    <motion.img initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1}} src={'http://localhost:3000/' + music?.picture} alt={music?.artist} style={{maxWidth: 200}}/>
                </div>
                <div className="music__block_2_1">
                    <motion.p initial={{x: 1000, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 1.25}} className='music__playlist' style={{color: 'white', marginBottom: 1, fontSize: 30, marginTop: 1}}>Плейліст</motion.p>
                    <motion.h1 initial={{x: 1000, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 1.75}} className='h1'>{music?.artist}</motion.h1>
                    <motion.p initial={{x: 1000, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 2}} className='music__description'>{music?.description}</motion.p>
                </div>
            </div>
            <div className="music">
        <div className="music__container">
            <div className="music__block_2">
                <div className="music__block__title">
                    <p className='music__p2'>Кліп</p>
                    <p className='music__p1'>До улюблених</p>
                </div>
                    {musicsGroup?.map((mus, index) => 
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
        </div>
    </div>
    }
    </>
    )
}

export default Music