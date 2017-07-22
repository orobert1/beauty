<?php

  class Connect{
    public static function getConnection(){
      // $servername = "oscarrobert.com";
      // $username = "fuckfuckAss";
      // $password = "Wordpr3sücks";
      $servername = "localhost";
      $username = "beauty";
      $password = "password";

      // Create connection
      $conn = new mysqli( $servername, $username, $password, "beauty" );
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }else {

      }
      return $conn;
    }
  }

?>
