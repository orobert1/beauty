<?php
  require_once(dirname(__FILE__).'/AbstractClass.php');
  require_once(dirname(__FILE__).'/logoComponent.php');

  class Logo extends AbstractClass
  {
    public function __construct( $name ){
      $this->name = $name;
      $validation = $this->checkValidations( $name );
      if( $validation ){
        $instanceVariables = array( "name" );
        $params = AbstractClass::getParams( $instanceVariables );
        $panel = AbstractClass::fuck( "Logo", $params );
      }else{
        $n = AbstractClass::find( array( "name" => $this->name ), "Logo" );
        return $n;
      }
    }

    public function getLogo( $name ){
      $all = array();
      $children = AbstractClass::getChildren( $name, "parent", "LogoComponent" );
      foreach ( $children as $child ) {
        $inout = LogoComponent::getInOut( $child->path );
        $all[ $child->path ] = $inout;
      }
      return $all;
    }

    public function addComponent( $path, $in, $out ){
      $logo = new LogoComponent( $path, $this->name, $in, $out );
      return $logo;
    }

    public function checkValidations( $params ){
      $unique = $this->checkNameUnique();
      if( $unique ){
        return true;
      }else{
        return false;
      }
    }

    protected function checkNameUnique(){
      if( AbstractClass::find( array( "name" => $this->name ), "Logo" ) ){
        return false;
      }else{
        return true;
      }
    }
  }
?>
