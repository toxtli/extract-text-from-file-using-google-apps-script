function doGet(e) {
  if (e.parameters.url != undefined && e.parameters.url != "") {
    var blob = UrlFetchApp.fetch(e.parameters.url).getBlob();
    var text = getText(blob);
    return ContentService.createTextOutput(text);
  } else {
    return ContentService.createTextOutput("Request error");
  }
}

function doPost(e) {
  if (e.parameters.filename && e.parameters.file) {
    var data = Utilities.base64Decode(e.parameters.file, Utilities.Charset.UTF_8);
    var blob = Utilities.newBlob(data, e.parameters.mimeType, e.parameters.filename);
    var text = getText(blob);
    return ContentService.createTextOutput(result);
  } else {
    return ContentService.createTextOutput("Request error");
  }
}

function getText(blob) {
    var resource = {
      title: blob.getName(),
      mimeType: blob.getContentType()
    };
    var file = Drive.Files.insert(resource, blob, {ocr: true});
    var doc = DocumentApp.openById(file.id);
    var text = doc.getBody().getText();
    Drive.Files.remove(file.id);
    return text;
}