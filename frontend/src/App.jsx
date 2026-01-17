import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ReactContext from './context/ReactContext'
import ProtectedRoute from './components/ProtectedRoute'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import VideoDetails from './components/VideoDetails'
import {useState,useEffect} from 'react'
import './App.css'
const App = () => {
  const [isDark, setIsDark] = useState(false)
  const [savedVideos, setSavedVideos] = useState([])

  useEffect(() => {
      const match = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(match)
    }, [])
  const onSaveVideo = id => {
    setSavedVideos(prev => [...prev, {id}])
  }

  const onRemoveSaveVideo = id => {
    setSavedVideos(prev => prev.filter(each => each.id !== id))
  }

  return (
    <ReactContext.Provider
      value={{isDark, setIsDark, savedVideos, onSaveVideo, onRemoveSaveVideo}}
    >
      
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/videos/:id"
            element={
              <ProtectedRoute>
                <VideoDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gaming"
            element={
              <ProtectedRoute>
                <Gaming />
              </ProtectedRoute>
            }
          />

          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <Trending />
              </ProtectedRoute>
            }
          />

          <Route
            path="/saved-videos"
            element={
              <ProtectedRoute>
                <SavedVideos />
              </ProtectedRoute>
            }
          />

          <Route path="/not-found" element={<NotFound />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      
    </ReactContext.Provider>
  )
}

export default App
