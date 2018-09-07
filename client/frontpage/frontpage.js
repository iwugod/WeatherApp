import * as React from "react";
import * as ReactDOM from "react-dom";
import App from '../../components/frontpage_comp/App'
import storeConfig from '../../redux/store'
import { Provider } from 'react-redux'

import SearchWeather from '../../components/weather/SearchWeather'
import WeatherResult from '../../components/weather/WeatherResult'

//Routing 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

let store = storeConfig;

ReactDOM.render(

  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={SearchWeather} />
          <Route path={`/:query/:longitude/:latitude/:unit`} component={WeatherResult} />
          <Route path={`/:query/:locale/:unit`} component={WeatherResult} />
        </Switch>
      </App>
    </Router>
  </Provider>, document.getElementById('app')


)
