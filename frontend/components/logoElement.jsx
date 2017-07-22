const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      logo: this.props.el,
      showing: this.props.showing,
      in: this.props.inOut.in,
      out: this.props.inOut.out,
      path: this.props.path,
      fuck: this.props.fuck,
      style: this.props.style
    })
  },

  componentDidMount(){
    let img = new Image();
    img.src = this.state.path
    img.className = "logoEl";
    img.style.position = "absolute";
    this.refs.logoEl.position = "absolute";
    let logoEl = this.refs.logoEl;
    logoEl.appendChild( img );
    this.setState({ image: img })
  },

  componentWillReceiveProps( props ){
    this.setState({ showing: props.showing })

  },

  showing(){

    if( this.state.showing ){
      if( this.state.style ){
        let keys = Object.keys( this.state.style.in );
        for (var i = 0; i < keys.length; i++) {
          let param = keys[i];
          let value = this.state.style.in[param];
          if( this.state.image ){
            this.state.image.style[param] = value;
          }
        }
      }else{
        this.fadeIn()
      }
    }else{
      if( this.state.style ){
        let keys = Object.keys( this.state.style.out );
        for (var i = 0; i < keys.length; i++) {
          let param = keys[i];
          let value = this.state.style.out[param];
          if( this.state.image ){
            this.state.image.style[param] = value;
          }
        }
      }else{
        this.fadeOut();
      }
    }
  },

  fadeIn(){

    for (var i = 0; i < this.state.in.length; i++) {
      let name = this.state.in[i].name;
      let value = this.state.in[i].value;
      if( this.state.image ){
        this.state.image.style[ name ] = value;
        this.state.image.style.opacity = "1";
      }
    }
  },

  fadeOut(){
    for (var i = 0; i < this.state.out.length; i++) {
      let name = this.state.out[i].name;
      let value = this.state.out[i].value;
      if( this.state.image ){
        this.state.image.style[ name ] = value;
        this.state.image.style.opacity = "0";
      }
    }
  },

  getStyle(){
    if( this.state.style ){
      if( this.state.showing ){
        return this.state.style.in;
      }else{
        return this.state.style.out;
      }
    }
  },

  render(){
    return(
      <div ref = "logoEl" style = { this.getStyle() }>
        {
          this.showing()
        }
      </div>
    )
  }
})
