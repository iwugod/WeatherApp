import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../../redux/photo/actions'

import searchWeatherStyles from '../weather/searchWeatherStyles.scss'
import Route from 'react-router-dom/Route'
import Moment from 'react-moment'

class PrintWeather extends Component {

	constructor(props) {
        super(props);

        this.state = {
            icon:''
        }
    }

    componentWillMount() {
        this.stripString();
    }

    stripString(){
        let spliceIcon = this.props.main;
    
            if(spliceIcon == "Clouds") {
                let icons = spliceIcon.slice(0, -1);
                this.setState({
                    icon:icons
                })
            }
            else {
                this.setState({
                    icon:this.props.main
                })
            }
          
    }


	render() {
       
	  return(
          <div className="weather-props">
		   <div className={this.props.key}>
                <p className="description">{this.props.description}</p>
                <div className="temp-icon">
                <p className="temp">{this.props.temp} {this.props.label}</p>
                {/* <i className={`wi-${this.props.main.toLowerCase()}`}></i> */}
                <i className={`wi-${this.state.icon.toLowerCase()}`}></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrintWeather)
