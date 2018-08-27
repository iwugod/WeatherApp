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
            id:0,
            latitude: 0,
            longitude: 0,
            region:'',
            country:'',
            temperature:0,
            dateTime:0,
            weatherDescription:'',
            weatherCondition:'',
            weatherIcon:'',
            sunRise:0,
            redirect:false
        }

        this.setWeather = this.setWeather.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.setWeather);
        this.setDateTime();
    }

    
    setWeather(position) {

        if (position != null) {

            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                url : this.genarateUrl(position.coords.latitude, position.coords.longitude)
            });

            
            //using fetch to get all the data
            fetch(this.state.url)// fetch data from url
            .then(result => {
                return result.json()
            }).then(response =>{
                this.setState({
                    id:response.id,
                    latitude: response.coord.lat,
                    longitude: response.coord.lon,
                    region:response.name,
                    country:response.sys.country,
                    temperature:response.main.temp,
                    weatherDescription:response.weather["0"].description,
                    weatherCondition:response.weather["0"].main,
                    weatherIcon:response.weather["0"].icon,
                    sunRise:response.sys.sunrise,
                });
            })
            
        }
    }
    setDateTime() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date  = new Date().toLocaleString("en-US", options)
        this.setState({
            dateTime:date
        });
    }

    handleSearch(event){
        if(event.t){

        }
        this.genarateUrlCountry();
    }

    genarateUrlCountry(country) {
        return "http://api.openweathermap.org/data/2.5/forecast?q=" + country + "&appid=a19d5bef8a72d35cd43918774f1c6833"
    }

    genarateUrl(lat, lng) {
        return "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=a19d5bef8a72d35cd43918774f1c6833"
    }

    handleChange(event) {
        let change = {}
        change[event.target.name] = event.target.value
        this.setState(change)
    }

    handleSubmit(event) {
        navigator.geolocation.getCurrentPosition(this.setWeather);
        //event.preventDefualt();
    }

    render() {
        
        return (
           
            <div className="search-box">

                <div className="search-page">
                    <form className="search-form" actions={this.props.actions}>
                        <label className="search-location">
                            <input type="text" placeholder="City" />
                        </label>
                        <input type="submit" value="Submit" onClick={this.handleSearch}/>
                    </form>
                    <div className="more-option">
                        <span className="alt-option">
                            or
                        </span>
                        <Link to={{pathname:`/weather/${this.state.id}`, props:{param:this.state}}}>
                        <div className="btn-locate">
                            <input type="button" value="use my current position" className="user-location" onClick={this.handleSubmit} onChange={this.handleChange.bind(this)}/>
                        </div>
                        
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
