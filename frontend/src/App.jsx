import { useState } from 'react'
import './App.css'
import Title from './components/Title'
import Game from './components/Game'
import Audio from "./components/Audio"

function App() {

  return (
    <>
      <Title />
      <Game />
      <Audio />
    </>
  )
}

export default App
