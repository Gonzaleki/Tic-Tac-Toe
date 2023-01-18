import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { BoardGame } from "./components/Board";




function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  //estado para definir el ganador, como base null, false es empate
  const [winner, setWinner] = useState(null);

  

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }



  const updateBoard = (index) =>{
    //Si hay algo en esa posicion del tablero o hay ganador
    //no hace nada en el tablero
    if(board[index] || winner) return
    //Actualiza el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambia el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //vemos si con el nuevo board hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner) {
      confetti();
      setWinner(newWinner);
    } else if(checkEndGame(newBoard)){
      setWinner(false) //hay empate
    }
  }

  // A TENER EN CUENTA QUE LOS ACTUALIZACIONES DE ESTADO SON ASINCRONAS, POR ENDE
  // UNA LINEA DE CODIGO POR ENCIMA DE OTRA NO BLOQUEA LA SIGUIENTE
  // LOS RESULTADOS DE LAS MODIFICACIONES DE ESTADO SE DAN UNA VEZ QUE SE TERMINE DE
  // RENDERIZAR NUEVAMENTE EL COMPONENTE

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>

        <BoardGame board={board} updateBoard={updateBoard} />

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>

  )
}

export default App
