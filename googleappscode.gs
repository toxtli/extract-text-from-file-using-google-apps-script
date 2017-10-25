
function doPost(e) {
  var result = {};
  if (!e.parameters.filename || !e.parameters.file) {
    result = "";
  } else {
    var fileData = {
      title: e.parameters.filename,
      mimeType: e.parameters.mimeType
    };
    var data = Utilities.base64Decode(e.parameters.file, Utilities.Charset.UTF_8);
    var blob = Utilities.newBlob(data, fileData.mimeType, fileData.filename);
    var file = Drive.Files.insert(fileData, blob, {ocr: true});
    result = DocumentApp.openById(file.id).getBody().getText();
  }
  return ContentService.createTextOutput(result);
}