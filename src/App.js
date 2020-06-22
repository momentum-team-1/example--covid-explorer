import React from 'react'
import axios from 'axios'
import './App.css'
import CountryData from './components/CountryData'

class App extends React.Component {
  constructor () {
    super()
    console.log('constructor')
    this.state = {
      countries: [],
      currentCountry: null
    }
  }

  componentDidMount () {
    console.log('componentDidMount')
    axios
      .get('https://api.covid19api.com/countries')
      .then(response => {
        this.setState({
          countries: response.data
        })
      })
  }

  componentWillUnmount () {
    console.log('componentDidUnmount')
  }

  setCountry (country) {
    this.setState({ currentCountry: country })
  }

  render () {
    console.log('render')

    const { countries, currentCountry } = this.state
    return (
      <div className='App'>
        {
          currentCountry
            ? <CountryData country={currentCountry} handleClearCountry={() => this.setCountry(null)} />
            : (
              <div>
                <h1>List of countries</h1>
                <ul>
                  {countries.map(country => (
                    <li key={country.ISO2}>
                      <a href='#' onClick={() => this.setCountry(country)}>{country.Country}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )
        }

      </div>
    )
  }
}

export default App
