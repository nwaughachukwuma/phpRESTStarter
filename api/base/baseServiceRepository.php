<?php
namespace serviceRepository {

    /**
    *   Base class to access the db
    */
    abstract class BaseServiceRepository {

        protected const DB_SERVER = "127.0.0.1";
        protected const DB_USER = "root";
        protected const DB_PASSWORD = "root";
        protected const DB = "bassolidb";

        protected $mysqli = NULL;

        public function __construct() {		
            $this->dbConnect();			
        }

        /*
        *  Connect to Database
        */
        protected function dbConnect(){
            $this->mysqli = new \mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
        }
    }
}