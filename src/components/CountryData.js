import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

class CountryData extends React.Component {
  constructor () {
    super()
    this.state = {
      retrievedCases: false,
      cases: []
    }
  }

  componentDidMount () {
    this.getCovidStats()
  }

  componentDidUpdate () {
    this.getCovidStats()
  }

  getCovidStats () {
    const { country } = this.props
    const { retrievedCases } = this.state
    if (country && !retrievedCases) {
      axios.get(`https://api.covid19api.com/total/dayone/country/${country.Slug}/status/confirmed`)
        .then(response => {
          this.setState({ cases: response.data, retrievedCases: true })
        })
    }
  }

  render () {
    const { country } = this.props
    const { cases } = this.state

    if (country) {
      return (
        <div className='CountryData'>
          <h1>{country.Country}</h1>
          <Link to='/'>Back to all countries</Link>
          <p />
          <ul>
            {cases.map(caseDate => (
              <li key={caseDate.Date}>
                {moment(caseDate.Date).format('MMMM Do YYYY')}: {caseDate.Cases}
              </li>
            ))}
          </ul>
        </div>
      )
    } else {
      return <div />
    }
  }
}

export default CountryData
