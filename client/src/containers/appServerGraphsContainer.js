import React from 'react'
import AppServerGraphsForm from '../components/appServerGraphsForm'
import Http from '../service/Http'

export default class AppServerGraphsContainer extends React.Component {
  constructor (props) {
    super(props)
    this.optionsTemplate = {
      chart: {
        renderTo: 'container',
        defaultSeriesType: 'spline',
        marginRight: 130,
        marginBottom: 25
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      series: [
        {
          type: 'line',
          data: []
        }
      ]
    }
    this.state = {
      errors: {},
      options: Object.assign({}, this.optionsTemplate),
      graphTitles: ['No graphs']
    }
  }

  getGraph (currentOption) {
    Http.get('/app-server-logged-data')
      .then(response => {
        if (response.success) {
          // { success: true, analysis: analysis }
          let graphName = currentOption
          if (!(currentOption in response.analysis)) {
            graphName = Object.keys(response.analysis)[0]
          }
          let newOptions = this.createChart(response.analysis[graphName])
          this.setState({
            graphTitles: Object.keys(response.analysis),
            options: newOptions
          })
        } else {
          alert('SUCCESS WAS FALSE')
        }
      })
      .catch(err => {
        alert('ERROR RECEIVING LOGGED DATA: ' + err)
      })
  }

  createChart (dataAnalysis) {
    const { xAxis, yAxis, title, yAxisTitle } = dataAnalysis
    let newOptions = Object.assign({}, this.optionsTemplate)
    newOptions.xAxis.categories = xAxis
    newOptions.title.text = title
    newOptions.series[0].data = yAxis
    newOptions.yAxis.title.text = yAxisTitle
    return newOptions
  }

  render () {
    const { errors, options, graphTitles } = this.state
    return (
      <AppServerGraphsForm
        errors={errors}
        options={options}
        graphTitles={graphTitles}
        onClick={(currentOption) => this.getGraph(currentOption)}
      />
    )
  }
}
