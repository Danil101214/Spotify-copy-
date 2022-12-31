import { AnimatePresence, motion } from 'framer-motion'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlbumAxios, trackAxios } from '../../Actions/MusicAxios'
import { SEARCHPAGE } from '../../Page/Constants'
import { IMusic } from '../../Redux/Slices/Music.Slices'
import { MusicGroup } from '../../Redux/Slices/MusicGroup.Slices'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import axios from '../../utils/axios'
import './Style.css'

interface SearchProps {
    searchProps: boolean
    setSearch: Dispatch<SetStateAction<boolean>> 
}

const SearchModal = ({searchProps, setSearch}: SearchProps) => {
    const navigate = useNavigate()
    const {album, track} = useAppSelector(state => state.track)
    const music = [
        {id: 1, name: 'Трек'},
        {id: 2, name: 'Альбом'}
    ]
    const [select, setSelect] = useState('')
    console.log(select)
    const [query, setQuery] = useState<string>('')
    console.log(query)
    const dispatch = useAppDispatch()
    
    function search() {
        if(select == 'Альбом') {
            dispatch(AlbumAxios(query))
        } else if (select == 'Трек') {
            dispatch(trackAxios(query))
        }
    } 

    const click = (e: any) => {
        e.preventDefault()
    }

    useEffect(() => {
        if(query.length > 3) {
            search()
        }
    }, [])
    console.log(track)
  return (
        <div className="searchModal">
            <AnimatePresence>
            {searchProps && (
            <motion.div initial={{height: 0}} animate={{height: 'auto'}} 
            style={{overflow: 'hidden'}} exit={{height: 0, transition: {duration: 2}}} 
            transition={{duration: 1}} className="searchModal__container">
            <div className="close__block">
                <div className="close" onClick={() => setSearch(!searchProps)}>
                </div>
                <div className="close__1"></div>
                <div className="close__2"></div>
            </div>
            <div className="searchModal__item">
                <h1 style={{textAlign: 'center'}}>Пошук</h1>
                <form onClick={click}>
                    <div className="searchModal__block">
                        <label>Що бажаєте знайти?</label>
                        <select className='searchModal__select' value={select} onChange={(e) => setSelect(e.target.value)}>
                        <option value='' disabled>Оберіть пошук</option>
                            {music.map((mus, index) =>
                                <option key={index} value={mus.name}>{mus.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="searchModal__block_2">
                        <label>Введіть текст у пошук</label>
                        <input type="search" placeholder='Введіть текст у пошук' onClick={search} onChange={(e) => setQuery(e.target.value)}/>
                        <div onClick={() => setSearch(!searchProps)}>
                        <div onChange={(e) => (e.target as any).preventDefault} onClick={search}>
                        {album && album.length >= 1 || track && track.length >=1 ? 
                        <p style={{marginBottom: 4, marginTop: 4}}>Знайдено {album && album.length || track && track.length} {album ? 'альбомів' : 'треків'}</p> 
                        : 
                        null}
                        <button onClick={() => navigate(SEARCHPAGE)} style={{marginTop: 4}}>Знайти</button>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
        )}
        </AnimatePresence>
    </div>
  )
}

export default SearchModal