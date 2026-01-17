import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import ReactContext from '../../context/ReactContext'
import TrendingVideoCard from '../TrendingVideoCard'

const SavedVideos = () => {
  const [savedVideosList, setSavedVideosList] = useState([])
  const {isDark, savedVideos} = useContext(ReactContext)

  const getSavedVideosList = async id => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok) {
      const data = await response.json()
      const each = data.video_details
      const formatedData = {
        id: each.id,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
          subscriberCount: each.channel.subscriber_count,
        },
        description: each.description,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        videoUrl: each.video_url,
        viewCount: each.view_count,
      }
      return formatedData
    }
  }

  useEffect(() => {
    const fetchSavedVideos = async () => {
      const list = await Promise.all(
        savedVideos.map(each => getSavedVideosList(each.id)),
      )
      setSavedVideosList(list)
      console.log(list)
    }

    fetchSavedVideos()
  }, [])

  const renderSuccessView = () => (
    <div className="saved-video-success-view">
      <div
        className={`saved-video-header ${isDark && 'saved-video-header-dark'}`}
      >
        <div className="saved-video-icon">
          <HiFire color="#ff0000" className="icon" />
        </div>
        <h1>Saved Videos</h1>
      </div>
      <ul
        className={`saved-videos-container ${
          isDark && 'saved-videos-container-dark'
        }`}
      >
        {savedVideosList.map(each => (
          <li key={each.id}>
            <TrendingVideoCard item={each} />
          </li>
        ))}
      </ul>
    </div>
  )

  const renderFailureView = () => (
    <div
      className={`no-saved-video-view ${
        isDark ? 'no-saved-video-view-dark' : ''
      }`}
    >
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  const renderContent = () => {
    if (savedVideos.length > 0) {
      return renderSuccessView()
    } else {
      return renderFailureView()
    }
  }

  return (
    <div className="saved-video-container">
      <Header />
      <div className="container">
        <Sidebar activeId={'SAVED'} />
        {renderContent()}
      </div>
    </div>
  )
}

export default SavedVideos
