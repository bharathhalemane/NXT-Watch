import './index.css'
import {useContext} from 'react'
import ReactContext from '../../context/ReactContext'
import Cookies from 'js-cookie'
import {useNavigate, Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import Popup from 'reactjs-popup'

const Header = () => {
  const {isDark, setIsDark} = useContext(ReactContext)
  const navigate = useNavigate()

  const onClickSetIsDark = () => {
    setIsDark(prev => !prev)
  }

  const logout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <div className={isDark ? 'header-dark' : 'header-light'}>
      <ul>
        <li>
          <Link to="/">
            <img
              className="logo"
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
            />
          </Link>
        </li>

        <li>
          <ul className="header-options">
            <li>
              <button onClick={onClickSetIsDark} data-testid="theme">
                {isDark ? (
                  <FiSun size="25px" color="#ffffff" />
                ) : (
                  <FaMoon size="25px" />
                )}
              </button>
            </li>

            <li>
              <img
                className="profile"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
            </li>

            <li>
              <Popup
                modal
                trigger={
                  <button
                    type="button"
                    className={isDark ? 'logout-btn-dark' : 'logout-btn-light'}
                  >
                    Logout
                  </button>
                }
              >
                {close => (
                  <div
                    className={`popup-container ${
                      isDark ? 'popup-container-dark' : ''
                    }`}
                  >
                    <div className="popup-confirmation-container">
                      <p>Are you sure you want to logout?</p>
                      <div className="buttons-container">
                        <button
                          type="button"
                          className="popup-close-btn"
                          onClick={close}
                          data-testid="close"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="popup-logout-confirm-btn"
                          onClick={logout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Header
