import React from 'react'
import axios from 'axios'
import './App.css'
import CountrySelector from './components/CountrySelector'
// import CountryDayWalkthrough from './components/CountryDayWalkthrough'
import CountryData from './components/CountryData'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      countries: []
    }
  }

  componentDidMount () {
    console.log('mounting component')
    axios
      .get('https://api.covid19api.com/countries')
      .then(response => {
        console.log('setting countries')
        this.setState({
          countries: response.data
        })
      })
  }

  getCountryData (countryCode) {
    return this.state.countries.find(
      country => country.ISO2 === countryCode
    )
  }

  handleCountryCodeChange (event) {
    this.setCountryCode(event.target.value)
  }

  render () {
    console.log('render app')
    const { countries } = this.state

    return (
      <Router>
        <div className='App'>
          <h1>COVID Explorer</h1>
          <Switch>
            <Route
              path='/country/:countryCode' render={
                ({ match }) => {
                  return <CountryData country={this.getCountryData(match.params.countryCode)} />
              }
              }
            />
            <Route path='/'>
              <CountrySelector countries={countries} />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
