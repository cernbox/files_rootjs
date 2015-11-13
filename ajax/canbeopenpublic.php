<?php

// Set the session key for the file we are about to edit.
$token = isset($_GET['token']) ? $_GET['token'] : '';
if(!empty($token)) {
	
	$linkItem = \OCP\Share::getShareByToken($token, false);
	$owner = $linkItem['uid_owner'];
	
	\OC\Files\Filesystem::init($owner, '/' . $owner . '/files');
	
	$path = '/' . \OC\FIles\Filesystem::getPath($linkItem['file_source']);
	
	$maxsize = \OCP\Config::getSystemValue("max_size_root_file", 4194304); // default of 4MB
	$size = \OC\Files\Filesystem::filesize($path);
	if($size > $maxsize) {
		OCP\JSON::error(array('data' => array( 'message' => "The maximun file size for opening root files is $maxsize bytes.")));
		return;
	}
	OCP\JSON::success(array('data' => array('message' => "The file is allowed to be open in the ROOT Viewer", 'filename' => basename($path), 'dir' => dirname($path))));

} else {
	OCP\JSON::error(array('data' => array( 'message' => 'Invalid share token supplied.')));
}

?>
