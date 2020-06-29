import React from 'react'
import { Link } from 'react-router-dom'

class CountrySelector extends React.Component {
  render () {
    const { countries } = this.props

    return (
      <div className='CountrySelector'>
        {countries.map(country => (
          <p key={country.ISO2}><Link to={`/country/${country.ISO2}`}>{country.Country}</Link></p>
        ))}
      </div>
    )
  }
}

export default CountrySelector
