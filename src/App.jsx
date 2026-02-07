import { Navigate, Route, Routes } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to="boards/697e1c3f5d8f760772cee900" replace={true}/>
      } />
      <Route path='/boards/:boardId' element={<Board />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />}/>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
