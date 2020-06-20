import * as Global from './globals'
/* 
-----------------------------------------------------------------------------
*/
function AnalisarNaipe(cartas) {

  function ContarNaipesIguais(naipes) {
    //Retorno os naipes iguais seu antecessor ou sucessor
    let naipes_iguais = naipes.filter((naipe, index) => (
      naipe === naipes[index - 1] || naipe === naipes[index + 1]
    ))
    //Realiza uma filtragem, pois posso ter [c,c,c,d,d] 
    naipes_iguais = naipes_iguais.filter((naipe) => (
      naipes_iguais[0] === naipe
    ))

    return naipes_iguais
  } 
  
  //Retorno somente os naipes das cartas
  const naipes = Global.RetornarSomenteNaipes(cartas)
  //Me retorna o número de naipes iguais
  const naipes_iguais = ContarNaipesIguais(naipes)

  //Como só é pontuado caso todos os naipes sejam iguais, só me interessa se 
  if(naipes_iguais.length === 5){
    return "IS_SAME_SUIT"
  }else{
    return "IS_NOT_SAME_SUIT"
  }
}

function AnalisarSequencia(cartas) {
  let valores_cartas = Global.RetornarSomenteValoresCartas(cartas)

  valores_cartas = Global.TransformarLetrasEmNumeros(valores_cartas)

  valores_cartas = Global.OrganizarArrayDeNumeros(valores_cartas)

  valores_cartas = Global.RetirarRepeticoes(valores_cartas)

  function VerificarSeESequencia(cartas) {
    let i = 0
    const next_cart = cartas[i + 1]

    while(cartas[i] + 1 === next_cart){
      i++
    }

    //Se a var "i", se igualou a 4, significa que temos uma sequencia
    //[1, 2, 3, 4, 5], após o 1, durante quatro vezes
    if(i >= 4){
      return "IS_SEQUENCE"
    }

    return "IS_NOT_SEQUENCE"
  }

  const resultado = VerificarSeESequencia(valores_cartas)

  return resultado
}

function AnalisarCarta(cartas) {

  const valores_das_cartas = Global.RetornarSomenteValoresCartas(cartas)

  const repeticoes = Global.DevolverRepeticoes(valores_das_cartas)

  //Retorna cada modelo de carta presente no array
  //[1,1,3,3,5] => [1,3,5]
  function SepararTiposCartas(cartas) {
    const tipos = cartas.filter((carta, index) => (
      cartas.indexOf(carta) === index
    ))

    return tipos
  }
  
  function CalcularRepeticoes(tipos, cartas) {
    const repeticoes = tipos.map((tipo) => {
      let obj_carta = {
        carta: tipo,
        vezes: 0,
      };

      cartas.forEach((carta) => {
        if (tipo === carta) {
          obj_carta.vezes++;
        }
      });

      return obj_carta;
    }); 

    //Pois só quero as maiores repetições
    if (repeticoes.length === 3) {
      //Como repeticoes já será um array organizado do menor ao maior
      //E sabemos que o maior nú
      if(repeticoes[0].vezes === 3){
        repeticoes.splice(1, 1)
      } else {
        repeticoes.splice(0, 1)
      }
    }

    return repeticoes;
  }

  const tipos_cartas = SepararTiposCartas(repeticoes)
  const resultado = CalcularRepeticoes(tipos_cartas, repeticoes)

  return resultado
}

export function CalcularPontuacao(cartas) {
  console.log(cartas)

  const results = {
    is_same_suit: AnalisarNaipe(cartas),
    is_sequence: AnalisarSequencia(cartas),
    repeticoes: AnalisarCarta(cartas)
  }

  const {is_same_suit, is_sequence, repeticoes} = results

  //Straight Flush
  if (is_sequence && is_same_suit) {
    return 9
  }

  //Quadra
  if (repeticoes[0].vezes === 4){
    return 8
  }

  //Full House
  if (
    (repeticoes[0].vezes === 3 && repeticoes[1].vezes === 2) ||
    (repeticoes[1].vezes === 3 && repeticoes[0].vezes === 2)
  ) {
    return 7;
  }

  // Flush
  if(is_same_suit){
    return 6
  }

  // Sequencia
  if(is_sequence){
    return 5
  }

  // Trinca
  if(repeticoes[0].vezes === 3){
    return 4
  }

  // Dois Pares
  if(repeticoes[0].vezes === 2 && repeticoes[1].vezes === 2){
    return 3
  }

  // Par
  if(repeticoes[0].vezes === 2){
    return 2
  }

  // Carta Alta
  return 1
}
