<?php
	
OCP\Util::addStyle('files_rootjs', 'style');
OCP\Util::addStyle('files_rootjs', 'JSRootPainter');
OCP\Util::addStyle('files_rootjs', 'JSRootInterface');
OCP\Util::addStyle('files_rootjs', 'JSRootGeoPainter');

OCP\Util::addscript('files_rootjs', 'editor');
OCP\Util::addScript('files_rootjs', 'scripts/three');
OCP\Util::addScript('files_rootjs', 'scripts/three.extra');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootCore');
OCP\Util::addscript('files_rootjs', 'scripts/d3.v3.min');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootPainter');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootInterface');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootPainter.jquery');
OCP\Util::addscript('files_rootjs', 'scripts/JSRootIOEvolution');
OCP\Util::addScript('files_rootjs', 'scripts/JSRootGeoPainter');
OCP\Util::addScript('files_rootjs', 'scripts/JSRootMath');
OCP\Util::addScript('files_rootjs', 'scripts/JSRootPainter.more');
OCP\Util::addScript('files_rootjs', 'scripts/rawinflate');
OCP\Util::addScript('files_rootjs', 'scripts/saveSvgAsPng');

