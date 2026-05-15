import styles from './SeatMap.module.css'

export default function SeatMap({ rows, cols, selectedSeats, reservedSeats, onToggle }) {
  const seatCount = rows * cols
  const seats = Array.from({ length: seatCount }, (_, index) => index + 1)

  return (
    <div className={styles.wrapper}>
      <h3>Схема місць</h3>
      <div className={styles.map}>
        {seats.map((seat) => {
          const isReserved = reservedSeats.includes(seat)
          const isSelected = selectedSeats.includes(seat)
          const stateClass = isReserved
            ? styles.reserved
            : isSelected
            ? styles.selected
            : styles.free

          return (
            <button
              key={seat}
              type="button"
              className={`${styles.seat} ${stateClass}`}
              onClick={() => onToggle(seat)}
              disabled={isReserved}
            >
              {seat}
            </button>
          )
        })}
      </div>
    </div>
  )
}
