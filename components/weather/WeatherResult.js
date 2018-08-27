import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../../redux/photo/actions'

import searchWeatherStyles from '../weather/searchWeatherStyles.scss'
import Route  from 'react-router-dom/Route'



class WeatherResult extends Component {
    
    constructor(props) {
    super(props)
    
    }
    componentDidMount () {
    }
    
    
  render() {
    // const stateParam = this.props.location.state;
    const stateRef = this.props.location.props.param;
    
    return (
      <div className="time-grid">

      <div className="result-page">
      <span className="icon-back"></span>
       <div className="head-pane">
         <div className="region">
            {  stateRef.region + stateRef.country  }
         </div>
         <div className="change-view">

         </div>
       </div>

       <div className="date-tab">
       {  stateRef.dateTime  }
       </div>

       <div className="weather-desc">
          {
            stateRef.weatherDescription
          }
       </div>

       <div className="temprature">
          {
            stateRef.temperature
          }
       </div>
       <div className="sun-rise">
          {
            stateRef.sunRise
          }
       </div>
        
       </div>
        
      </div>
  )
  }
}


function mapStateToProps(state) { 
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherResult)
