import { Link } from 'react-router-dom'
import styles from './TrainCard.module.css'

export default function TrainCard({ train }) {
  const depart = new Date(train.depart)
  const departure = depart.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
  const date = depart.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <div>
          <p className={styles.type}>{train.number}</p>
          <h2>{train.from} → {train.to}</h2>
          <p className={styles.subtext}>{date}, відправлення {departure}</p>
        </div>
        <span className={styles.duration}>{train.duration}</span>
      </div>
      <div className={styles.details}>
        <div>
          <p>Ціна</p>
          <strong>{train.price} грн</strong>
        </div>
        <div>
          <p>Вагонів</p>
          <strong>{train.wagons.length}</strong>
        </div>
      </div>
      <div className={styles.actions}>
        <Link className={styles.button} to={`/booking/${train.id}`}>
          Забронювати квиток
        </Link>
      </div>
    </article>
  )
}
