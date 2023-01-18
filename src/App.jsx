import { useState } from "react";

const TURNS = {
  X: 'x',
  O: 'o'
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index);
  }


  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,5],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]

];




function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  //estado para definir el ganador, como base null, false es empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck)=>{
    //revisamos todas las posibilidades ganadoras a ver si hay ganador
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo;
      if(boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]) {
          return boardToCheck[a];
        }
    }
    //si no hay ganador
    return null;
  }

  const updateBoard = (index) =>{
    //Si hay algo en esa posicion del tablero o hay ganador
    //no hace nada
    if(board[index] || winner) return
    //Actualiza el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambia el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //vemos si con el nuevo board hay un ganador
    const newWinner = checkWinner(newBoard);
    if(newWinner) {
      setWinner(newWinner);
    }
  }

  // A TENER EN CUENTA QUE LOS ACTUALIZACIONES DE ESTADO SON ASINCRONAS, POR ENDE
  // UNA LINEA DE CODIGO POR ENCIMA DE OTRA NO BLOQUEA LA SIGUIENTE
  // LOS RESULTADOS DE LAS MODIFICACIONES DE ESTADO SE DAN UNA VEZ QUE SE TERMINE DE
  // RENDERIZAR NUEVAMENTE EL COMPONENTE

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index} 
                updateBoard={updateBoard}
                >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>

  )
}

export default App
