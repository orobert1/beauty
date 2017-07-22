<?php
  class Indexmu{
    public function getIndex(){
        ?>
        <html>
        <meta name="viewport" content="width=device-width">
        <meta property="og:image" content="./logo.png"/>
        <meta property="og:title" content="Oscar Robert Graphic Design"/>
        <head>
          <link rel="stylesheet" type="text/css" href="./styles/style.css">
        </head>
        <body>
          <div id = "container1">
            <div id = "container2">
              <div id = "content">
              </div>
              <div id = "three"></div>
              <canv id = "text"></canv>
            </div>
          </div>
        </body>
        <script src = "bundle.js">
        </script>
        </html>
        <?php
    }
  }
?>
