import React, { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import './Style.css'
import { AudioHTMLAttributes } from 'react'
import axios from '../../utils/axios'
import { IMusic, MusicSlices } from "../../Redux/Slices/Music.Slices"
import { AxiosResponse } from 'axios'
import { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume } from '../../Redux/Slices/TrackPlayer'
import {FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa'
let audio: HTMLAudioElement;
const Music = () => {
    const dispatch = useAppDispatch()
    const {pause, volume, active, duration, currentTime} = useAppSelector(state => state.player)
    useEffect(() => {
      if(!audio) {
        audio = new Audio();
      } else {
        setAudio()
        play()
      }
    }, [active])
    console.log(active?.audio)
    
    const setAudio = () => {
      if (active) {
          audio.volume = volume / 100
          audio.src = 'http://localhost:3000/' + active.audio
          audio.onloadedmetadata = () => {
            setDuration(audio.duration)
          }
          audio.ontimeupdate = () => {
            setCurrentTime(audio.currentTime)
          }
        }
    }
    const play = () => {
      if(pause) {
        dispatch(playTrack())
        audio.pause()
      } else {
        dispatch(pauseTrack())
        audio.play()
      }
    }

    const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
      audio.volume = Number(e.target.value) / 100
      setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
      audio.currentTime = Number(e.target.value)
      setCurrentTime(Number(e.target.value))
    }
  return (
    <div className='player'>
      <div className="player__container">
        <div className="player__item">
          <form>
            <div className="player__form_1">
            <label style={{display: 'flex', justifyContent: 'center', marginBottom: 7, color: 'white', fontSize: 20}}>Тривалість</label>
            <input className='player__input' type="range" onChange={changeCurrentTime}/>
            </div>
            {pause ? <FaRegPlayCircle fontSize={60} onClick={play} className='player__button'/> : <FaRegPauseCircle fontSize={60} onClick={play} className='player__button'/>}
            <div className="player__form_2">
            <label style={{display: 'flex', justifyContent: 'center', marginBottom: 7, color: 'white', fontSize: 20}}>Звук</label>
            <input className='player__input_2' type="range" min={0} max={100} onChange={changeVolume}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Music