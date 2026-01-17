import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {useContext} from 'react'

import ReactContext from '../../context/ReactContext'

const NotFound = () => {
  const {isDark} = useContext(ReactContext)
  const renderFailureView = () => {
    return (
      <div className={`not-found ${isDark ? 'not-found-dark' : ''}`}>
        <img
          src={
            isDark
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
          }
          alt="not found"
        />
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found.</p>
      </div>
    )
  }

  return (
    <div className="not-found-container">
      <Header />
      <div className="container">
        <Sidebar />
        {renderFailureView()}
      </div>
    </div>
  )
}

export default NotFound
