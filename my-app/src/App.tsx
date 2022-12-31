import { useEffect } from 'react';
import './App.css';
import ModalBanUser from './Components/ModalBanUser/ModalBanUser';
import ToastContainerComponent from './Components/ToastContainer/ToastContainer';
import AppRouter from './Page/AppRouter/AppRouter';
import Navbar from './Page/Navbar/Navbar';
import { useAppDispatch, useAppSelector } from './ReduxTypezation/ReduxType';

function App() {

  const {user} = useAppSelector(state => state.users)

  return (
    <div className='wrapper'>
      <div className="container">
      <Navbar />
      <AppRouter />
      {user.ban == true || user.ban == 'true' && <ModalBanUser />}
      <ToastContainerComponent />
      </div>
    </div>
  );
}

export default App;