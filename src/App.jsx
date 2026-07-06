import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/homePage'
import  SermonsPage from './pages/SerrmonPage/SermonsPage'
import EventsPage from './pages/EventsPage/EventsPage'
import WatchLivePage from './pages/WatchLive/WatchLivePage'
import ConnectPage from './pages/ConnectPage/ConnectPage'

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sermons" element={<SermonsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/watch-live" element={<WatchLivePage />} />
        <Route path="/connect" element={<ConnectPage />} />
      </Routes>
  )
}

export default App
