<?php
	
OCP\Util::addStyle('files_rootjs', 'style');
OCP\Util::addStyle('files_rootjs', 'JSRootPainter.min');
OCP\Util::addStyle('files_rootjs', 'JSRootInterface.min');

OCP\Util::addscript('files_rootjs', 'editor');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootCore.min');
OCP\Util::addscript('files_rootjs', 'scripts/d3.v3.min');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootPainter.min');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootInterface.min');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootPainter.jquery.min');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootIOEvolution.min');

