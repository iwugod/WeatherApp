import React, { Component } from 'react'

import {  Route, Link } from "react-router-dom"

import headerStyles from '../../../components/common/header/header.scss'

import NavLink  from 'react-router-dom/NavLink'

class Header extends Component{
	constructor(props) {
		super(props)
	}
		
	render(){

		const menuLinks = <nav className="navigation-wrap">
					<ul className="nav-items">
						<li className="menu-items"><NavLink activeClassName="active" exact to="/" >Main</NavLink></li>
						<li className="menu-items"><NavLink activeClassName="active" exact to="/main" >Search</NavLink></li>
					</ul>
					
				
			</nav>

		return (
		  menuLinks 
		)
	}

			
		
}

export default Header;