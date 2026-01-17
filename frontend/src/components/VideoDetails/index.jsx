import Sidebar from '../Sidebar'
import Header from '../Header'
import {ThreeDots} from 'react-loader-spinner'
import {useContext, useEffect, useState} from 'react'
import ReactContext from '../../context/ReactContext'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {BiLike, BiDislike} from 'react-icons/bi'
import {RiMenuAddLine} from 'react-icons/ri'
import {formatDistanceToNow} from 'date-fns'
import {useParams} from 'react-router-dom'
import './index.css'

const apiStatus = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

const VideoDetails = () => {
  const {isDark, onSaveVideo, onRemoveSaveVideo, savedVideos} =
    useContext(ReactContext)

  const {id} = useParams()

  const [videoDetails, setVideoDetails] = useState(null)
  const [apiResponse, setApiResponse] = useState(apiStatus.inProgress)
  const [like, setLike] = useState(false)
  const [disLike, setDisLike] = useState(false)
  const [save, setSave] = useState(savedVideos.some(each => each.id === id))

  const jwtToken = Cookies.get('jwt_token')

  const getVideosData = async () => {
    setApiResponse(apiStatus.inProgress)

    const response = await fetch(
      `https://apis.ccbp.in/videos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    )

    if (response.ok) {
      const data = await response.json()
      const each = data.video_details

      setVideoDetails({
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
      })

      setApiResponse(apiStatus.success)
    } else {
      setApiResponse(apiStatus.failure)
    }
  }

  useEffect(() => {
    getVideosData()
  }, [id])

  const renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <ThreeDots
        height="50"
        width="50"
        color={isDark ? '#ffffff' : '#3b82f6'}
      />
    </div>
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
      <button className="retry-btn" onClick={getVideosData}>
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => {
    if (!videoDetails) return null

    const {
      videoUrl,
      channel,
      title,
      publishedAt,
      description,
      viewCount,
    } = videoDetails

    const {name, profileImageUrl, subscriberCount} = channel

    const raw = formatDistanceToNow(new Date(publishedAt), {addSuffix: true})
    const result = raw.match(/\d+\s+year[s]?\s+ago/)?.[0] || raw

    return (
      <div
        className={`video-details-success-container ${
          isDark && 'video-details-success-container-dark'
        }`}
      >
        <ReactPlayer
          src={videoUrl}
          className="react-player"
          width="900px"
          height="500px"
        />
        <p className="title">{title}</p>

        <div className="video-info-and-options">
          <div className="video-info">
            <p className="view-count">{viewCount} views</p>
            <p>{result}</p>
          </div>

          <div className="options-container">
            <button
              className={`option ${like && 'active-option'}`}
              onClick={() => {
                setLike(!like)
                if (disLike) setDisLike(false)
              }}
            >
              <BiLike />
              <p>Like</p>
            </button>

            <button
              className={`option ${disLike && 'active-option'}`}
              onClick={() => {
                setDisLike(!disLike)
                if (like) setLike(false)
              }}
            >
              <BiDislike />
              <p>Dislike</p>
            </button>

            <button
              className={`option ${save && 'active-option'}`}
              onClick={() => {
                setSave(!save)
                !save ? onSaveVideo(id) : onRemoveSaveVideo(id)
              }}
            >
              <RiMenuAddLine />
              <p>{save ? 'Saved' : 'Save'}</p>
            </button>
          </div>
        </div>

        <hr />

        <div className="channel-profile-information">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="profile-image"
          />
          <div className="channel-details">
            <p className="channel-name">{name}</p>
            <p className="subscriber-count">
              {subscriberCount} subscribers
            </p>
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (apiResponse) {
      case apiStatus.inProgress:
        return renderLoaderView()
      case apiStatus.success:
        return renderSuccessView()
      case apiStatus.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div
          className={`video-details-container ${
            isDark && 'video-details-container-dark'
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default VideoDetails
