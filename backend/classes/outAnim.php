<?php
class OutAnim extends AbstractClass{
  public function __construct( $name, $value, $parent ){
    $this->parent = $parent;
    $this->name = $name;
    $this->value = $value;
    $validation = $this->checkValidations( $name );
    if( $validation ){
      $instanceVariables = array( "name", "value", "parent" );
      $params = AbstractClass::getParams( $instanceVariables );
      $panel = AbstractClass::fuck( "OutAnim", $params );
    }
  }

  protected function checkValidations( $params ){
    return $this->checkNameUnique();
  }

  protected function checkNameUnique(){
    if( AbstractClass::find( array( "parent" => $this->parent, "name" => $this->name ), "OutAnim" ) ){
      return false;
    }else{
      return true;
    }
  }
}
?>
