const React = require('react');
const Landing = require('./Landing');
const Background = require('../util/background')
const Displacement = require('../util/disp');
const Shutter = require('./shutter.jsx')
const Logo = require('../util/logo')
const Portfolio = require('./portfolio')
const $ = require('jquery');
const LogoActions = require('../actions/logo')
const LogoStore = require('../stores/logoStore')
const Selected = require('./selected');
const Contact = require('./contact')
const About = require('./about.jsx')

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return({
      landing: true,
      pages: {},
      showing: false,
      selected: false,
      about: false,
      contact: false
    })
  },

  getLogos(){
    LogoActions.getLogos();
  },

  componentDidMount(){
    document.body.onkeydown = this.keyPress
    this.getLogos();
    this.list = LogoStore.addListener( this.__change );
    let background = new Background( 400, 400, 10 );
    window.onscroll = this.scrollStart
    if( this.props.params.project && this.props.params.project !== "landing" ){
      this.setState( { background: background, about: false, contact: false, landing: false, showing:  parseInt(this.props.params.project) } )
    }else if( this.props.params.selected ){
      let selected = this.props.params.selected;
      this.setState({ background: background, selected: selected })
    }else{
      this.setState({ background: background, about: false, contact: false })
    }
    debugger
  },


  componentWillReceiveProps( props ){
    if( props.params && props.params.project && ( props.params.project !== "landing" ) && parseInt( props.params.project ) !== this.state.showing ){
      this.setState({ showing: parseInt( props.params.project ), landing: false })
    }else if( props.params.project === "landing" ){
      this.setState({ landing: true, showing: false })
    }

    if( !props.params.selected && this.state.selected ){
      this.setState({ selected: false })
    }

    if( props.params.selected && !this.state.selected ){
      this.setState({ selected: props.params.selected })
    }

  },

  getShowing( name ){
    let keys = Object.keys( this.state.pages );
    let showing;
    for (var i = 0; i < keys.length; i++) {
      let page = this.state.pages[ keys[i] ];
      if( page.name === name ){
        this.setState({ showing: i, landing: false });
        showing = i;
      }
    }
    return showing;
  },

  componentWillUnmount(){
    this.list.remove();
  },

  __change(){
    let pages = LogoStore.getLogos();
    if( this.state.showing && pages[ this.state.showing ]  ){
      this.setState({ pages: pages, showing: pages[ this.state.showing ] })
    }else{
      this.setState({ pages: pages })
    }
  },

  scrollStart(){
    if( !this.state.scroll && !this.state.selected ){
      this.setState({ scrollStart: document.body.scrollTop, scroll: true  });
      window.setTimeout( this.scrollEnd, 1000 );

    }
  },

  scrollEnd(){
    if( this.state.scroll ){
      let start = this.state.scrollStart;
      let end = document.body.scrollTop;
      let threshhold = start - end;
      if( end < 1000 ){
        window.scrollTo( 0, 4000 );
      }
      if( end > 8000 ){
        window.scrollTo( 0, 4000 );
      }
      if( threshhold > 50 ){
        this.prev();
      }else if( threshhold < -50 ){
        this.next();
      }
      this.setState({ scrollStart: false, scroll: false });
    }
  },

  background(){
    if( this.state.landing && this.state.background ){
      this.state.background.fadeOut()
    }else if( this.state.background ){
      this.state.background.fadeIn()
    }
  },

  next(){
    if( this.state.landing ){
      this.setState({ landing: false, about: true }, this.setRoute )
    }else if( this.state.about ){
      this.setState({ about: false, showing: 0 }, this.setRoute )
    }else if( this.state.showing === Object.keys(this.state.pages).length - 1 ){
      this.setState({ contact: true, showing: false }, this.setRoute )
    }else if( this.state.contact ){
      this.setState({ contact: false, showing: false, landing: true }, this.setRoute )
    }else{
      this.setState({ showing: this.state.showing + 1 }, this.setRoute )
    }
  },

  prev(){
    if( this.state.about === true ){
      this.setState({ landing: true, about: false }, this.setRoute )
    }else if( this.state.showing <= 0 && this.state.showing !== false ){
      this.setState({ about: true, showing: false }, this.setRoute )
    }else if( this.state.contact ){
      this.setState({ contact: false, showing: Object.keys(this.state.pages).length - 1 }, this.setRoute )
    }else if( this.state.landing ){
      this.setState({ landing: false, contact: true })
    }else{
      this.setState({ showing: this.state.showing - 1 }, this.setRoute )
    }
  },

  setRoute(){
    if( this.state.landing ){
      this.context.router.push('/landing');
    }else if( this.state.showing ){
      this.context.router.push(`/${ this.state.showing }`);
    }
  },

  pages(){
    let keys = Object.keys( this.state.pages );
    return keys.map(
      function( el, index ){
        return(
          <Shutter select = { this.select } selected = { this.state.selected } key = { index } page = { this.state.pages[ el ] } index = { index } showing = { this.state.showing }></Shutter>
        )
      }.bind( this )
    );
  },

  changeTo( index ){
    this.context.router.push( `/${index}` );
    this.setState({ landing: false, showing: index, about: false, contact: false })
  },

  selected(){
    if( this.state.selected && this.state.pages[this.state.selected] ){
      return(
        <Selected getShowing = { this.getShowing } selected = { this.state.pages[this.state.selected] } removeSelected = { this.removeSelected }/>
      )
    }
  },

  select( id ){
    this.setState({ selected: id }, function(){
      this.context.router.push( `/selected/${id}` );
    }.bind( this ))
  },

  getBackgroundStyle(){

  },

  removeSelected(){
    this.setState({ selected: false })
  },

  keyPress( e ){
    if( e.key === "ArrowLeft" ){
      this.prev();
    }else if( e.key === "ArrowRight" ){
      this.next();
    }
  },

  render(){
    return(
      <div onKeyPress = { this.keyPress }>
        <div className = "full" style = { this.getBackgroundStyle() }/>
        <Landing landing = { this.state.landing } next = { this.next }></Landing>
        <About about = { this.state.about } click = { this.next } ></About>
        <Contact contact = { this.state.contact } click = { this.next } ></Contact>
        {
          this.background()
        }
        {
          this.pages()
        }
        {
          this.selected()
        }
        <Portfolio selected = { this.state.selected } click = { this.changeTo } showing = { this.state.showing } pages = { this.state.pages } landing = { this.state.landing }></Portfolio>
        <div className = "logo-container"></div>
      </div>
    )
  }
})
