import React from 'react'

class CountrySelector extends React.Component {
  render () {
    const { currentCountryCode, countries, onSelect } = this.props

    return (
      <div class='CountrySelector'>
        <select
          value={currentCountryCode} onChange={onSelect}
        >
          <option value=''>-- No country selected --</option>
          {countries.map(country => (
            <option value={country.ISO2} key={country.ISO2}>{country.Country}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default CountrySelector
