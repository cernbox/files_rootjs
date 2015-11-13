<?php
/** @var $this OC\Route\Router */
$this->create('files_rootjs_load', '/ajax/loadfile.php')
	->actionInclude('files_rootjs/ajax/loadfile.php');

$this->create('files_rootjs_can', '/ajax/canbeopen.php')
        ->actionInclude('files_rootjs/ajax/canbeopen.php');

$this->create('files_rootjs_canpublic', '/ajax/canbeopenpublic.php')
        ->actionInclude('files_rootjs/ajax/canbeopenpublic.php');

$this->create('files_rootjs_loadpublic', '/ajax/loadpublicfile.php')
        ->actionInclude('files_rootjs/ajax/loadpublicfile.php');
        

