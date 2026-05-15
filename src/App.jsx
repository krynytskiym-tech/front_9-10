import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import Home from './pages/Home'
import Booking from './pages/Booking'
import './App.css'

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <div className="app-shell">
          <header className="app-header">
            <div>
              <p className="brand">Укрзалізниця</p>
              <h1>Система продажу залізничних квитків</h1>
            </div>
            <nav className="app-nav">
              <Link to="/">Потяги</Link>
              <Link to="/">Бронювання</Link>
            </nav>
          </header>

          <main className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking/:trainId" element={<Booking />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <p>Лабораторні 9–10, React + Routing + State Management + LocalStorage.</p>
          </footer>
        </div>
      </BrowserRouter>
    </BookingProvider>
  )
}

export default App
