import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../../redux/photo/actions'
import moment from 'moment'

import searchWeatherStyles from '../weather/searchWeatherStyles.scss'
import Route from 'react-router-dom/Route'

import PrintWeather from '../weather/PrintWeather'


class WeatherResult extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dateTime: '',
			property:props.match.params,
			data:[],
			region: '',
			notfound:'',
			temp:'',
			description:'',
			main:'',
			icon:'',
			filtered:[],
			unit:props.match.params.unit,
			show:true,
			label:'C'
		}

		this.goToPrevious = this.goToPrevious.bind(this);
		this.convertToFahrenheit = this.convertToFahrenheit.bind(this);
		this.convertToCelscuis = this.convertToCelscuis.bind(this);
	}

	componentWillMount() {
		const property = this.state.property;

		this.sortQuery(property);

	   this.setDateTime();
	}

	setDateTime() {
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		let date = new Date().toLocaleString("en-US", options)
		this.setState({
			dateTime: date
		});
	}

	
	sortQuery(data) {

		if (data.query == "geo"){
			// api for lat and long
			this.setGeo(this.genarateUrl(data.latitude, data.longitude, this.state.unit));
		}

		if (data.query == "locale") {
			// api for country
			this.setLocale(this.genarateUrlCountry(data.locale, this.state.unit));
		}
	}

	genarateUrlCountry(country, unit) {
		if(unit === undefined){
			unit = this.state.unit;
		}
		return "http://api.openweathermap.org/data/2.5/forecast?q=" + country + "&units="+ unit + "&appid=a19d5bef8a72d35cd43918774f1c6833"
	}

	genarateUrl(lat, lng, unit) {
		if(unit === undefined){
			unit = this.state.unit;
		}
		return "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&units="+ unit + "&appid=a19d5bef8a72d35cd43918774f1c6833"
	}

	
	setGeo(request) {

		fetch(request)// fetch data from url
			.then(result => {
				return result.json()
			}).then(response => {
				
				this.setLocale(this.genarateUrlCountry(response.name));
			});
	}

	setLocale(request) {

		fetch(request)// fetch data from url
			.then(result => {
				return result.json()
			}).then(response => {

				if(response.cod == 200){
				this.setState({
					region: response.city.name
				});

				var sortJson = response.list.map((obj)=>{
					return Object.keys(obj).sort().map((key)=> {
						return obj[key];
					})
					
				})
				this.filterDate(sortJson);
		
				this.setState({
					data:this.state.filtered
				})
			}
			else if(response.cod == 404){
				this.setState({
					notfound:response.message
				})

			}	

		});
	}

	filterDate(date){

		let arrayLength =  date.length;
		
		let matchingTime;

		let arr = [];

		let filteredTime = new Array();
		
		date.forEach((date, index) => {
			
			if (index === 0) {
				//set initial datetime
				matchingTime = date[2];
				filteredTime = date.splice(0);
			}

			if(index !== 0) {
				var oldDate = new Date(matchingTime);
				var newDate = new Date(date[2]);

				if (oldDate.toDateString() == newDate.toDateString()) {
					// Same day - maybe different times

					matchingTime = date[2];

					filteredTime = date.splice(0);

					if (arrayLength === (index + 1)) {
						arr.push(filteredTime);
						this.setState({
							filtered:arr
						})
					}
				} 
				else {
					
					// Different day
					if (newDate.getTime() > oldDate.getTime()) {

						var searchDate = moment();//now or change to any date
						console.log(searchDate._locale._weekdaysShort)
					
						// check which is greater
						matchingTime = date[2];
						arr.push(filteredTime);
						this.setState({
							filtered:arr
						})
					}
				}
			}
			
			return this.state.filtered;
		});
	}
	
	goToPrevious(){
		this.props.history.push(`/`);
	}

	convertToFahrenheit(){

		const { show } = this.state;
		console.log(this.props.match.params)

			if(show === false){
				
				this.setState({
					unit: 'metric',
					show:true,
					label:'C'
				},()=>{
					if(this.state.property.query != "locale"){
						this.setGeo(this.genarateUrl(this.state.property.latitude, this.state.property.longitude, this.state.unit))
					}else{
						this.setLocale(this.genarateUrlCountry(this.state.property.locale, this.state.unit));
					}
					
				})
			}
			
	}

	convertToCelscuis(event){

		event.preventDefault();

		if(this.state.show){
			this.setState({
				unit: 'imperial',
				show:false,
				label:'F'
			}, ()=>{
				if(this.state.property.query != "locale"){
					this.setGeo(this.genarateUrl(this.state.property.latitude, this.state.property.longitude, this.state.unit))
				}
				else{
					this.setLocale(this.genarateUrlCountry(this.state.property.locale, this.state.unit));
				}
			})
		}
		
	}

	getFirstIndex(){

		if(this.state.data){

		let lastIndex = this.state.data[0];

		if(lastIndex){
			
		return (<div className="current-weather">
				<PrintWeather 
					label={this.state.label} 
					temp={lastIndex[3].temp} 
					description={lastIndex[6]["0"].description}
					main={lastIndex[6]["0"].main}
					icon={lastIndex[6]["0"].icon} 
					/>
			</div>)}
 	  		}
		}
   
	render() {

		var printCondition =  Object.entries(this.state.data).map(([k, value]) => {
				
			  if(value){
					return <div className="result-page" key={k}>
					
					<div className="data-set__eight">
						{ value.length === 8 && 
							<PrintWeather
							label={this.state.label} 
							temp={value[3].temp} 
							description={value[6]["0"].description}
							main={value[6]["0"].main}
							icon={value[6]["0"].icon}  />
						}
					</div>

					<div className="data-set__seven" >
						{ value.length === 7 &&
							<PrintWeather
							label={this.state.label} 
							temp={value[3].temp} 
							description={value[5]["0"].description}
							main={value[5]["0"].main}
							icon={value[5]["0"].icon} />
						}
					</div>
					
					</div>
			  }		
		 });

		let toggle = <div className="convert-icon">
		{
			this.state.show === true &&
			<span className="fahrenheit" onClick={this.convertToCelscuis}></span>
		}

		{
			this.state.show === false &&
			<span className="celcius" onClick={this.convertToFahrenheit}></span>
		}
	</div>

	  return( 
		   <div className="search-result">
			   <div className="wrap-result">

			    <div className="result-top">
					<span className="back-btn" onClick={this.goToPrevious}></span>
					<div className="region-wrap"><p className="region">{this.state.region}</p></div>
				 	{ toggle }
				</div>

				<p className="current-date">{this.state.dateTime}</p>

				 {this.getFirstIndex()} 

				 <div className="wrap-print">
				   { printCondition}
				 </div>

				<span className="error-msg">{this.state.notfound}</span>
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
