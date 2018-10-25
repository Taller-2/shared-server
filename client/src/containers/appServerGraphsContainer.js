import React from 'react'
import AppServerGraphsForm from '../components/appServerGraphsForm'
// import Http from '../service/Http'

export default class AppServerGraphsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {},
      wasShown: false,
      options: {
        chart: {
          renderTo: 'container',
          defaultSeriesType: 'spline',
          marginRight: 130,
          marginBottom: 25
        },
        title: {
          text: 'Fruit Consumption'
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
          title: {
            text: 'Fruit eaten'
          }
        },
        series: [{
          name: 'Jane',
          data: [1, 0, 4]
        }]
      }
    }
  }

  createChart (currentOption) {
    // if (this.state.wasShown || currentOption === '') return
    var aTittle = 'none'
    if (currentOption === 'graph1') {
      aTittle = 'Fruit Consumption'
    } else {
      aTittle = 'Pedro'
    }
    const newOptions = {
      chart: {
        renderTo: 'container',
        defaultSeriesType: 'spline',
        marginRight: 130,
        marginBottom: 25
      },
      title: {
        text: aTittle
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Jane',
        data: [1, 0, 4]
      }]
    }
    this.setState({
      wasShown: true,
      options: newOptions
    })
  }

  render () {
    const { errors, options } = this.state
    return (
      <AppServerGraphsForm
        errors={errors}
        options={options}
        onClick={(currentOption) => this.createChart(currentOption)}
      />
    )
  }
}
