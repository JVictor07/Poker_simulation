import React, { useState, useEffect } from 'react';

function Game({cards}) {
  console.log(cards)

  /* const[table, setTable] = useState([])
  const[players, setPlayers] = useState([])
  
  useEffect(() => {
    setTable(cards.mesa)
    
  }, [cards.mesa]) */

  return(
    <>
      <div>
        Mesa:
        {cards.table.map((card, index) => (
          <div key={index}>
            {card}
          </div>
        ))}
      </div>
      {cards.players_cards.map(player => (
        <div>
          <span>Jogador: {player.player}</span>
          <ul>
            cartas
            {player.cards.map(card => (
              <li>{card}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default Game;