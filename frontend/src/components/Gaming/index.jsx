import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import ReactContext from '../../context/ReactContext'
import {ThreeDots} from 'react-loader-spinner'
import GamingVideoCard from '../GamingVideoCard'

const apiStatus = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

const Gaming = () => {
  const [gamingVideos, setGamingVideos] = useState([])
  const [apiResponse, setApiResponse] = useState(apiStatus.inProgress)
  const {isDark} = useContext(ReactContext)

  const getGamingVideos = async () => {
    setApiResponse(apiStatus.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      const formatedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      console.log(formatedData)
      setApiResponse(apiStatus.success)
      setGamingVideos(formatedData)
    } else {
      setApiResponse(apiStatus.failure)
    }
  }

  useEffect(() => {
    getGamingVideos()
  }, [])

  const renderSuccessView = () => (
    <div className="gaming-success-view">
      <div className={`gaming-header ${isDark && 'gaming-header-dark'}`}>
        <div className="gaming-icon">
          <HiFire color="#ff0000" className="icon" />
        </div>
        <h1>Gaming</h1>
      </div>
      <ul
        className={`gaming-videos-container ${
          isDark && 'gaming-videos-container-dark'
        }`}
      >
        {gamingVideos.map(each => (
          <li key={each.id}>
            <GamingVideoCard item={each} />
          </li>
        ))}
      </ul>
    </div>
  )

  const renderFailureView = () => {
    return (
      <div
        className={`gaming-failure-view ${
          isDark ? 'gaming-failure-view-dark' : ''
        }`}
      >
        <img
          src={
            isDark
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          }
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>
          We are having some trouble to complete your request. <br /> Please try
          again.
        </p>
        <button className="retry-btn" onClick={getGamingVideos}>
          Retry
        </button>
      </div>
    )
  }

  const renderLoader = () => {
    return (
      <div data-testid="loader" className="loader-container">
        <ThreeDots
        height="50"
        width="50"
        color={isDark ? '#ffffff' : '#3b82f6'}
        />
      </div>
    )
  }

  const renderContent = () => {
    switch (apiResponse) {
      case apiStatus.success:
        return renderSuccessView()
      case apiStatus.failure:
        return renderFailureView()
      case apiStatus.inProgress:
        return renderLoader()
      default:
        return null
    }
  }

  return (
    <div className="gaming-container">
      <Header />
      <div className="container">
        <Sidebar activeId={'GAMING'} />
        {renderContent()}
      </div>
    </div>
  )
}

export default Gaming
