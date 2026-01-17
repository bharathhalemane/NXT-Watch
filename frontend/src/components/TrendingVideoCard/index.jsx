import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {useContext} from 'react'
import ReactContext from '../../context/ReactContext'
import {Link} from 'react-router-dom'

const TrendingVideoCard = props => {
  const {item} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = item
  const {name, profileImageUrl} = channel
  const raw = formatDistanceToNow(new Date(publishedAt), {addSuffix: true})
  const result = raw.match(/\d+\s+year[s]?\s+ago/)[0]
  const {isDark} = useContext(ReactContext)
  return (
    <Link
      to={`/videos/${id}`}
      className={`trending-video-details ${
        isDark && 'trending-video-details-dark'
      }`}
    >
      <img src={thumbnailUrl} alt="video thumbnail" />
      <div className="trending-video-info">
        <p className="title">{title}</p>
        <p className="channel-name">{name}</p>
        <div className="video-info">
          <p className="count">{viewCount} views</p>
          <p className="date">{result}</p>
        </div>
      </div>
    </Link>
  )
}

export default TrendingVideoCard
