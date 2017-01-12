<?php

use DI\ContainerBuilder;

/**
*   Apply the dependency injection container configuration
*   (Add yours objects to config.php)
*/
$containerBuilder = new ContainerBuilder;
$containerBuilder->addDefinitions(__DIR__."/config.php");
$container = $containerBuilder->build();

return $container;
