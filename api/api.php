<?php
declare(strict_types=1);

require_once "base/rest.php";
require_once "demo/samples.php";

// Load vendors libs
require "bootstrap.php";


use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\LineFormatter;

/**
*   Using dependency injection container
*/
$container = require "di/containerBuilder.php";

/**
*   Api endpoints
*/
class API extends rest\RestApi {

    private $container = NULL;
    private $log = NULL;

    public function __construct($container) {
        parent::__construct();

        // Get DI container
        $this->container = $container;

        // Logger setup
        $this->log = new Logger('logger');
        $dateFormat = "Y n j, g:i a";
        $output = "%datetime% > %level_name% > %message%\n";
        $formatter = new LineFormatter($output, $dateFormat);
        $stream = new StreamHandler('../log/log.log', Logger::DEBUG);
        $stream->setFormatter($formatter);
        $this->log->pushHandler($stream);
    }

    /**
	 *  Dynmically call the method based on the query string
	 */
	public function processApi() {
		$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));

        $response_payload = '';

        $this->log->debug($this->get_request_method()." - \\".$func);

		if((int)method_exists($this, $func) > 0)
			$response_payload = $this->$func();
		else {
            // If the method not exist with in this class "Page not found".
			$response_payload = $this->response($response_payload, 404); 
        }

        $this->log->debug(
            "Response: ".$this->_code." (".$this->get_status_message().")".$response_payload ?? " - Payload:\n".$response_payload);

        echo $response_payload;
	}


    /* Endpoints */

    /**
    *   GET (DEMO)
    */
    private function sample() {
        try {

            $samples = $this->container->get('Samples');

            if($this->get_request_method() != "GET"){
                return $this->response('',406);
            }

            $result = $samples->getSamples();

            if($result != NULL)
                return $this->response($this->json($result), 200);

            return $this->response('', 204);

        } catch(Throwable $exception) {
            return $this->response($exception->getMessage(), 500);
        }
    }


    /* Utils */

    /**
	 *	Encode array into JSON
	*/
	private function json($data){
		if(is_array($data)){
			return json_encode($data);
		}
	}
}

// Init Library
$api = new API($container);
$api->processApi();