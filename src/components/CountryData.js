import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

function CountryData ({ countries }) {
  const { countryCode } = useParams()
  const country = countries.find(
    country => country.ISO2 === countryCode
  )

  const [cases, setCases] = useState([])
  const [totalDays, setTotalDays] = useState(0)

  useEffect(() => {
    if (country) {
      axios.get(`https://api.covid19api.com/total/dayone/country/${country.Slug}/status/confirmed`)
        .then(response => {
          setCases(response.data)
          setTotalDays(response.data.length)
        })
    }
  }, [countries, country])

  if (country) {
    return (
      <div className='CountryData'>
        <h1>{country.Country}</h1>
        <Link to='/'>Back to all countries</Link>
        <p>Days of data: {totalDays}</p>
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

// class CountryData extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       retrievedCases: false,
//       cases: []
//     }
//   }

//   componentDidMount () {
//     this.getCovidStats()
//   }

//   componentDidUpdate () {
//     this.getCovidStats()
//   }

//   getCovidStats () {
//     const { country } = this.props
//     const { retrievedCases } = this.state
//     if (country && !retrievedCases) {
//       axios.get(`https://api.covid19api.com/total/dayone/country/${country.Slug}/status/confirmed`)
//         .then(response => {
//           this.setState({ cases: response.data, retrievedCases: true })
//         })
//     }
//   }

//   render () {
//     const { country } = this.props
//     const { cases } = this.state

//     if (country) {
//       return (
//         <div className='CountryData'>
//           <h1>{country.Country}</h1>
//           <Link to='/'>Back to all countries</Link>
//           <p />
//           <ul>
//             {cases.map(caseDate => (
//               <li key={caseDate.Date}>
//                 {moment(caseDate.Date).format('MMMM Do YYYY')}: {caseDate.Cases}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )
//     } else {
//       return <div />
//     }
//   }
// }

export default CountryData
