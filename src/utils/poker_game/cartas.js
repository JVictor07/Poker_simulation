const clubs = ["Ac","2c","3c","4c","5c","6c","7c","8c","9c","10c","Jc","Qc","Kc"]
const diamonds = ["Ad","2d","3d","4d","5d","6d","7d","8d","9d","10d","Jd","Qd","Kd"]
const hearts = ["Ah","2h","3h","4h","5h","6h","7h","8h","9h","10h","Jh","Qh","Kh"]
const spades = ["As","2s","3s","4s","5s","6s","7s","8s","9s","10s","Js","Qs","Ks"]

var deck = [...clubs, ...diamonds, ...hearts, ...spades]

//Função separada, pois caso a aplicação for simular
//uma real partida de poker, poderei pegar as cartas
//da mesa em cada rodada, através dela
function PegarCartaNoDeck() {
  //Sorteio um número qualquer para ser minha posição no deck
  const posicao_array = Math.floor(Math.random() * (deck.length + 1))

  const carta = deck[posicao_array]
  deck.splice(posicao_array, 1) //retiro a carta do baralho

  return carta
}

export function StartGame(num_jogadores) {
  function DestribuirCartas(numero_de_cartas) {
    const cartas = [];

    while (numero_de_cartas > 0) {
      let cart = PegarCartaNoDeck();
      cartas.push(cart);

      numero_de_cartas--;
    }

    return cartas;
  }

  const table = DestribuirCartas(5);
  const players_cards = [];
  let cont = 1

  while (num_jogadores > 0) {
    players_cards.push({
      player: cont.toString(),
      cards: DestribuirCartas(2),
    });

    cont++
    num_jogadores--;
  }

  return {
    table,
    players_cards,
  };
}



