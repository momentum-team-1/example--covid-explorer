import React from 'react'
import axios from 'axios'
import moment from 'moment'

class CountryDayWalkthrough extends React.Component {
  constructor () {
    super()
    this.state = {
      cases: [],
      currentDayIdx: 0
    }
  }

  render () {
    const { country, handleClearCountry } = this.props
    const { cases, currentDayIdx } = this.state
    const caseDay = cases[currentDayIdx]

    return (
      <div className='CountryDayWalkthrough'>
        <h1>{country.Country}</h1>
        <p><a href='#' onClick={handleClearCountry}>Go back to all countries</a></p>

        {caseDay && (
          <div>
            <h2>{moment(caseDay.Date).format('MMMM Do YYYY')} (Day {currentDayIdx + 1})</h2>
            <p>Confirmed cases: {caseDay.Cases}</p>

            {currentDayIdx > 0 && (
              <p><a href='#' onClick={e => this.handleDayChange(e, -1)}>Prev day</a></p>
            )}
            {currentDayIdx < cases.length && (
              <p><a href='#' onClick={e => this.handleDayChange(e, 1)}>Next day</a></p>
            )}
          </div>
        )}
      </div>
    )
  }

  componentDidMount () {
    this.getCovidStats()
  }

  componentDidUpdate (prevProps) {
    if (this.props.country.ISO2 !== prevProps.country.ISO2) {
      this.setState({ cases: [] })
      this.getCovidStats()
    }
  }

  getCovidStats () {
    axios.get(`https://api.covid19api.com/total/dayone/country/${this.props.country.Slug}/status/confirmed`)
      .then(response => {
        this.setState({ cases: response.data })
      })
  }

  handleDayChange (event, delta) {
    event.preventDefault()
    this.setState({ currentDayIdx: this.state.currentDayIdx + delta })
  }
}

export default CountryDayWalkthrough
