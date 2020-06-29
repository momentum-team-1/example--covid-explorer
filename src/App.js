import React from 'react'
import axios from 'axios'
import './App.css'
import Explorer from './components/Explorer'

import {
  BrowserRouter as Router
} from 'react-router-dom'

function App () {
  return (
    <Router>
      <div className='App'>
        <Explorer />
      </div>
    </Router>
  )
}

export default App
