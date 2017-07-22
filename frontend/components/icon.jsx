const React =  require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      el: this.props.el,
      showing: this.props.showing,
      index: this.props.index
    })
  },

  componentWillReceiveProps( props ){
    this.setState({ showing: props.showing })
  },

  getStyle(){
    if( this.state.showing === this.state.index ){
      return({
        backgroundImage: `url('${this.state.el.icon}')`,
        opacity: 1
      })
    }else{
      return({
        backgroundImage: `url('${this.state.el.icon}')`
      })
    }
  },

  click(){
    this.props.click( this.state.index );
  },

  render(){
    return(
      <div className = "small-icon" style = { this.getStyle() } onClick = { this.click }>
      </div>
    )
  }
})
