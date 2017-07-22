<?php

require_once( dirname(__FILE__).'../../scripts/connect.php' );

abstract class AbstractClass
{
    abstract protected function checkValidations($params);
    public function find( $params, $className ){
      if( $rows > 0 ){
        $obj = mysqli_fetch_object($res);
        return $obj;
      }
      $connection = Connect::getConnection();
      $query = "SELECT * FROM ".$className." WHERE ";
      foreach( $params as $name => $value  ){
        $query = $query." ".$name." = '".$value."' AND";
      }
      $query = substr($query, 0, -3);
      $res = $connection->query($query);
      $rows = mysqli_num_rows( $res );
      if( $res && $rows > 0 ){
        $obj = mysqli_fetch_object($res);
        return $obj;
      }else{
        return false;
      }
    }

    public static function all( $class ){
      $connection = Connect::getConnection();
      $query = 'SELECT * FROM beauty.'.$class;
      $res = $connection->query($query);
      $output = array();
      while( $row = mysqli_fetch_object( $res ) ){
        array_push( $output, $row );
      }
      return $output;
    }

    public function fuck( $className, $params ){
      $connection = Connect::getConnection();
      AbstractClass::checkTable( $className, $params );
      $query = 'INSERT INTO beauty.'.$className.' (';
      foreach( $params as $name=>$value ){
          $query = $query.' '.$name.',';
      }
      $query = substr($query, 0, -1);
      $query = $query.') VALUE (';
      foreach( $params as $name=>$value ){
          $query = $query.' "'.$value.'",';
      }
      $query = substr($query, 0, -1);
      $query = $query.')';
      $res = $connection->query($query);
      $object = AbstractClass::find( $params, $className );
      return $object->id;
    }

    public function destroyIfExists( $className, $params ){
      $connection = Connect::getConnection();
      $query = "DELETE FROM ".$className." WHERE ";
      foreach( $params as $name => $value  ){
        $query = $query." ".$name." = '".$value."' AND";
      }
      $query = substr($query, 0, -4);
      $res = $connection->query($query);
    }

    public function getParentClass( $id, $parentClass, $names ){
      $connection = Connect::getConnection();
      $query = "SELECT * FROM ".$parentClass." WHERE id = '".$id."'";
      $res = $connection->query($query);
      $row = mysqli_fetch_object( $res );
      $obj = array();
      foreach( $names as $index=>$name ){
        $value = $row->$name;
        $key = $name;
        $obj[$key] = $value;
      }
      return $obj;
    }

    public function getChildren( $id, $key, $childClass ){
      $connection = Connect::getConnection();
      $query = "SELECT * FROM ".$childClass." WHERE ".$key." = '".$id."'";
      $res = $connection->query($query);
      $num_rows = mysqli_num_rows($res);
      $output = array();
      while( $obj = mysqli_fetch_object( $res ) ){
        array_push( $output, $obj );
      }
      return $output;
    }

    public function checkTable( $className, $params ){
      $connection = Connect::getConnection();
      $query = "SHOW TABLES LIKE '".$className."'";
      $result = $connection->query($query);
      $tableExists = mysqli_num_rows($result) > 0;
      if( $tableExists ){
        return;
      }else{
        $newQ = "CREATE TABLE ".$className." ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,";
        foreach( $params as $name => $value ){
          $type = $this->getType($value);
          $newQ = $newQ." ".$name." ".$type." NOT NULL";
          if( $index != sizeof( $names ) - 1 ){
            $newQ = $newQ.",";
          }
        }
        $newQ = substr($newQ, 0, -1);
        $newQ = $newQ." )";
        $res = $connection->query( $newQ );
      }
    }

    private function getType( $thing ){
      $type = gettype($thing);
      if( $type == string ){
        return "VARCHAR(500)";
      }else{
        return "INT(6) UNSIGNED";
      }
    }

    public function change( $className, $id, $data ){
      $connection = Connect::getConnection();

      $query = "UPDATE ".$className." SET ";
      foreach( $data as $key => $value ){
        if( $key !== 'id' ){
          $query = $query.$key." = '".$value."', ";
        }
      }
      $query = substr($query, 0, -2);
      $query = $query." WHERE id = ".$id;
      $res = $connection->query( $query );
    }



    public function getParams( $params ){
      $output = array();
      foreach ($params as &$value) {
        $param = get_object_vars( $this )[$value];
        $output[$value] = $param;
      }
      return $output;
    }



}
?>
