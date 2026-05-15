import TrainCard from './TrainCard'
import styles from './TrainList.module.css'

export default function TrainList({ trains }) {
  if (trains.length === 0) {
    return <p className={styles.empty}>За вашим запитом нічого не знайдено.</p>
  }

  return (
    <div className={styles.list}>
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  )
}
