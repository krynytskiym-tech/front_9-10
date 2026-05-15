import { useMemo, useState } from 'react'
import { trains } from '../data/trains'
import TrainList from '../components/TrainList'
import './Home.css'

const filterTrains = (items, query) => {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return items
  return items.filter(
    (train) =>
      train.number.toLowerCase().includes(normalized) ||
      `${train.from} ${train.to}`.toLowerCase().includes(normalized),
  )
}

export default function Home() {
  const [query, setQuery] = useState('')
  const filteredTrains = useMemo(() => filterTrains(trains, query), [query])

  return (
    <section className="page page-home">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Лабораторна 9–10</span>
          <h1>Система продажу залізничних квитків</h1>
          <p>Переглядайте потяги, обирайте вагон та бронюйте місця онлайн.</p>
        </div>
        <div className="search-box">
          <label htmlFor="search">Пошук за номером або маршрутом</label>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Київ → Львів, 012М" 
          />
        </div>
      </div>
      <TrainList trains={filteredTrains} />
    </section>
  )
}
