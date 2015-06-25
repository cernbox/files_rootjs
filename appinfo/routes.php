<?php
/**
 * Copyright (c) 2014 Robin Appelman <icewind@owncloud.com>
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 * See the COPYING-README file.
 */
/** @var $this OC\Route\Router */
$this->create('files_rootjs_load', '/ajax/loadfile.php')
	->actionInclude('files_rootjs/ajax/loadfile.php');

$this->create('files_rootjs_can', '/ajax/canbeopen.php')
        ->actionInclude('files_rootjs/ajax/canbeopen.php');

