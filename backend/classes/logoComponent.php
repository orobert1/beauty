<?php
  require_once(dirname(__FILE__).'/AbstractClass.php');
  require_once( dirname(__FILE__).'/inAnim.php' );
  require_once( dirname(__FILE__).'/outAnim.php' );

  class LogoComponent extends AbstractClass{
    public function __construct( $path, $parent, $in, $out ){

      // var_dump( $in );
      // var_dump( $out );
      $this->path = $path;
      $this->parent = $parent;
      $this->in = $in;
      $this->out = $out;
      $validation = $this->checkValidations( $path );
      if( $validation ){
        $instanceVariables = array( "path", "parent" );
        $params = AbstractClass::getParams( $instanceVariables );
        $panel = AbstractClass::fuck( "LogoComponent", $params );
        $this->addIn();
        $this->addOut();
        return $component;
      }else{

      }
    }

    public function getInOut( $name ){
      $in = AbstractClass::getChildren( $name, "parent", "InAnim" );
      $out = AbstractClass::getChildren( $name, "parent", "OutAnim" );
      return array( "in" => $in, "out" => $out );
    }

    protected function addIn(){
      foreach ( $this->in as $name => $value) {
        new InAnim( $name, $value, $this->path );
      }
    }


    protected function addOut(){
      var_dump( $this->out );
      foreach ( $this->out as $name => $value) {
        echo $name."<br>";
        echo $value."<br>";
        new OutAnim( $name, $value, $this->path );
      }
    }

    protected function checkValidations( $params ){
      if( $this->checkPathUnique() ){
        return true;
      }else{
        return false;
      }
    }

    protected function checkPathUnique(){
      if( AbstractClass::find( array( "path" => $this->path ), "LogoComponent" ) ){
        return false;
      }else{
        return true;
      }
    }
  }
?>
