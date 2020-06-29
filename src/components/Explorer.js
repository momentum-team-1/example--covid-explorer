import React, { useState, useEffect } from 'react'
import { Switch, Route, useParams } from 'react-router-dom'
import CountrySelector from './CountrySelector'
import CountryData from './CountryData'
import axios from 'axios'

function Explorer () {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://api.covid19api.com/countries')
      .then(response => {
        setCountries(response.data)
      })
  }, []) // the empty array means "only run if anything in the array changes -- that is, only once"

  return (
    <div className='Explorer'>
      <h1>COVID Explorer</h1>
      <Switch>
        <Route path='/country/:countryCode'>
          <CountryData countries={countries} />
        </Route>
        <Route path='/'>
          <CountrySelector countries={countries} />
        </Route>
      </Switch>
    </div>
  )
}

export default Explorer
