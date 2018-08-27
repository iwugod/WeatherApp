import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../../redux/photo/actions'


class Photo extends Component {
 
  constructor(props) {
    super(props)
  }

  componentDidMount () {
  }

  render() {

    const item  = this.props.match.params.code;
    const comments = "";
    const displayItem  = this.props.post.map((value, index) => {
      if (value.code === item || this.props.comments[item]) {
        return <div className="frame-wrap" key={value.id}  actions={this.props.actions}>
          <div className="image-lg"><img src={value.display_src} width="300" height="300"></img></div>
          <div className="user-actions">
            <div className="caption-txt"> {value.caption}</div>
            <div className="img-likes">{value.likes}</div>
          </div>
        </div>
      }
      
    });
    
    return (
      
        <div className="photo-grid single">
           { displayItem }
           {/* { displayComment } */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Photo)
