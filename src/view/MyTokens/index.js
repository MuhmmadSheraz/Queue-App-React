import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {
  firebase,
  user,
  updateCancelledTokens,
  unsubscribeBuyers,
} from '../../config/firebase'
import useWebAnimations, { shakeY } from '@wellyshen/use-web-animations'
import { connect } from 'react-redux'
import './myTokens.css'

const MyTokens = (props) => {
  const [myTokens, setMyTokens] = useState([])
  let userId

  const { ref: heading } = useWebAnimations({
    ...shakeY,
    timing: {
      delay: 500,
      duration: 1000 * 20,
      iterations: Infinity,
    },
  })
  const getMyToken = () => {
    firebase
      .firestore()
      .collection('buyers')
      .where('buyerId', '==', props.userInfo.userId)
      .onSnapshot((data) => {
        let arr = []
        data.forEach((x) => {
          let temp = x.data()
          temp.id = x.id
          arr.push(temp)
        })
        setMyTokens(arr)
      })
  }
  useEffect(() => {
    getMyToken()
    return () => {
      unsubscribeBuyers()
    }
  }, [])
  const showNotification = () => {
    const message = new Notification('Your Turned', {
      icon: 'https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/7365665041556281661-512.png',
      body: 'Be Ready In 5  mins',
    })
    message.onclick = () => {
      message.close()
      window.parent.focus()
    }
  }

  const cancel = async (docId, compId, totalToken, myToken) => {
    firebase.firestore().collection('buyers').doc(docId).delete()
    await updateCancelledTokens(docId, compId, totalToken, myToken)
  }
  return (
    <div className="custom-shape-divider-top-1600808309">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
        ></path>
      </svg>
      <Container>
        <p className="text-center text-light display-3 heading" ref={heading}>
          Queue App
        </p>
        <h1 className="text-center text-light compheading">*** My Tokens***</h1>
      </Container>
      <div className="content">
        <Row>
          <Container>
            <Col md="12" key={11244}>
              <div className="columnToken">
                <div className="compName font-weight-bold">Company Name</div>
                <div className="compToken font-weight-bold">Token Number </div>
                <div className="text-danger font-weight-bold">Cancel Token</div>
              </div>
            </Col>
            {myTokens.length > 0 &&
              myTokens.map((x) => {
                const key = Math.random() * 100
                return (
                  <Col md="12" key={key}>
                    <div className="columnToken">
                      <div className="compName">
                        <img
                          className="compImageToken"
                          src={x.companyImage}
                          alt="compnayProfile"
                        />
                        {x.companyName}
                      </div>
                      <div className="compToken"> {x.tokenNumber}</div>
                      <div
                        className="btn btn-outline-danger"
                        onClick={() =>
                          cancel(
                            x.id,
                            x.companyId,
                            x.totalTokens,
                            x.tokenNumber
                          )
                        }
                      >
                        Cancel Token
                      </div>
                    </div>
                  </Col>
                )
              })}
          </Container>
        </Row>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.authReducer.user,
  }
}
export default connect(mapStateToProps, null)(MyTokens)
