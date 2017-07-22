<?php
class Router
{
  public function __construct( $root ){
    $this->root = $root;
    $this->routes = array();
    $this->default = array();
  }

  public function addRoute( $route, $result ){
    $this->routes[ $this->root.$route ] = $result;
  }

  public function addDefault( $result ){
    $this->default["default"] = $result;
  }

  public function getCurrentUri(){
    $req = new stdClass;
    $uri = $_SERVER['REQUEST_URI'];
    $uri = $uri.explode( $this->root, $uri )[0];
    return strval($uri);
  }

  public function checkRoutes(){
    $uri = $this->getCurrentUri();
    if( $uri === "/" || $uri === "/index.php" || $uri === $this->root."/"."index.php" ){
      $this->default["default"]();
    }
    $data = $this->getData();
    if( $this->routes[ $uri ] || $uri === $this->root . $this->routes[$uri] || $uri === $this->root.$this ){
      $this->routes[ $uri ]();
    }
  }

  public function getData(){
    if( isset( $_POST["data"] ) ){
      $forl = $_POST["data"];
      return $forl;
    }else{
      return false;
    }
  }

  public function hasNum( $string ){
    $array = explode( "/", $string );
    $bool = false;
    $returnArray = array();
    foreach ( $array as $index => $part ) {
      if( (string)(int)$part == $part ){
        $bool = true;
      }else{
        array_push( $returnArray, $part );
      }
    }
    array_push( $returnArray, "/" );
    if( $bool ){
      return join( '', $returnArray );
    }else{
      return false;
    }
  }

  public function hasColons( $string ){
    $array = explode( ":", $string);
    $fin = array();
    foreach( $array as $index => $part ){
      if( sizeof($array) > 1 ){
        if( !($index % 2) ){
          array_push( $fin, $part );
        }
      }else{
        return false;
      }
    }
    return join( '' ,$fin );
  }
}

?>
