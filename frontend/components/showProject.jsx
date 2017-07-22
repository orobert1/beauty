const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return({
      projectId: this.props.params.project
    })
  },

  componentDidMount(){
    window.onScroll = this.scrollStart({});
  },

  scrollStart(){

  },

  scrollEnd(){

  },

  getBackground(){
    return({
      backgroundImage: `url( './assets/images/backgrounds/aa_.png' )`
    })
  },

  render(){
    return(
      <div className = "show-project">
        <div className = "show-background" style = {this.getBackground()}>
          <div className = "show-over"></div>
        </div>
      </div>
    )
  }
})
