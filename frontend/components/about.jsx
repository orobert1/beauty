const React = require('react');
const LogoElement = require('./logoElement')

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return({
      showing: this.props.showing,
      selected: this.props.selected,
      about: this.props.about
    })
  },

  componentWillReceiveProps( props ){
    this.setState({ showing: props.showing, selected: props.selected, about: props.about })
  },

  getStyle(){
    if( this.props.about ){
      return({
        opacity: 1
      })
    }else{
      return({
        opacity: 0
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

  getLogo(){
    // let paths =
    let logo = {
      "./assets/images/logo_8/1.png":
      {
        style: {
          in: {
            left: "0vw",
            width: "80%",
            transition: "1s"
          },
          out: {
            left: "-10vw",
            width: "80%",
            transition: "1s"
          }
        },
        in:[],
        out:[]
      },
      "./assets/images/logo_8/2.png":
      {
        style: {
          in: {
            left: "0vw",
            width: "80%",
            transition: "1s",
            transitionDelay: ".2s"

          },
          out: {
            left: "20vw",
            transition: "1s",
            transitionDelay: ".2s"

          }
        },
        in:[],
        out:[]
      },
      "./assets/images/logo_8/3.png":
      {
        style: {
          in: {
            left: "0vw",
            width: "80%",
            transition: "1s",
            transitionDelay: ".4s"
          },
          out: {
            left: "0vw",
            width: "80%",
            transition: "1s",
            transitionDelay: ".4s"
          }
        },
        in:[],
        out:[]
      }
    }

    let paths = Object.keys( logo );
    return paths.map(
      function( path, index ){
        let show;
        if( this.state.about ){
          show = true;
        }else{
          show = false
        }

        return(
          <LogoElement style = { logo[path].style }path = { path } inOut = { logo[ path ] } showing = { this.state.about } key = { index } ></LogoElement>
        )
      }.bind( this ))
  },

  click(){
    this.props.click();
  },

  render(){
    return(
      <div>
        <div className = "page" style = { this.getStyle() }>
          <div className = "title about" style = { this.titleStyle() } onClick = { this.click }>
            About
          </div>
          <div className = "description about">
            I am a graphic designer who specializes in web design and UI/UX design. I graduated in 2016 from the Rhode Island School of Design. Additionally, I am a fullstack web developer who has experience in PHP, Ruby, Rails, Javascript, React, MySQL, Git, and Node.
          </div>
          <div className = "logo" onClick = { this.click }>
            {
              this.getLogo()
            }
          </div>
        </div>
      </div>
    )
  }
})
