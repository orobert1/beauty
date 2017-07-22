<?php

require_once(dirname(__FILE__).'/AbstractClass.php');
require_once(dirname(__FILE__).'/colors.php');
require_once(dirname(__FILE__).'/image.php');
require_once(dirname(__FILE__).'/PanelMobile.php');
require_once(dirname(__FILE__).'/../scripts/connect.php');


class Panel extends AbstractClass
{
    public function __construct( $name, $url, $ext, $mobileUrl, $mobileExt, $colors,  $width, $length, $repeat, $ground, $muralId ){
      $exists = AbstractClass::find( array( "name"=>$name ), "Panel" );
      if( $exists->id ){
        $mobile = new PanelMobile( $name, $mobileUrl, $mobileExt, $exists->id );
        $this->colors = $colors;
        $this->id = $exists->id;
        $this->name = $name;
        $this->addColors();
      }else{
        if( $ext ){
          $this->image = file_get_contents( $url.$ext, true );
        }else{
          $this->image = file_get_contents( $url, true );
        }
        $this->ext = $ext;
        $this->colors = $colors;
        $this->name = $name;
        $this->width = $width;
        $this->length = $length;
        $this->rep = $repeat;
        $this->ground = $ground;
        $this->muralId = $muralId;
        $validation = $this->checkValidations( 1 );
        echo "<br>".$this->name."<br>";
        echo "<br>";
        var_dump( $validations );
        echo "<br>";
        if( $validation ){
          $instanceVariables = array( "name", "path", "width", "length", "rep", "ground", "muralId" );
          $panel = $this->fuck( self::class,
          $this->getParams( $instanceVariables ));
          $this->id = $panel;
          $mobile = new PanelMobile( $name, $mobileUrl, $mobileExt, $this->id );
          $this->addColors();
          return AbstractClass::find( "id", $this->id, self::class );
        }else{
          echo "could not create Panel";
        }

      }
    }

    protected function checkValidations( $params ) {
      if( $this->checkNameUnique() && $this->saveImage() && $this->width() && $this->length() && $this->repeat() && $this->ground ){
        return true;
      }else{
        echo "validations failed";
        return false;
      }
    }

    public function width(){
      if( $this->width ){
        return true;
      }else{
        echo "width validations failed";
        return false;
      }
    }

    public function length(){
      if( $this->length ){
        return true;
      }else{
        echo "length validations failed";
        return false;
      }
    }

    public function repeat(){
      if( $this->rep ){
        return true;
      }else{
        echo "repeat validations failed";
        return false;
      }
    }

    public function ground(){
      if( $this->ground ){
        return true;
      }else{
        echo "ground validations failed";
        return false;
      }
    }

    public function outlines( $id ){
      $children = AbstractClass::getChildren( $id, "panel_id",  "Outline" );
      return $children;
    }

    public function mobile( $id ){
      $children = AbstractClass::getChildren( $id, "panelId",  "PanelMobile" );
      return $children;
    }

    public function colors( $id ){
      $colors = AbstractClass::getChildren( $id, "panelId", "Color" );
      $obj = array();
      foreach( $colors as $index=>$color ){
        $obj[$color->color] = AbstractClass::getChildren( $color->id, "colorId", "ColorVariation" );
      }
      return $obj;
    }

    public function saveImage(){
      $image = new stdClass;
      $image->class = self::class;
      $image->name = $this->name;
      $image->extension = $this->ext;
      $image->image = $this->image;
      $obj = new Image( $image );
      $this->image = "";
      $this->path = $obj->getPath();
      if( $this->path ){
        echo "image validations passed";
        return true;
      }else{
        echo "image validations failed";
      }
    }

    protected function addColors(){
      foreach( $this->colors as $color => $variations ){
        new Color( $this->name, $color, $variations, $this->id );
      }
    }

    protected function checkNameUnique(){
      if( AbstractClass::find( "name", $this->name, self::class ) ){
        return false;
      }else{
        return true;
      }
    }

}

?>
