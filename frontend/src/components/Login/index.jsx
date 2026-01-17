import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [error, setError] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(match)
  }, [])

  const onToggleShow = () => {
    setShow(prevStat => !prevStat)
  }

  const onChangeUsername = e => {
    setUsername(e.target.value)
  }

  const onChangePassword = e => {
    setPassword(e.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/', {replace: true})
  }

  const onSubmitForm = async e => {
    e.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      setErrorMsg(data.error_msg)
      setError(true)
    }
  }

  const renderSuccessView = () => (
    <div className="login-container">
      <form className="form-container" onSubmit={onSubmitForm}>
        <img
          src={
            isDark
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt=""
        />
        <div className="input-container">
          <div className="input">
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              value={username}
              onChange={onChangeUsername}
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="input">
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              value={password}
              onChange={onChangePassword}
              id="password"
              type={show ? 'text' : 'password'}
              placeholder="Password"
            />
          </div>
          <div className="checkbox-con">
            <input id="checkbox" type="checkbox" onChange={onToggleShow} />
            <label htmlFor="checkbox">Show Password</label>
          </div>
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        {error && <p className="error-msg">*{errorMsg}</p>}
      </form>
    </div>
  )

  return <>{renderSuccessView()}</>
}

export default Login
