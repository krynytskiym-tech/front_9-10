import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { addBooking, getReservedSeats } from '../services/BookingService'
import { trains } from '../data/trains'

const BookingContext = createContext(null)

export const BookingProvider = ({ children }) => {
  const [train, setTrain] = useState(null)
  const [selectedWagonId, setSelectedWagonId] = useState('')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [reservedSeats, setReservedSeats] = useState([])
  const [successMessage, setSuccessMessage] = useState('')

  const selectTrain = useCallback((trainId) => {
    const target = trains.find((item) => item.id === trainId) ?? null
    setTrain(target)
    setSelectedSeats([])
    setSuccessMessage('')
    setSelectedWagonId(target?.wagons?.[0]?.id ?? '')
  }, [])

  const selectWagon = useCallback((wagonId) => {
    setSelectedWagonId(wagonId)
    setSelectedSeats([])
    setSuccessMessage('')
  }, [])

  useEffect(() => {
    if (!train || !selectedWagonId) {
      setReservedSeats([])
      return
    }
    setReservedSeats(getReservedSeats(train.id, selectedWagonId))
  }, [train, selectedWagonId])

  const toggleSeat = useCallback(
    (seatNumber) => {
      if (reservedSeats.includes(seatNumber)) {
        return
      }
      setSelectedSeats((prev) =>
        prev.includes(seatNumber)
          ? prev.filter((item) => item !== seatNumber)
          : [...prev, seatNumber],
      )
    },
    [reservedSeats],
  )

  const submitBooking = useCallback(
    ({ name, phone, email }) => {
      if (!train || !selectedWagonId || selectedSeats.length === 0) {
        return false
      }
      addBooking({
        trainId: train.id,
        wagonId: selectedWagonId,
        seats: selectedSeats,
        passenger: { name, phone, email },
      })
      setSuccessMessage(`Успішно заброньовано місця: ${selectedSeats.join(', ')}`)
      setSelectedSeats([])
      setReservedSeats(getReservedSeats(train.id, selectedWagonId))
      return true
    },
    [train, selectedWagonId, selectedSeats],
  )

  return (
    <BookingContext.Provider
      value={{
        train,
        selectedWagonId,
        selectedSeats,
        reservedSeats,
        successMessage,
        selectTrain,
        selectWagon,
        toggleSeat,
        submitBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used inside BookingProvider')
  }
  return context
}
