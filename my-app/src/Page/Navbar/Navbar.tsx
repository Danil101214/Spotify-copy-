import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreateMusicSort from '../../Components/CreateMusicSort/CreateMusicSort'
import ModalExit from '../../Components/ModalExit/ModalExit'
import ModalInfoUser from '../../Components/ModalInfoUser/ModalInfoUser'
import SearchModal from '../../Components/SearchModal/SearchModal'
import { IRoles, usersSlices } from '../../Redux/Slices/Users.Slices'
import { useAppDispatch, useAppSelector } from '../../ReduxTypezation/ReduxType'
import { ABOUT_US, ADDBAN, ADDROLEUSER, CREATE_MUSIC, CREATE_MUSICSORT, LOGIN, MUSIC, MY_FAVORITE_MUSIC, REGISTRATION } from '../Constants'
import './Navbar.css'

const Navbar = () => {
  const {isAuth, roles} = useAppSelector(state => state.users)
  const [open, setOpen] = useState<boolean>(false)
  const [openCreate, setOpenCreate] = useState<boolean>(false)
  const [search, setSearch] = useState<boolean>(false)
  const [className, setClassName] = useState('Navbar__container')
  const activate = () => {
    className === 'Navbar__container' ? setClassName('Navbar__container block') : setClassName('Navbar__container')
  }
  const navigate = useNavigate();
  let role = false
  let rolesUser: IRoles[] = [];
  if(roles.length > 1) {
    rolesUser = JSON.parse(roles)
    rolesUser && rolesUser.map((role) => role.value).length > 0 ? role = true : role = false
  }
  console.log(role)
  console.log(...rolesUser.map((rol) => rol.value == 'USER'))
  const dispatch = useAppDispatch();
  const [exit, setExit] = useState<boolean>(false)
  return (
    <div className='Navbar'>
      <div className="sublist" onClick={activate}>
        <div className="sublist__element" style={{marginTop: 12}}></div>
        <div className="sublist__element"></div>
        <div className="sublist__element"></div>
      </div>
        <div className={className}>
          <div className="Navbar__item">
            <nav>
            <h1>Spotify</h1>
            <ul>
              <li onClick={() => navigate(ABOUT_US)}>О нас</li>
              {isAuth && <li onClick={() => setOpen(!open)}>В мій профіль</li>}
              <li onClick={() => navigate(MUSIC)}>Пісні</li>
              {isAuth && <li onClick={() => navigate(MY_FAVORITE_MUSIC)}>Мої улюблені пісні</li>}
              {role ? <li onClick={() => navigate(ADDBAN)}>Видача банів користувачам</li> : null}
              {role ? <li onClick={() => navigate(CREATE_MUSIC)}>Створити трек</li> : null}
              {role ? <li onClick={() => setOpenCreate(!openCreate)}>Створити альбом</li> : null}
              {role ? <li onClick={() => navigate(ADDROLEUSER)}>Видача ролей користувачам</li> : null}
              <li onClick={() => setSearch(!search)}>Пошук</li>
            </ul>
            </nav>
            {isAuth ? <button className='Navbar__button' onClick={() => setExit(!exit)}>Вийти з профіля</button>
            :
            <ul className='Navbar__ul'>
              <li onClick={() => navigate(LOGIN)}>Увійти</li>
              <li onClick={() => navigate(REGISTRATION)}>Зареєструватися</li>
            </ul>
            }
          </div>
        </div>
        {open && <ModalInfoUser open={open} setOpen={setOpen}/>}
        {exit && <ModalExit exit={exit} setExit={setExit}/>}
        {openCreate && <CreateMusicSort openCreate={openCreate} setOpenCreate={setOpenCreate}/>}
        {search && <SearchModal searchProps={search} setSearch={setSearch}/>}
    </div>
  )
}

export default Navbar