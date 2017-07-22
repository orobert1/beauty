<?php

require_once(dirname(__FILE__).'/AbstractClass.php');

class Image extends AbstractClass{
  public function __construct( $path, $size, $parent ){
    $this->path = $path;
    $this->size = $size;
    $this->parent = $parent;
    $validation = $this->checkValidations( $path );
    if( $validation ){
      $instanceVariables = array( "path", "size", "parent" );
      $params = AbstractClass::getParams( $instanceVariables );
      $panel = AbstractClass::fuck( "Image", $params );
    }
  }

  public function getImages( $name ){
    $children = AbstractClass::getChildren( $name, "parent", "Image" );
    return $children;
  }

  protected function checkValidations( $params ){
    return true;
  }
}

?>
