<?php
/** @var $this OC\Route\Router */
$this->create('files_rootjs_load', '/ajax/loadfile.php')
	->actionInclude('files_rootjs/ajax/loadfile.php');

$this->create('files_rootjs_can', '/ajax/canbeopen.php')
        ->actionInclude('files_rootjs/ajax/canbeopen.php');

