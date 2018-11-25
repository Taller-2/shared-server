import React from 'react'
import ShipmentCostForm from '../components/shipmentCostForm'
import { Redirect } from 'react-router-dom'
import Http from '../service/Http'
import httpStatus from 'http-status-codes'
import { ToastContainer, toast } from 'react-toastify'

export default class RulesContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {},
      cost: 'nothing'
    }
  }

  buildFacts (factsList) {
    let facts = {}
    factsList.forEach(aFact => {
      facts = Object.assign(facts, aFact)
    })
    return facts
  }

  handleClick (factsList) {
    const facts = this.buildFacts(factsList)
    Http.post('shipment-cost/', facts)
      .then(response => {
        if (response.status === httpStatus.OK) {
          this.setState({
            errors: {},
            cost: JSON.stringify(response.content.cost)
          })
        } else {
          if (response.status === httpStatus.UNPROCESSABLE_ENTITY) {
            this.setState({
              errors: { value: response.content.errors }
            })
          }
        }
      })
      .catch(err => {
        toast(err)
      })
  }

  render () {
    const { redirectToRules, errors, cost } = this.state
    if (redirectToRules) {
      return <Redirect to='/rulesList' />
    }
    return (
      <div>
        <ToastContainer></ToastContainer>
        <ShipmentCostForm
          errors={errors}
          cost={cost}
          onClick={(factsList) => this.handleClick(factsList)}
        />
      </div>
    )
  }
}
