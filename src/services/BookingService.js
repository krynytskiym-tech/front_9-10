const STORAGE_KEY = 'ukrzaliznytsia-bookings'

const loadBookings = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : {}
}

const saveBookings = (bookings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

export const getReservedBookings = (trainId, wagonId) => {
  const bookings = loadBookings()
  return bookings[trainId]?.[wagonId] ?? []
}

export const getReservedSeats = (trainId, wagonId) => {
  const wagonBookings = getReservedBookings(trainId, wagonId)
  return wagonBookings.flatMap((item) => item.seats)
}

export const addBooking = ({ trainId, wagonId, seats, passenger }) => {
  const bookings = loadBookings()
  if (!bookings[trainId]) {
    bookings[trainId] = {}
  }
  if (!bookings[trainId][wagonId]) {
    bookings[trainId][wagonId] = []
  }
  bookings[trainId][wagonId].push({ seats, passenger, createdAt: new Date().toISOString() })
  saveBookings(bookings)
  return bookings
}
