const React = require('react');

module.exports = React.createClass({

  getInitialState(){
    return({
      landing: this.props.landing
    })
  },

  componentWillReceiveProps( props ){
    this.setState({ landing: props.landing })
  },

  getStyle(){
    if( this.state.landing ){
      return({
        opacity: 1
      })
    }else{
      return({
        opacity: 0
      })
    }
  },

  oStyle(){
    if( this.state.landing ){

    }else{
      return({
        left: "-52%"
      })
    }
  },

  rStyle(){
    if( this.state.landing ){

    }else{
      return({
        right: "-52%"
      })
    }
  },

  nameStyle(){
    if( this.state.landing ){

    }else{
      return({
        bottom: "-20vh"
      })
    }
  },

  click(){
    debugger
  },

  render(){
    return(
      <div id = "landing-background" style = { this.getStyle() } onClick = { this.props.next }>
        <div id = "logo-anchor" onClick = { this.props.next }>
          <div id = "OR-wrap" onClick = { this.props.next }>
            <div id = "R" style = { this.rStyle() } onClick = { this.props.next }>
            </div>
            <div id = "O" style = { this.oStyle() } onClick = { this.props.next }>
            </div>
          </div>
          <div id = "title-text" style = { this.nameStyle() } onClick = { this.props.next }>
            Oscar Robert
          </div>
        </div>
      </div>
    )
  }
})
