import React, {useState} from "react";
import "./Game.scss";
import Card from "../../components/Card/Card";
import { useParams } from 'react-router-dom'

import { StartGame } from '../../utils/poker_game/cartas'

import { CalcularPontuacao } from '../../utils/poker_game/winner'

export default function Game() {
  const { players } = useParams()
  const { table, players_cards } = StartGame(players)
  const [ score, setScore ] = useState([])
  const [ winner, setWinner ] = useState(null)

  function EncontrarPosicaoGanhador() {
    const biggest = score.map((a, b) => {
      return Math.max(a, b)
    })

    setWinner(score.indexOf(biggest))
  }

  return (
    <main className="main-game">
      <section className="table">
        <h2>Mesa</h2>
        <ul className="cards">
          {table.map((card, index) => (
            <Card key={index} card={card}/>
          ))}
        </ul>
      </section>

      <section className="players">
        {players_cards.map(({player, cards}, index) => {
          const score = CalcularPontuacao([...cards, ...table])
          /* setScore(score)  */

          return(
            <div key={index} className="players__player">
              <span>Jogador {player}</span>
              <ul className="cards">
                {cards.map((card, index) => (
                  <Card key={index} card={card}/>
                ))}
              </ul>
            </div>
          )
        })}
      </section>
    </main>
  );
}
