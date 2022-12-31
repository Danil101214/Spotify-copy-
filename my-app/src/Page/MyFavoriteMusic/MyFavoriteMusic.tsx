import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FavoriteMusicAxios } from '../../Actions/FavoriteMusicAxios'
import Loading from '../../Components/Loading/Loading'
import Player from '../../Components/Player/Player'
import { IMusic } from '../../Redux/Slices/Music.Slices'
import { playTrack, setActiveTrack } from '../../Redux/Slices/TrackPlayer'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import './Style.css'

const MyFavoriteMusic = () => {
  const {favoriteMusic, loading} = useAppSelector(state => state.FavoriteMusic)
  const {active} = useAppSelector(state => state.player)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(FavoriteMusicAxios())
  }, [dispatch])
  const play = (mus: IMusic) => { 
    dispatch(setActiveTrack(mus))
    dispatch(playTrack())
 }

 const animate = {
  after: (i: number) => ({
    opacity: 1,
    x: 0,
    overflow: 'hidden'
  }),
  before: {
    opacity: 0,
    x: -1000
  }
 }
  return (
    <div>
      {loading ? <Loading /> :
      <>
        {favoriteMusic.length == 0 ? <p className='music__p'>Поки ви не додали жодної пісні</p> : null}
        {favoriteMusic.length > 0 && <motion.h1 initial={{x: 1000}} animate={{x: 0}} transition={{duration: 1}} style={{fontSize: 40, margin: '0px auto', display: 'flex', justifyContent: 'center', color: 'white', textAlign: 'center'}}>Мої улюблені пісні</motion.h1>}
            {favoriteMusic.length > 0 && <div className="music__block_2">
                <div className="music__block__title">
                    <motion.p initial={{y: -1000}} animate={{y: 0}} transition={{duration: 1.5}} style={{marginLeft: 60}}>Кліп</motion.p>
                </div>
                    {favoriteMusic.map((mus, index) => 
                    <div className="music__block__img_title">
                        <div className="music__block__picture" key={index}>
                            <motion.div variants={animate} initial={'before'} animate={'after'} 
                            custom={index} transition={{delay: index*0.5, duration: 2}} className="play">
                            <div className="triangle1" onClick={() => play(mus)}></div>
                            </motion.div>
                            <motion.img initial={{y: -1000, opacity: 0}} 
                            animate={{y: 0, opacity: 1}} transition={{delay: index*1, duration: 1}} 
                            src={'http://localhost:3000/' + mus.picture} alt={mus.name}
                            style={{width: 80, borderRadius: 2, height: 80, objectFit: 'cover'}}/>
                            <motion.div initial={{x: 1000, opacity: 0}} 
                            animate={{x: 0, opacity: 1}} transition={{delay: index*1, duration: 1}} 
                            className="music__title__picture">
                                <p style={{margin: 0, color: 'white', fontSize: 23, fontWeight: 700}}>{mus.name}</p>
                                <p style={{margin: 0, color: 'white', marginTop: 8, fontSize: 18}}>{mus.text}</p>
                            </motion.div>
                        </div>
                    </div>
                    )}
            </div>}
            {active ? <div className="player__open"><Player /></div> : null}
    </>
    }
    </div>
  )
}

export default MyFavoriteMusic