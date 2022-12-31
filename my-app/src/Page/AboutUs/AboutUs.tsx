import { motion } from 'framer-motion'
import React from 'react'
import spotify_image from './01.jpg'
import spotify_home from './02.jpg'
import './Style.css'

const AboutUs = () => {
  return (
    <div className="AboutUs">
        <div className="AboutUs__container">
            <div className="AboutUs__item">
                <motion.h1 initial={{y: -1000, opacity: 0}} animate={{y: 0, opacity: 1}} 
                transition={{duration: 1}} style={{textAlign: 'center', color: 'white'}}>О нас</motion.h1>
                <div className="AboutUs__block_1">
                    <motion.img initial={{x: -1000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                    transition={{duration: 1.5}} src={spotify_image} alt="spotify_image" />
                    <motion.p initial={{x: 1000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                    transition={{duration: 1.5}}>Spotify — стримінговий сервіс потокового аудіо, що дозволяє прослуховувати музичні композиції та подкасти. Надає послуги легального онлайнового стримінгу аудіозаписів основних світових і незалежних лейблів, в тому числі BBC, Sony, EMI, Warner Music Group та Universal. Запущений у жовтні 2008 року шведським стартапом «Spotify AB».
                    «Spotify» є першим стримінговим сервісом, який надає можливість слухати музику онлайн, не завантажуючи її на пристрій. Сервіс є доступним у всіх країнах Америки (крім Куби), Європи й Океанії, а також у більшості країн Азії й Африки.</motion.p> 
                </div>
                <div className="AboutUs__block_2">
                    <motion.p initial={{x: -1000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                    transition={{duration: 2}}>Попри стабільне зростання прибутків, збитковість Spotify продовжує збільшуватись, досягнувши 394 мільйонів доларів за 2 квартал 2018 року.
                    У лютому 2019 року за 340 млн доларів були придбані компанії Gimlet Media Inc. та Anchor FM Inc., які створюють і розповсюджують подкасти. До кінця року Spotify планувала витратити на подкасти $500 млн, вбачаючи в них серйозні рекламні можливості. З 14 липня 2020 року, сервіс доступний в Україні
                    У листопаді 2021 року Spotify придбав платформу для аудіокниг Findaway.
                    У лютому 2022 року Spotify оголосили про намір стати титульним спонсором футбольного клубу Барселона, та купити назву легендарної арени «Камп Ноу». Барселона та Spotify підпишуть контракт на три сезони, сума якого складає 280 мільйонів євро.</motion.p>
                    <motion.img initial={{x: -1000, opacity: 0}} animate={{x: 0, opacity: 1}} 
                    transition={{duration: 2}} src={spotify_home} alt="spotify_home" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutUs