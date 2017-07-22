const React = require('react');
const LogoElement = require( './logoElement' );

module.exports = React.createClass({
  getInitialState(){
    return({
      name: this.props.selected.name,
      description: this.props.selected.description,
      logo: this.props.selected.logo,
      site: this.props.selected.site
    })
  },

  componentDidMount(){
    this.setState({ mounted: true });
  },

  getLogo(){
    let paths = Object.keys( this.state.logo );
    return paths.map(
      function( path, index ){
        let show = true
        return(
          <LogoElement path = { path } inOut = { this.state.logo[ path ] } showing = { show } key = { index } ></LogoElement>
        )
      }.bind( this )
    )
  },

  site(){

    if( this.state.site !== "none" ){
      return(
        <div className = "side-site">
          <div className = "siteTitle"> Website </div>
          <a className = "site-link" href = { this.state.site }>
            {
              this.state.site
            }
          </a>
        </div>
      )
    }
  },


  render(){
    return(
      <div className = "sidebar">
        <div className = "side-name">
          {
            this.state.name
          }
        </div>
        <div className = "side-desc">
          {
            this.state.description
          }
        </div>
        {
          this.site()
        }
      </div>
    )
  }
})
