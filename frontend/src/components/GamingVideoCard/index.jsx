import './index.css'
import {useContext} from 'react'
import ReactContext from '../../context/ReactContext'
import {Link} from 'react-router-dom'

const GamingVideoCard = props => {
  const {item} = props
  const {id, thumbnailUrl, viewCount, title} = item
  const {isDark} = useContext(ReactContext)
  return (
    <Link
      to={`/videos/${id}`}
      className={`gaming-video-card ${isDark && 'gaming-video-card-dark'}`}
    >
      <img src={thumbnailUrl} alt="gaming" />
      <p className="title">{title}</p>
      <p>{viewCount} Watching Worldwide</p>
    </Link>
  )
}

export default GamingVideoCard
