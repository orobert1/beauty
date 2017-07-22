<?php
  require_once(dirname(__FILE__).'/backend/scripts/connect.php' );
  require_once(dirname(__FILE__).'/backend/scripts/router.php' );
  require_once( dirname(__FILE__).'/backend/views/index.php' );
  require_once( dirname(__FILE__).'/backend/classes/logo.php' );
  require_once( dirname(__FILE__).'/backend/controllers/LogoController.php' );

  $r = new Router( "/beauty" );
  $r->addDefault( function(){
    echo Indexmu::getIndex();
  });

  $r->addRoute( "/logos", function(){
    echo LogoController::getLogos();
  });

  $r->checkRoutes();
?>
