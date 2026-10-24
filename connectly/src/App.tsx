import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import AudioCallPage from './pages/AudioCallPage'
import ConnectPage from './pages/ConnectPage'
import FriendsPage from './pages/FriendsPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MessagesPage from './pages/MessagesPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import SettingsPage from './pages/SettingsPage'
import SignupPage from './pages/SignupPage'
import VideoCallPage from './pages/VideoCallPage'
import './App.css'

/**
 * Route configuration of the studio.
 *
 * Every screen is rendered inside <AppLayout />, which keeps the NNN Studio
 * branding (background, brand island, floating navigation) on every page.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/audio/:roomId" element={<AudioCallPage />} />
          <Route path="/call/:roomId" element={<VideoCallPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/friends" element={<ProtectedRoute><FriendsPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
