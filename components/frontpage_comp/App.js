import React, { Component } from 'react'

//Routing 
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from '../../components/common/header/Header'
import SearchWeather from '../weather/SearchWeather'
import WeatherResult from '../weather/WeatherResult'

class App extends Component {

	constructor(props) {
		super(props)
	}
  render() {

    return (
     
      <div className="wrapper">
        <div className="top-section">
          <h1 className="header">Weather Monkey</h1>
          <div className="front-page">
            <Header />
          </div>
        </div>
        <div className="contents-wrap">
        <Switch>
          <Route exact path="/" component={SearchWeather} />
          { <Route  path="/weather/:id" component={WeatherResult}  /> }
          {/* <Route to={`/weather/:id`} render={(props) => ( <WeatherResult props={this.state}/>)}/> */}
        </Switch>
        </div>
        
      </div>

     
    )
  }
}

export default App;