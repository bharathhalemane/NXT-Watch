import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {useContext} from 'react'
import ReactContext from '../../context/ReactContext'
import {Link} from 'react-router-dom'

const VideoCard = props => {
  const {isDark} = useContext(ReactContext)

  const {videoDetails} = props
  const {id, thumbnailUrl, channel, viewCount, publishedAt, title} =
    videoDetails
  const {name, profileImageUrl} = channel
  const raw = formatDistanceToNow(new Date(publishedAt), {addSuffix: true})
  const result = raw.match(/\d+\s+year[s]?\s+ago/)[0]
  return (
    <Link
      to={`/videos/${id}`}
      className={`video-container ${isDark && 'video-container-dark'}`}
    >
      <img src={thumbnailUrl} alt="video thumbnail" />
      <div className="channel-information">
        <img
          src={profileImageUrl}
          alt="channel logo"
          className="channel-profile"
        />
        <div className="video-details">
          <p className="title">{title}</p>
          <p className="channel-name">{name}</p>
          <div className="video-info">
            <p className="view-count">{viewCount} views</p>
            <p className="">{result}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
