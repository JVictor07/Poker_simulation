import React, { useState } from 'react'
import { Link } from "react-router-dom"

import './Login.scss'

export default function Login() {
  const [players, setPlayers] = useState()
  const [start, setStart] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const handleInputChange = (players) => {
    setPlayers(players)

    setTimeout(() => {
      if (players < 2 || players > 8){
        setErrorMessage("Para jogar, precisamos de 2 a 8 jogadores")
        setStart(false) //Caso ele esteja true
        return
      }

      setErrorMessage(false)
      setStart(true)
    },500)
  }

  return (
    <main className="main-login">
      <div className="login">
        <h2 className="login__title">Vamos começar ?</h2>
        <div className="login__form">
          <input
            required
            type="number"
            placeholder="Digite o número de jogadores"
            value={players || ""}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          {start && <Link to={`/Game/${players}`} className="form__button">Começar</Link>}
        </div>

        {errorMessage && <span className="login__error">{errorMessage}</span>}
      </div>
    </main>
  );
}
