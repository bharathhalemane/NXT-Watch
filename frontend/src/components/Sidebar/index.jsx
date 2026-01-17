import './index.css'
import ReactContext from '../../context/ReactContext.js'
import {useContext} from 'react'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {FaGamepad} from 'react-icons/fa'
import {RiMenuAddLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'

const SideBar = props => {
  const {activeId} = props
  const {isDark} = useContext(ReactContext)
  const categoriesList = [
    {
      id: 'HOME',
      icon: (
        <AiFillHome
          color={activeId === 'HOME' ? '#ff0000' : isDark && '#cccccc'}
        />
      ),
      name: 'Home',
      redirectUrl: '/',
    },
    {
      id: 'TRENDING',
      icon: (
        <HiFire
          color={activeId === 'TRENDING' ? '#ff0000' : isDark && '#cccccc'}
        />
      ),
      name: 'Trending',
      redirectUrl: '/trending',
    },
    {
      id: 'GAMING',
      icon: (
        <FaGamepad
          color={activeId === 'GAMING' ? '#ff0000' : isDark && '#cccccc'}
        />
      ),
      name: 'Gaming',
      redirectUrl: '/gaming',
    },
    {
      id: 'SAVED',
      icon: (
        <RiMenuAddLine
          color={activeId === 'SAVED' ? '#ff0000' : isDark && '#cccccc'}
        />
      ),
      name: 'Saved videos',
      redirectUrl: '/saved-videos',
    },
  ]
  return (
    <div className={`sidebar-container ${isDark && 'sidebar-dark'} `}>
      <ul className="categories-container">
        {categoriesList.map(each => (
          <li
            key={each.id}
            className={activeId === each.id ? 'active-category' : ''}
          >
            <Link to={each.redirectUrl} className="categories-link">
              {each.icon}
              <h1>{each.name}</h1>
            </Link>
          </li>
        ))}
      </ul>

      <div className="contact-us-container">
        <p>CONTACT US</p>
        <div className="image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="socialmedia-logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="socialmedia-logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="socialmedia-logo"
          />
        </div>
        <p>Enjoy! Now to see your channels and recommendations!</p>
      </div>
    </div>
  )
}

export default SideBar
