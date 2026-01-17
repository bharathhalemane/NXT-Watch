import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {IoSearch} from 'react-icons/io5'
import {useContext} from 'react'
import ReactContext from '../../context/ReactContext'
import {ThreeDots} from 'react-loader-spinner'

const responseApiStatus = {
  noData: 'NODATA',
  success: 'SUCCESS',
  failed: 'FAILED',
  inProgress: 'INPROGRESS',
}

const Home = () => {
  const [premium, setPremium] = useState(true)
  const [videosList, setVideosList] = useState([])
  const [apisResponseStatus, setApiResponseStatus] = useState(
    responseApiStatus.inProgress,
  )
  const [searchInput, setSearchInput] = useState('')
  const {isDark} = useContext(ReactContext)
  const getVideosData = async () => {
    setApiResponseStatus(responseApiStatus.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const formatedData = data.videos.map(each => ({
        id: each.id,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      if (formatedData.length > 0) {
        setVideosList(formatedData)
        setApiResponseStatus(responseApiStatus.success)
      } else {
        setApiResponseStatus(responseApiStatus.noData)
      }
    } else {
      setApiResponseStatus(responseApiStatus.failed)
    }
  }
  useEffect(() => {
    getVideosData()
  }, [])

  const onSubmitSearchInput = e => {
    e.preventDefault()
    getVideosData()
  }

  const onChangeSearchInput = e => {
    setSearchInput(e.target.value)
  }

  const renderInputField = () => (
    <form
      className={`search-input-container ${
        isDark && 'search-input-container-dark'
      }`}
      onSubmit={onSubmitSearchInput}
    >
      <input
        onChange={onChangeSearchInput}
        value={searchInput}
        type="search"
        placeholder="Search"
      />
      <button type="submit" className="search-btn" data-testid="searchButton">
        <IoSearch color="#909090" />
      </button>
    </form>
  )

  const onChangeSetPremium = () => {
    setPremium(false)
  }

  const renderPremium = () => (
    <div
      className={premium === true ? 'premium-container' : 'd-none'}
      data-testid="banner"
    >
      <div className="premium-header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <button
          onClick={onChangeSetPremium}
          className="remove-btn"
          data-testid="close"
        >
          x
        </button>
      </div>
      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
      <button className="get-btn">GET IT NOW</button>
    </div>
  )

  const renderLoaderView = () => {
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

  const renderHomePage = () => (
    <div
      className={`home-success-container ${
        isDark && 'home-success-container-dark'
      }`}
    >
      {renderPremium()}
      <>{renderInputField()}</>
      <>{renderContent()}</>
    </div>
  )

  const renderSuccessView = () => (
    <ul className="videos-container">
      {videosList.map(each => (
        <li key={each.id}>
          <VideoCard videoDetails={each} />
        </li>
      ))}
    </ul>
  )

  const renderFailureView = () => (
    <div className={`failure-view ${isDark && 'failure-view-dark'}`}>
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
      <button className="retry-btn" onClick={() => getVideosData()}>
        Retry
      </button>
    </div>
  )

  const renderNodataView = () => (
    <div className={`nodata-view ${isDark && 'nodata-view-dark'}`}>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button className="retry-btn" onClick={() => getVideosData()}>
        Retry
      </button>
    </div>
  )

  const renderContent = () => {
    switch (apisResponseStatus) {
      case responseApiStatus.inProgress:
        return renderLoaderView()
      case responseApiStatus.success:
        return renderSuccessView()
      case responseApiStatus.failed:
        return renderFailureView()
      case responseApiStatus.noData:
        return renderNodataView()
      default:
        return null
    }
  }

  return (
    <div className="" data-testid="home">
      <Header />
      <div className="container">
        <Sidebar className="sidebar" activeId="HOME" />
        {renderHomePage()}
      </div>
    </div>
  )
}

export default Home
