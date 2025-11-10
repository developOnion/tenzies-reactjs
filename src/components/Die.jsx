export default function Die({ value, isHeld, id, onHold }) {
    return (
        <button
            onClick={() => onHold(id)}
            className={`die ${isHeld ? "held" : ""}`}
            aria-pressed={isHeld}
            aria-label={`Die with value ${value}, ${
                isHeld ? "held" : "not held"
            }`}
        >
            {value}
        </button>
    );
}
