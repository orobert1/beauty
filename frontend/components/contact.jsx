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
      about: this.props.contact
    })
  },

  componentWillReceiveProps( props ){
    this.setState({ showing: props.showing, selected: props.selected, about: props.contact })
  },

  getStyle(){
    if( this.props.contact ){
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
      "./assets/images/logo_9/1.png":
      {
        style: {
          in: {
            left: "0vw",
            width: "60%",
            transition: "1s"
          },
          out: {
            left: "20vw",
            transition: "1s"
          }
        },
        in:[],
        out:[]
      },
      "./assets/images/logo_9/2.png":
      {
        style: {
          in: {
            left: "0vw",
            width: "60%",
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
      "./assets/images/logo_9/3.png":
      {
        style: {
          in: {
            left: "0vw",
            width: "60%",
            transition: "1s",
            transitionDelay: ".4s"

          },
          out: {
            left: "20vw",
            width: "60%",
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
            Contact
          </div>
          <div className = "description about">
            email: orobert@risd.edu <br/>
            phone: 917 (301) - 2679 <br/>
            <a href = "https://github.com/orobert1">Github</a>
            <form method="get" action="./assets/docs/resume.pdf">
               <button type="submit">Resume</button>
            </form>
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
