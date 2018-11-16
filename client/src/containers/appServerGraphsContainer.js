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
          type: '',
          data: []
        }
      ]
    }
    this.state = {
      errors: {},
      options: Object.assign({}, this.optionsTemplate),
      graphTitles: ['No graphs'],
      types: [
        'bar',
        'line'
      ]
    }
  }

  getGraphNames (analysis) {
    let names = []
    for (let graph in analysis) {
      names.push(analysis[graph].title)
    }
    return names
  }

  getGraphFromName (title, analysis) {
    for (let graph in analysis) {
      if (analysis[graph].title === title) {
        return graph
      }
    }
    return null
  }

  getGraph (currentOption, type) {
    Http.get('/app-server-logged-data')
      .then(response => {
        if (response.success) {
          let graphName = this.getGraphFromName(currentOption, response.analysis)
          if (JSON.stringify(response.analysis) === JSON.stringify({})) {
            return
          }
          if (graphName === null) {
            graphName = Object.keys(response.analysis)[0]
          }
          let newOptions = this.createChart(response.analysis[graphName], type)
          this.setState({
            graphTitles: this.getGraphNames(response.analysis),
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

  createChart (dataAnalysis, type) {
    const { xAxis, yAxis, title, yAxisTitle } = dataAnalysis
    let newOptions = Object.assign({}, this.optionsTemplate)
    newOptions.xAxis.categories = xAxis
    newOptions.title.text = title
    newOptions.series[0].data = yAxis
    newOptions.yAxis.title.text = yAxisTitle
    newOptions.series[0].type = type
    return newOptions
  }

  render () {
    const { errors, options, graphTitles, types } = this.state
    return (
      <AppServerGraphsForm
        types={types}
        errors={errors}
        options={options}
        graphTitles={graphTitles}
        onClick={(currentOption, type) => this.getGraph(currentOption, type)}
      />
    )
  }
}
