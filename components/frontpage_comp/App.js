import React, { Component } from 'react'

//Routing 
import { Route, Switch, Redirect, Router } from 'react-router-dom'


import weatherFonts from '../../components/fonts/weathericons-regular-webfont'
import fonts from '../../components/fonts/Roboto-regular'

import frontpageStyles from '../../components/frontpage_comp/frontpage.scss'

import Header from '../../components/common/header/Header'
import SearchWeather from '../weather/SearchWeather'
import WeatherResult from '../weather/WeatherResult'


class App extends Component {
  
  render() {

    return (
     
      <div className="wrapper">
        <div className="top-section">
          <h1 className="header">Weather App</h1>
          <div className="front-page">
            <Header />
          </div>
        </div>
        <div className="contents-wrap">
        
         { this.props.children }

        </div>
        
      </div>
    )
  }
}

export default App;