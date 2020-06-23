import React from 'react'
import axios from 'axios'
import moment from 'moment'

class CountryData extends React.Component {
  constructor () {
    super()
    this.state = {
      cases: []
    }
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

  render () {
    const { country, handleClearCountry } = this.props
    const { cases } = this.state

    return (
      <div className='CountryData'>
        <h1>{country.Country}</h1>
        <p><a href='#' onClick={handleClearCountry}>Go back to all countries</a></p>
        <ul>
          {cases.map(caseDate => (
            <li key={caseDate.Date}>
              {moment(caseDate.Date).format('MMMM Do YYYY')}: {caseDate.Cases}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CountryData
