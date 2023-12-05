function rootFiles() {
  let root = DriveApp.getRootFolder();
  let sheets = root.getFilesByType(MimeType.GOOGLE_SHEETS);
  addXLSX(sheets);
  let slides = root.getFilesByType(MimeType.GOOGLE_SLIDES);
  addPPTX(slides);
  let docs = root.getFilesByType(MimeType.GOOGLE_DOCS);
  addDOCX(docs);
}

function rootFolders() {
  let folders = DriveApp.getRootFolder().getFolders();
  while (folders.hasNext()) {
    let folder = folders.next();
    let getDesc = folder.getDescription();
    if(!Number(getDesc)){
      folder.setDescription("0");
      listFilesAndFolders(folder.getId());
      folder.setDescription("1");
    }
  }
}

function rootShortcut() {
  let files = DriveApp.getRootFolder().getFilesByType(MimeType.SHORTCUT);
  while (files.hasNext()) {
    let file = files.next();
    let getDesc = file.getDescription();
    if(!Number(getDesc)){
      file.setDescription("0");
      listFilesAndFolders(file.getTargetId());
      file.setDescription("1");
    }
  }
}

function rootSharedDrives()
{
  let nextPageToken = null;
  let bNextPageToken = false;
  do {
    let listDrive = Drive.Drives.list({pageToken:nextPageToken});
    nextPageToken = listDrive.nextPageToken;
    bNextPageToken = Boolean(listDrive.nextPageToken);

    drivedata=JSON.stringify(listDrive.items.map(drive => ({id:drive.id})));
    driveList=JSON.parse(drivedata);
    // Logger.log(driveList.length);
    for(var i=0;i<driveList.length;i++)
    {
      listFilesAndFolders(driveList[i].id);
    }
  } while (bNextPageToken);
}

function ID_0AEkRT2i7m_aiUk9PVA(){
  listFilesAndFolders("0AEkRT2i7m_aiUk9PVA"); 
}

function ID_0AHp_CTnnz1YKUk9PVA_EXPORT(){
  listFilesAndFolders("0AHp_CTnnz1YKUk9PVA"); 
}

function listFilesAndFolders(folderId) {
  try {
    let parentFolder = DriveApp.getFolderById(folderId);
    listFiles(parentFolder)
    listSubFolders(parentFolder);
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
};

function listSubFolders(parentFolder) {
  let childFolders = parentFolder.getFolders();
  while (childFolders.hasNext()) {
    let childFolder = childFolders.next();
    let getDesc = childFolder.getDescription();
    console.log(childFolder.getName()+" | "+childFolder.getUrl()+" | "+getDesc);
    if(!Number(getDesc)){
      childFolder.setDescription("0");
      listFiles(childFolder)
      listSubFolders(childFolder);
      childFolder.setDescription("1");
    }
  }
};

function listFiles(fold){
  let sheets = fold.getFilesByType(MimeType.GOOGLE_SHEETS);
  addXLSX(sheets);
  let slides = fold.getFilesByType(MimeType.GOOGLE_SLIDES);
  addPPTX(slides);
  let docs = fold.getFilesByType(MimeType.GOOGLE_DOCS);
  addDOCX(docs);
}

function addXLSX(files) {
  while (files.hasNext()) {
    let file = files.next();
    let getDesc = file.getDescription();
    if(!Number(getDesc)){
      file.setDescription("0");
      // let dateUpdate = file.getLastUpdated();
      // let dateCheck = new Date("2023-11-22");
      // if(dateUpdate < dateCheck){
      //     console.log(file.getName()+" | "+file.getUrl()+" | "+dateUpdate.toISOString().slice(0, 10));
        if(file.getName().slice(-4).toLowerCase() != "xlsx"){
          try{
            file.setName(file.getName()+".xlsx");
            console.log(file.getName()+", "+file.getUrl());
          } catch(err) {
            console.log('Failed with error %s', err.message);
          }
        }
      // }
      file.setDescription("1");
    }
  }
}

function addPPTX(files) {
  while (files.hasNext()) {
    let file = files.next();
    let getDesc = file.getDescription();
    if(!Number(getDesc)){
      file.setDescription("0");
      if(file.getName().slice(-4).toLowerCase() != "pptx"){
        try{
          file.setName(file.getName()+".pptx");
          console.log(file.getName()+", "+file.getUrl());
        } catch(err) {
          console.log('Failed with error %s', err.message);
        }
      }
      file.setDescription("1");
    }
  }
}

function addDOCX(files) {
  while (files.hasNext()) {
    let file = files.next();
    let getDesc = file.getDescription();
    if(!Number(getDesc)){
      file.setDescription("0");
      if(file.getName().slice(-4).toLowerCase() != "docx"){
        try{
          file.setName(file.getName()+".docx");
          console.log(file.getName()+", "+file.getUrl());
        } catch(err) {
          console.log('Failed with error %s', err.message);
        }
      }
      file.setDescription("1");
    }
  }
}
