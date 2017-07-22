const React = require('react')
const Icon = require('./icon');


module.exports = React.createClass({
  getInitialState(){
    return({
      landing: this.props.landing,
      pages: this.props.pages,
      showing: this.props.showing,
      selected: this.props.selected
    })
  },

  componentWillReceiveProps( props ){
    this.setState({
      landing: props.landing,
      pages: props.pages,
      showing: props.showing,
      selected: props.selected
    })
  },

  getStyle(){
    if( this.state.landing ){
      return{
        opacity: 0,
        transition: "1s"
      }
    }else if( this.state.selected ){
      return{
        opacity: .2,
        transition: "1s"
      }
    }else{
      return({
        opacity: 1,
        transition: "1s",
        transitionDelay: "1s"
      })
    }
  },

  icons(){
    let keys = Object.keys( this.state.pages );
    return keys.map(
      function( el, index ){
        return(
          <Icon click = { this.props.click } showing = { this.state.showing } el = { this.state.pages[el] } index = { index } key = { index } ></Icon>
        )
      }.bind( this )
    );
  },

  render(){
    return(
      <div style = { this.getStyle() }>
        <div className = "head-type">Portfolio</div>
        <div className = "icon-container">
          {
            this.icons()
          }
        </div>
      </div>
    )
  }
})
