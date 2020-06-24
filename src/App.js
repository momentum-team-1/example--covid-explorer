import React from 'react'
import axios from 'axios'
import './App.css'
import CountrySelector from './components/CountrySelector'
import CountryDayWalkthrough from './components/CountryDayWalkthrough'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      countries: [],
      currentCountryCode: ''
    }
  }

  componentDidMount () {
    axios
      .get('https://api.covid19api.com/countries')
      .then(response => {
        this.setState({
          countries: response.data
        })
      })
  }

  setCountryCode (countryCode) {
    this.setState({ currentCountryCode: countryCode })
  }

  getCurrentCountryData () {
    const countryCode = this.state.currentCountryCode
    if (countryCode !== '') {
      return this.state.countries.find(
        country => country.ISO2 === countryCode
      )
    }
  }

  handleCountryCodeChange (event) {
    this.setCountryCode(event.target.value)
  }

  render () {
    const { countries, currentCountryCode } = this.state
    const currentCountry = this.getCurrentCountryData()

    return (
      <div className='App'>
        <CountrySelector
          countries={countries} currentCountryCode={currentCountryCode}
          onSelect={event => this.setCountryCode(event.target.value)}
        />
        {
          currentCountry &&
            <CountryDayWalkthrough country={currentCountry} handleClearCountry={() => this.setCountryCode('')} />
        }
      </div>
    )
  }
}

export default App
