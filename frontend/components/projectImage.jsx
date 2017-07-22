const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      index: this.props.index,
      el: this.props.el,
      left: this.props.left
    })
  },

  componentDidMount(){
    let img = new Image();
    img.onload = function(){
      this.props.imageLoad();
    }.bind( this )
    img.src = this.state.el.path;
    console.log( img.src );
  },

  getStyle(){
    if( !this.props.loaded ){
      return({
        opacity: 0,
        marginBottom: "20vh",
      })
    }else{
      return({
        backgroundImage: `url('${this.state.el.path}')`,
        marginBottom: "0vh",
        clear: "both",
        opacity: 1,
        transitionDelay: this.state.index / 3 + "s",
      })
    }
  },

  overlay(){
    if( !this.props.loaded ){
      return({
        opacity: 1
      })
    }else{
      return({
        opacity: .1
      })
    }
  },

  render(){

    return(
      <div className = "inner-image" style = { this.getStyle() }>
        <div className = "imageOverlay" style = { this.overlay() }></div>
      </div>
    )
  }
})
