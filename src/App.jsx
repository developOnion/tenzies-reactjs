import { useEffect, useRef, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice());
    const btnRef = useRef(null);

    const gameWon =
        dice.every((die) => die.isHeld) &&
        dice.every((die) => die.value === dice[0].value);

    useEffect(() => {
        if (gameWon) {
            btnRef.current.focus();
        }
    }, [gameWon]);

    const dieEles = dice.map((die) => {
        return <Die key={die.id} {...die} onHold={handleHold} />;
    });

    function handleHold(id) {
        setDice((prevDice) =>
            prevDice.map((die) =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    }

    function generateAllNewDice() {
        return new Array(10).fill(null).map(() => {
            return {
                id: nanoid(),
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
            };
        });
    }

    function handleRoll() {
        setDice((prevDice) =>
            prevDice.map((die) =>
                die.isHeld
                    ? die
                    : { ...die, value: Math.floor(Math.random() * 6) + 1 }
            )
        );
    }

    function handleNewGame() {
        setDice(generateAllNewDice());
    }

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>You won! Press "New Game" to play again</p>}
            </div>
            <h1 id="title">Tenzies</h1>
            <p id="rule">
                Roll until all dice are the same. Click each dice to freeze it
                at its current value between rolls. Refresh will restart.
            </p>
            <div id="dice-container">{dieEles}</div>
            <button
                onClick={gameWon ? handleNewGame : handleRoll}
                id="roll-btn"
                ref={btnRef}
            >
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    );
}
