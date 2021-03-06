<?php

// Set the session key for the file we are about to edit.
$token = isset($_GET['token']) ? $_GET['token'] : '';
if(!empty($token))
{
	$linkItem = \OCP\Share::getShareByToken($token, false);
	$owner = $linkItem['uid_owner'];
	
	\OC\Files\Filesystem::init($owner, '/' . $owner . '/files');
	
	$path = '/' . \OC\Files\Filesystem::getPath($linkItem['file_source']);

	$filecontents = \OC\Files\Filesystem::file_get_contents($path);
	echo $filecontents;
	return;
} else {
	OCP\JSON::error(array('data' => array( 'message' => 'Invalid share token supplied.')));
}

?>
