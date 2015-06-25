function rootjsShowControls(dir, filename, writeable) {
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

function rootjsBindControlEvents() {
	$('#content').on('click', '#simpleGUI_close', rootjsHideFileEditor);
}

// returns true or false if the editor is in view or not
function rootjsEditorIsShown() {
	return is_editor_shown;
}

// Fades out the editor.
function rootjsHideFileEditor() {
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
function rootjstextEditorOnChangeDirectory(ev){
	// if the directory is changed, it is usually due to browser back
	// navigation. In this case, simply close the editor
	rootjsHideFileEditor();
}

// Loads the file editor. Accepts two parameters, dir and filename.
function rootjsShowFileEditor(dir, filename) {

		// Before trying to open the root file, we check that the size is OK until we get Byte-Range support
		var sizeURL = OC.filePath('files_rootjs', 'ajax', 'canbeopen.php') + "?file=" + filename + "&dir=" + dir;
                if ($('#isPublic').val()){
	                sizeURL = window.location.pathname + '/download?path=' + dir + '&files=' + filename;
                }
		$.get(sizeURL)
		.done(function(result){
			if (result.status === 'success') {
				if (!rootjsEditorIsShown()) {
					is_editor_shown = true;
					// Delete any old editors
					if ($('#notification').data('reopeneditor')) {
						OC.Notification.hide();
					}
					$('#simpleGUI').remove();
					// Loads the file editor and display it.
					

					$('#content').append('<div id="files_rootjs_container"><div id="simpleGUI"></div></div>');
					//var fileURL = fileDownloadPath(dir, filename);
					var fileURL = OC.filePath('files_rootjs', 'ajax', 'loadfile.php') + "?file=" + filename + "&dir=" + dir
					if ($('#isPublic').val()){
						fileURL = window.location.pathname + '/download?path=' + dir + '&files=' + filename;
					}
					$('#simpleGUI').attr('files', fileURL);

					// Initialise the editor
					if (window.FileList){
						FileList.setViewerMode(true);
						$('#fileList').on('changeDirectory.texteditor', rootjstextEditorOnChangeDirectory);
					}
					// Show the control bar
					rootjsShowControls(dir, filename, false);
					// Update document title
					$('body').attr('old_title', document.title);
					document.title = filename + ' - ownCloud';
					JSROOT.source_dir = window.location.origin + window.oc_webroot + "/apps/files_rootjs/js/";
					BuildSimpleGUI();

					// Adapt interface to make it simple
					$("#simpleGUI #urlToLoad").val(fileURL);
					$("#simpleGUI #urlToLoad").hide();
					$("#simpleGUI select[name='s']").hide();
					
					var layout = $("#simpleGUI #layout");
					var loadButton = $("#simpleGUI input[value='Load']");
					var resetButton = $("#simpleGUI input[value='Reset']");
					var buttonGroup = loadButton.parent();
					var form = $("simpleGUI form");
					var banner = "<p style='position:absolute; bottom: 0px;font-size:10px;'>This viewer is based on the <a href='http://root.cern.ch'><b>ROOT</b></a> data analysis framework developed at CERN.<br/> If you have questions or issues please refer to <a href='https://root.cern.ch/drupal/content/support'><b>ROOT Support page</b></a><br/>Integration done by <a href='https://cernbox.cern.ch'><b>CERNBOX</b></a> team</p>";
					var left = $("#simpleGUI #left-div");
					var right = $("#simpleGUI #right-div");
						
					left.append(banner);
					loadButton.hide();
					resetButton.hide();
					loadButton.click();
					layout.attr("style", "");
					$("#simpleGUI #left-div>h1").hide();
					$("#simpleGUI #left-div>p").hide();
					$("#simpleGUI #left-div form>p").hide();
					left.append(banner);
					left.css({border:"0px", "background-color":"white"});
					right.css({border:"0px", "background-color":"white"});

					var reloadButton = $('<input type="button" id="reload" value="Reload with selected layout">');
					buttonGroup.append(reloadButton);
					reloadButton.on('click', function(e) {
						resetButton.click();
						loadButton.click()
					});			

				}

			} else {
				OC.dialogs.alert(result.data.message, t('files_texteditor', 'An error occurred!'));
			}
		})



	
}

var is_editor_shown = false;
$(document).ready(function () {
	if (typeof FileActions !== 'undefined') {
		FileActions.setDefault('application/x-root', 'Edit');
                OCA.Files.fileActions.register('application/x-root', 'Edit', OC.PERMISSION_READ, '', function (filename) {
                        rootjsShowFileEditor($('#dir').val(), filename);
                });
		rootjsBindControlEvents();
	}
	
});
