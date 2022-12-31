import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../../ReduxTypezation/ReduxType'
import { AuthRouter, PublicRouter } from '../../Router'
import './Style.css'

const AppRouter = () => {
  const {isAuth} = useAppSelector(state => state.users)
  return (
    <>
    <div className='AppRouter' style={{display: 'flex', flex: '1 1 auto', flexDirection: 'column'}}>
        <Routes>
        {AuthRouter && isAuth ? AuthRouter.map(({path, element}) => {
            return <Route path={path} element={element}/>
        }): PublicRouter.map(({path, element}) => {
          return <Route path={path} element={element}/>
      })}
        </Routes>
    </div>
      </>
  )
}

export default AppRouter