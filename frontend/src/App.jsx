import { Outlet } from 'react-router-dom'

// componentes
import NavBar from './components/NavBar'

import './App.css'

function App() {


  return (
    <>
      <NavBar/>
      <h1>teste</h1>
      <Outlet/>
    </>
  )
}

export default App
