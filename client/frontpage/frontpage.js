import * as React from "react";
import * as ReactDOM from "react-dom";
import App from '../../components/frontpage_comp/App'
import storeConfig from '../../redux/store'
import { Provider } from 'react-redux'
import frontpageStyles from '../../components/frontpage_comp/frontpage.scss'


//Routing 
import { BrowserRouter } from 'react-router-dom'

let store = storeConfig;

ReactDOM.render(
  
  <Provider store={store}>
  	<BrowserRouter history={history}>
      <div>
        <App />
      </div>
    </BrowserRouter>
    
  </Provider>, document.getElementById('app')

  )
