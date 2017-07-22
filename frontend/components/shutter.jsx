const React = require('react');
const LogoElement = require('./logoElement')
const $ = require('jquery');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return({
      showing: this.props.showing,
      title: this.props.page.name,
      description: this.props.page.description,
      background: this.props.page.background,
      id: this.props.page.id,
      index: this.props.index,
      logo: this.props.page.logo,
      selected: this.props.selected
    })
  },

  componentWillReceiveProps( props ){
    this.setState({ showing: props.showing, selected: props.selected })
  },

  getTitle(){
    return(
      this.state.title
    )
  },

  getLogo(){
    let paths = Object.keys( this.state.logo );
    return paths.map(
      function( path, index ){
        let show;
        if( this.state.showing === this.state.index ){
          show = true;
        }else{
          show = false
        }
        return(
          <LogoElement path = { path } inOut = { this.state.logo[ path ] } showing = { show } key = { index } ></LogoElement>
        )
      }.bind( this )
    )
  },

  getStyle(){
    if( !this.state.selected && this.state.showing === this.state.index ){
      return({
        opacity: 1,
        pointerEvents: "painted"
      })
    }else if( this.state.selected  && this.state.showing === this.state.index ){
      return({
        opacity: .2,
        pointerEvents: "none"
      })
    }else{
      return({
        pointerEvents: "none"
      })
    }
  },

  titleStyle(){
    if( this.state.showing === this.state.index ){
      return(
        {
          paddingTop: "0px"
        }
      )
    }else{
      return(
        {
          paddingTop: "50px"
        }
      )
    }
  },

  click(){
    this.props.select( this.state.title );
  },


  render(){
    return(
      <div className = "page" style = { this.getStyle() }>
        <div className = "title" style = { this.titleStyle() } onClick = { this.click }>
          {
            this.getTitle()
          }
        </div>
        <div className = "logo" onClick = { this.click }>
          {
            this.getLogo()
          }
        </div>
      </div>
    )
  }
})
