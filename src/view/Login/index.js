import React, { useState } from 'react'
import './login.css'
import {
  login,
  addUserToFirebase,
  signUp,
  normalSignIn,
} from '../../config/firebase'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUser, removeUser } from '../../Store/actions/authAction'

import Swal from 'sweetalert2'

const Login = (props) => {
  const [signInDetails, setSignInDetails] = useState('')
  const [signUpDetails, setSignUpDetails] = useState('')
  const [showSignUp, setShowSignUp] = useState(false)
  const history = useHistory()

  let loginBtn = async () => {
    try {
      const hello = await login()
      const uid = hello.user.uid
      const userDetails = {
        email: hello.additionalUserInfo.profile.email,
        name: hello.additionalUserInfo.profile.name,
        userId: uid,
      }
      const setUserDB = await addUserToFirebase(
        uid,
        userDetails.email,
        userDetails.name
      )
      props.updateUser(userDetails)
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        text: error.message,
      })
    }
  }
  const handleToggle = () => {
    showSignUp ? setShowSignUp(false) : setShowSignUp(true)
  }
  const getSignInInfo = (e) => {
    const { name, value } = e.target
    setSignInDetails((preValue) => {
      return {
        ...preValue,
        [name]: value,
      }
    })
  }
  const getSignUpInfo = (e) => {
    const { name, value } = e.target
    setSignUpDetails((preValue) => {
      return {
        ...preValue,
        [name]: value,
      }
    })
  }
  const signUpFun = async () => {
    try {
      const hello = await signUp(signUpDetails)
      const uid = hello.user.uid
      hello.user.updateProfile({
        displayName: signUpDetails.signUpUsername,
      })
      const userDetails = {
        email: signUpDetails.signUpEmail,
        name: signUpDetails.signUpUsername,
        userId: uid,
      }
      addUserToFirebase(uid, userDetails.email, userDetails.name)
      props.updateUser(userDetails)
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        text: error.message,
      })
    }
  }
  const signInFun = async () => {
    try {
      const hello = await normalSignIn(signInDetails)
      const uid = hello.user.uid
      const userDetails = {
        email: hello.user.email,
        name: hello.user.displayName,
        userId: uid,
      }

      props.updateUser(userDetails)
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        text: error.message,
      })
    }
  }
  return (
    <div className="loginWrapper">
      <div className="overlay">
        <div className="login p-2">
          {showSignUp ? (
            <div className="w-100 px-2">
              <h2 className="">Sign Up Here</h2>
              <input
                className="authInput"
                type="text"
                name="signUpUsername"
                onChange={(e) => {
                  getSignUpInfo(e)
                }}
                placeholder="UserName"
              />
              <input
                className="authInput"
                type="email"
                name="signUpEmail"
                placeholder="Email"
                onChange={(e) => {
                  getSignUpInfo(e)
                }}
              />
              <input
                className="authInput"
                type="password"
                placeholder="Password"
                name="signUpPassword"
                onChange={(e) => {
                  getSignUpInfo(e)
                }}
              />
              <p>
                <button className="authBtnSignUp" onClick={signUpFun}>
                  Sign Up
                </button>
              </p>

              <p className="toggleLink" onClick={handleToggle}>
                {' '}
                Already Have an Account ?
              </p>
            </div>
          ) : (
            <div className="w-100 p-2">
              <h2 className="">Login Here</h2>
              <input
                className="authInput"
                type="email"
                name="SignInemail"
                placeholder="Email"
                onChange={(e) => getSignInInfo(e)}
              />
              <input
                className="authInput"
                type="password"
                name="SignInpassword"
                placeholder="PassWord"
                onChange={(e) => getSignInInfo(e)}
              />
              <button className="authBtnLogin" onClick={signInFun}>
                Login In
              </button>
              <hr />
              <p className="text-muted text-left">Sign In With Facebook</p>
              <p>
                <button className="fb" onClick={loginBtn}>
                  Login With Facebook
                </button>
              </p>
              <p>
                <p className="toggleLink" onClick={handleToggle}>
                  Create An Account
                </p>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(addUser(user)),
    loggedOutUser: () => dispatch(removeUser()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)

{
  /* <p className="heading">Queue App</p>
<button className="fb connect" onClick={loginBtn}>
  Facebook Login //{" "}
</button> */
}
