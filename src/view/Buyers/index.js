import React, { useState, useEffect } from 'react'
import { seeBuyers } from '../../config/firebase'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import './buyer.css'

const Buyers = () => {
  const { compID } = useParams()
  const [buyers, setBuyers] = useState([])
  const showBuyers = async (compID) => {
    const array1 = []
    const dataBuyer = await seeBuyers(compID)
    dataBuyer.forEach((x) => array1.push(x.data()))
    setTimeout(() => {
      setBuyers(array1)
    }, 1000)
  }
  useEffect(() => {
    showBuyers(compID)
  }, [])
  return (
    <div className="buyersMainWrapper">
      <div className="buyersContent">
        <span className="pt-5">
          <h1 className="text-center text-dark py-5 heading">Queue App</h1>
          <h1 className="text-center compheading">*** My Buyers***</h1>
        </span>
        <Container>
          <div>
            {buyers.map((item, index) => {
              return (
                <div key={index} className="companyList">
                  <span>
                    <span className="nameBuyer"> {item.buyerName}</span>
                  </span>
                  <h3> {item.tokenNumber}</h3>
                </div>
              )
            })}
          </div>
        </Container>
      </div>
    </div>
  )
}
export default Buyers
