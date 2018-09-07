// import React, { Component } from 'react'

import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../../redux/actions'

import searchWeatherStyles from '../weather/searchWeatherStyles.scss'
//Routing 
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import WeatherResult from '../weather/WeatherResult'

class SearchWeather extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            searchCountry: '',
            searchType: '',
            invalid:'',
            unit:''
        }

        this.setWeather = this.setWeather.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.setWeather);
    }

    setWeather(position) {

        if (position != null) {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                searchType: 'geo',
                unit:'metric'
            });

        }
    }

    handleInputChange(event) {

        this.setState({
            searchCountry: event.target.value,
            invalid:false
        });

        event.preventDefault();
    }


    handleSearch(event) {
        if(this.state.searchCountry == ""){
            this.setState({
                invalid:"invalid input"
            })
            return false;
        }

        else if (this.state.searchType != null) {

            this.setState({
                searchType:'locale',
                unit:'metric'
            }, () => this.props.history.push(`/${this.state.searchType}/${this.state.searchCountry}/${this.state.unit}`));
       }

    }

    

    handleSubmit(event) {
        this.setWeather();
        //event.preventDefault();
    }

    render() {

        return (

            <div className="search-box">

                <div className="search-page">
                    <form className="search-form" actions={this.props.actions}   >
                        <label className="search-location">
                            <input type="text" placeholder="City" value={this.state.searchCountry || ''} onChange={this.handleInputChange} />
                        
                            <span className="go-btn" onClick={this.handleSearch}></span>
                        </label>
                        <span className="error-msg">{this.state.invalid}</span>
                    </form>

                     <div className="alt-option">
                            or
                      </div>

                    <div className="more-option">
                        <Link onClick={this.handleSubmit} to={{ pathname: `/${this.state.searchType}/${this.state.longitude}/${this.state.latitude}/${this.state.unit}` }} className="geo-btn">
                            use my current position
                        </Link>

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
//export default SearchWeather;
export default connect(mapStateToProps, mapDispatchToProps)(SearchWeather)
