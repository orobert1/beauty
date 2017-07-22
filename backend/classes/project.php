<?php
  require_once(dirname(__FILE__).'/AbstractClass.php');
  require_once(dirname(__FILE__).'/logo.php');
  require_once(dirname(__FILE__).'/image.php');

  class Project extends AbstractClass{
    public function __construct( $name, $description, $icon, $site ){
      $this->name = $name;
      $this->description = $description;
      $this->icon = $icon;
      $this->site = $site;
      $this->logo = new Logo( $name );
      $validation = $this->checkValidations( $name );
      if( $validation ){
        $instanceVariables = array( "name", "description", "icon", "site" );
        $params = AbstractClass::getParams( $instanceVariables );
        $panel = AbstractClass::fuck( "Project", $params );
      }
    }

    public function addComponent( $path, $in, $out ){
      $this->logo->addComponent( $path, $in, $out );
    }

    public function addImage( $path, $size ){
      new Image( $path, $size, $this->name );
    }

    public function getProjects(){
      $all;
      $projects = AbstractClass::all( "Project" );
      foreach ($projects as $index => $project) {
        $logo = Logo::getLogo( $project->name );
        $all[ $project->name ][ "name" ] = $project->name;
        $all[ $project->name ][ "description" ] = $project->description;
        $all[ $project->name ][ "icon" ] = $project->icon;
        $all[ $project->name ][ "logo" ] = $logo;
        $all[ $project->name ][ "images" ] = Image::getImages( $project->name );
        $all[ $project->name ][ "site" ] = $project->site;
      }
      return $all;
    }

    public function checkValidations( $params ){
      if( AbstractClass::find( array( "name" => $this->name ), "Project" ) ){
        return false;
      }else{
        return true;
      }
    }
  }


?>
