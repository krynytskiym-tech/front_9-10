import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { trains } from '../data/trains'
import { useBooking } from '../context/BookingContext'
import WagonSelector from '../components/WagonSelector'
import SeatMap from '../components/SeatMap'
import BookingForm from '../components/BookingForm'
import './Booking.css'

export default function Booking() {
  const { trainId } = useParams()
  const navigate = useNavigate()
  const {
    train,
    selectedWagonId,
    selectedSeats,
    reservedSeats,
    successMessage,
    selectTrain,
    selectWagon,
    toggleSeat,
    submitBooking,
  } = useBooking()

  const currentTrain = trains.find((item) => item.id === trainId)

  useEffect(() => {
    if (!currentTrain) {
      return
    }
    selectTrain(currentTrain.id)
  }, [currentTrain, selectTrain])

  useEffect(() => {
    if (!currentTrain) {
      navigate('/')
    }
  }, [currentTrain, navigate])

  if (!currentTrain) {
    return null
  }

  const wagon = currentTrain.wagons.find((item) => item.id === selectedWagonId) ?? currentTrain.wagons[0]
  const bookedCount = reservedSeats.length

  return (
    <section className="page page-booking">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Лабораторна 10</span>
          <h1>Бронювання місць</h1>
          <p>Обирайте вагон, місця та введіть дані пасажира для підтвердження броні.</p>
        </div>
        <div className="page-actions">
          <Link to="/" className="link-button">
            Повернутися до списку потягів
          </Link>
        </div>
      </div>

      <div className="booking-grid">
        <div className="booking-panel">
          <div className="train-card-small">
            <div>
              <p className="train-number">{currentTrain.number}</p>
              <h2>{currentTrain.from} → {currentTrain.to}</h2>
              <p>{new Date(currentTrain.depart).toLocaleString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</p>
            </div>
            <div className="train-meta">
              <span>{currentTrain.duration}</span>
            </div>
          </div>

          <WagonSelector
            wagons={currentTrain.wagons}
            selectedWagonId={wagon.id}
            onSelect={selectWagon}
          />

          <div className="seat-status">
            <div><span className="status free" /> Вільні</div>
            <div><span className="status selected" /> Обрані</div>
            <div><span className="status reserved" /> Заброньовані</div>
          </div>

          <SeatMap
            rows={wagon.rows}
            cols={wagon.cols}
            selectedSeats={selectedSeats}
            reservedSeats={reservedSeats}
            onToggle={toggleSeat}
          />

          <div className="booking-summary">
            <p>Вибраний вагон: <strong>{wagon.name}</strong></p>
            <p>Тип: <strong>{wagon.type}</strong></p>
            <p>Вибрано місць: <strong>{selectedSeats.length}</strong></p>
            <p>Зайнято місць: <strong>{bookedCount}</strong></p>
          </div>
        </div>

        <div className="booking-form-panel">
          <BookingForm onSubmit={submitBooking} disabled={!selectedSeats.length} />
          {successMessage && <div className="success-banner">{successMessage}</div>}
        </div>
      </div>
    </section>
  )
}
