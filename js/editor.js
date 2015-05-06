function showControls(dir, filename, writeable) {
	// Loads the control bar at the top.
	OC.Breadcrumb.show(dir, filename, '#');
	// Load the new toolbar.
	var editorbarhtml = '<div id="simpleGUIcontrols" style="display: none;">';
	editorbarhtml += '<button id="simpleGUI_close" class="icon-close svg"></button>';
	editorbarhtml += '</div>';

	$('#controls').append(editorbarhtml);
	$('#simpleGUIcontrols').show();
	if (!OC.Util.hasSVGSupport()) {
		OC.Util.replaceSVG($('#simpleGUIcontrols'));
	}
}

function bindControlEvents() {
	$('#content').on('click', '#simpleGUI_close', hideFileEditor);
}

// returns true or false if the editor is in view or not
function editorIsShown() {
	return is_editor_shown;
}

// Fades out the editor.
function hideFileEditor() {
	// TODO: handle the case when we close it in a public share. As Kuba pointed, it redirects to index.php instead to the current share
	$('#fileList').off('changeDirectory.texteditor');
	if (window.FileList){
		// reload the directory content with the updated file size + thumbnail
		// and also the breadcrumb
		window.FileList.reload();
	}
	// Fade out editor
	$('#files_rootjs_container, #simpleGUIcontrols').remove();
	// Reset document title
	document.title = $('body').attr('old_title');
	FileList.setViewerMode(false);
	$('#content table').show();
	is_editor_shown = false;
}
function textEditorOnChangeDirectory(ev){
	// if the directory is changed, it is usually due to browser back
	// navigation. In this case, simply close the editor
	hideFileEditor();
}

// Loads the file editor. Accepts two parameters, dir and filename.
function showFileEditor(dir, filename) {
		if (!editorIsShown()) {
			is_editor_shown = true;
			// Delete any old editors
			if ($('#notification').data('reopeneditor')) {
				OC.Notification.hide();
			}
			$('#simpleGUI').remove();
			// Loads the file editor and display it.
			$('#content').append('<div id="files_rootjs_container"><div id="simpleGUI"></div></div>');
			$('#simpleGUI').attr('files', 'https://testbox.cern.ch/index.php/apps/files/ajax/download.php?dir=' + dir + '&files=' + filename);
			if ($('#isPublic').val()){
				$('#simpleGUI').attr('files', 'https://testbox.cern.ch/index.php/s/CmHxPkf1a2aw87E/download?path=' + dir + '&files=' + filename);
		        }

			// Initialise the editor
			if (window.FileList){
				FileList.setViewerMode(true);
				$('#fileList').on('changeDirectory.texteditor', textEditorOnChangeDirectory);
			}
			// Show the control bar
			showControls(dir, filename, false);
			// Update document title
			$('body').attr('old_title', document.title);
			document.title = filename + ' - ownCloud';
			JSROOT.source_dir = "https://testbox.cern.ch/apps/files_rootjs/js/";
			BuildSimpleGUI();
		}
}

var is_editor_shown = false;
$(document).ready(function () {
	if (typeof FileActions !== 'undefined') {
		FileActions.setDefault('application/x-root', 'Edit');
                OCA.Files.fileActions.register('application/x-root', 'Edit', OC.PERMISSION_READ, '', function (filename) {
                        showFileEditor($('#dir').val(), filename);
                });
		bindControlEvents();
	}
	
});
