import { Square } from "./Square";

export function BoardGame({ board, updateBoard }) {
    return (
        <section className="game">
            {
                board.map((square, index) => {
                    console.log(square)
                    console.log(index)
                    return (

                        <Square
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {square}
                        </Square>

                    )
                })
            }
        </section>
    )

}