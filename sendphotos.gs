function main() {
  const folderID = "";
  const phoneNumbers = [];

  const photo = getPhotoFromGoogleDrive(folderID);

  phoneNumbers.forEach(number => 
  {
    MailApp.sendEmail(number, "Goat of the Week", "", 
      {
        htmlBody: "<img src='cid:nlFlag'/>",
        inlineImages: {nlFlag: photo.getBlob()}
      });
  });
}

function getWeekOfYear(){
  Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  }

  return new Date().getWeek();
}

function getPhotoFromGoogleDrive(folderID){
  const week = getWeekOfYear();
  const files = DriveApp.getFolderById(folderID).getFiles();
  let file;

  for(let k = 0; k < week; k++){
    file = files.next();
  }

  return file;
}
