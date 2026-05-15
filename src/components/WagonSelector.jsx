import styles from './WagonSelector.module.css'

export default function WagonSelector({ wagons, selectedWagonId, onSelect }) {
  return (
    <div className={styles.selector}>
      <h3>Оберіть вагон</h3>
      <div className={styles.buttons}>
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            type="button"
            className={wagon.id === selectedWagonId ? styles.selected : ''}
            onClick={() => onSelect(wagon.id)}
          >
            {wagon.name}
          </button>
        ))}
      </div>
    </div>
  )
}
