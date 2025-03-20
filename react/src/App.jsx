import { useState } from 'react'
import Home from './components/Home'
import NavBar from './components/NavBar'
import './App.css'
import ShoeCard from './components/ShoeCard'
import Search from './components/search'

function App() {
  

  return (
    <>
      <NavBar />
      <Search />
      <Home  />
     
    </>
  )
}

export default App
