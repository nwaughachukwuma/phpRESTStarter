<?php

use function DI\object;
use samples\Samples;

/**
*   Objects to inject
*/
return [
    'Samples' => object(Samples::class)
];