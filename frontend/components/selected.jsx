const React = require('react');
const ProjectImage = require('./projectImage');
const SelectedSide = require('./selectedSide');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return({
      selected: this.props.selected,
      loaded: 0,
    })
  },

  componentDidMount(){
    let showing = this.props.getShowing( this.state.selected.name );
    this.setState({ showing: showing })
  },

  xClick(){
    this.context.router.push(`/${ this.state.showing }`);
  },

  imageLoad(){
    let loaded = this.state.loaded + 1;
    this.setState({ loaded: loaded })
  },

  images(){
    let left = false
    return this.state.selected.images.map(
      function( el, index ){
        if( el.size !== "full" ){
          left = !left;
        }
        let loaded = false;
        if( this.state.loaded === this.state.selected.images.length ){
          loaded = true;
        }
          return(
            <ProjectImage loaded = { loaded} imageLoad = { this.imageLoad } el = {el} left = { left } index = { index } key = { index }></ProjectImage>
          )
      }.bind( this )
    );
  },

  sidebar(){
    if( this.state.loaded ){
      return(
        <SelectedSide selected = {this.state.selected}></SelectedSide>
      )
    }
  },

  render(){
    return(
      <div className = "over">
        <div className = "overlay"></div>
        {
          this.sidebar()
        }
        <div className = "parentScroll">
          <div className = "image-container">
            {
              this.images()
            }
          </div>
        </div>
        <div className = "x" onClick = { this.xClick }>X</div>
      </div>
    )
  }
})
