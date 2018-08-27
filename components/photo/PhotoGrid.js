import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../../redux/photo/actions'

import photoStyles from '../../components/photo/photo.scss'
import mainStyles from '../../scss/main.scss'
import NavLink  from 'react-router-dom/NavLink'

class PhotoGrid extends Component {

	constructor(props) {
		super(props)
  }
  componentDidMount () {
  }
  render() {
    

    return (
        <div className="photo-grid">
          
          {
              this.props.post.map((value) => {
                if (value) {
                  return <NavLink to={ `/single/${value.code}` } className="frame-wrap" key={value.id} code={value.code} actions={this.props.actions}>
                    <div className="image-sm"><img src={value.display_src} width="300" height="300"></img></div>
                    <div className="img-overlay"><span className="btn-more">view</span></div>
                    <div className="user-acts">
                      <div className="caption-txt"> {value.caption}</div>
                      <div className="img-likes">{value.likes}</div>
                    </div>
                    <span className="break-line"></span>
                  </NavLink>
                }
              })
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGrid)
 //export default PhotoGrid;