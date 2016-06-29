<?php

// Set the session key for the file we are about to edit.
//OCP\JSON::callCheck();

$token = isset($_GET['token']) ? $_GET['token'] : '';
if(!empty($token))
{
	$linkItem = \OC::$server->getShareManager()->getShareByToken($token);
	$owner = $linkItem->getShareOwner();
	
	\OC\Files\Filesystem::tearDown();
	\OC\Files\Filesystem::init($owner, '/' . $owner . '/files');
	
	$path = '/' . \OC\Files\Filesystem::getPath($linkItem->getNodeId());

	$filecontents = \OC\Files\Filesystem::file_get_contents($path);
	echo $filecontents;
	return;
} else {
	OCP\JSON::error(array('data' => array( 'message' => 'Invalid share token supplied.')));
}

?>
