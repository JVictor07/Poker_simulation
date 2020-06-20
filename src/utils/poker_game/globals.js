export function OrganizarArrayDeNumeros(numeros) {
  numeros.sort(function(a, b) {
    return a - b
  })

  return numeros
}

export function RetornarSomenteNaipes(cartas) {
  const lista_naipes = cartas.map(carta => {
    if (carta.length === 3){
      return carta.substr(2, 1)
    }
    return carta.substr(1, 1)
  })

  return lista_naipes
}

export function RetornarSomenteValoresCartas(cartas) {
  const valores_cartas = cartas.map(carta => {
    //Pois posso ter cartas como o 10a que precisarei retornar 2 string "1 e 0".
    if(carta.length === 3){ 
      return carta.substr(0, 2)
    }
    return carta.substr(0, 1)
  })

  return valores_cartas
}

export function TransformarLetrasEmNumeros(cartas, as_maior) {
  const array_de_numeros = cartas.map((valor, index) => {
    if (valor === "J") {
      return 11;
    } else if (valor === "Q") {
      return 12;
    } else if (valor === "K") {
      return 13;
    } else if (valor === "A" && as_maior) {
      return 14;
    } else if (valor === "A"){
      return 1
    }
    else { //Caso já seja um número
      return Number(valor);
    }
  })

  return array_de_numeros
}

export function DevolverRepeticoes(arr) {
  //Pois só quero que os valores fiquem lado a lado
  arr.sort()

  let retornar_proxima = false
  const repeticoes = arr.filter((carta, index) => {
    if(carta === arr[index + 1]){
      retornar_proxima = true
      return carta
    } else if (retornar_proxima) {
      retornar_proxima = false
      return carta
    }
  })

  return repeticoes
}

export function RetirarRepeticoes(valores) {
  const valores_limpos = valores.filter((valor, index) => (
    valores.indexOf(valor) === index
  ))

  return valores_limpos
}