
<?php
require_once( dirname(__FILE__).'../../../backend/classes/AbstractClass.php' );
require_once( dirname(__FILE__).'../../../backend/classes/project.php' );

  class LogoController{
    public function getLogos(){
      $all = Project::getProjects();
      return json_encode( $all );
    }
  }
?>
