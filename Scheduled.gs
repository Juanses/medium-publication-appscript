function onOpen() {
 var menu = SpreadsheetApp.getUi().createMenu('Menu')
 
 menu.addItem('Launch script', 'myFunction')
 .addToUi(); 
}

function myFunction() {
  var sheet = 0;
  var spreadsheet = SpreadsheetApp.openById("1gCWoCcfKG39uVnyWC7cNVXvCJkZzD7QUwpQTAfQtRD0").getSheets()[sheet];  
  var cols = ["author","docid","url","title","subject","remaining","publicationdate","status","link","medium"];
  var startrow = 2;
  var values = getallvalues(spreadsheet,startrow,1,cols.length+1);
  for (var i = startrow; i < values.length; i++){
    Logger.log(i);
    rowdata = getvaluesfromrow(values,startrow,i,cols);
    Logger.log(rowdata);
    if (rowdata.docid != ""){
      docdata = docs(rowdata.docid);
      spreadsheet.getRange(i,get_colnumber_fromname(cols,"title")).setValue(docdata.title);
      if (rowdata.link == ""){
        spreadsheet.getRange(i,get_colnumber_fromname(cols,"url")).setFormula('=HYPERLINK("'+docdata.url+'";"URL")');
        spreadsheet.getRange(i,get_colnumber_fromname(cols,"link")).setValue('1');
      }
    }
    if (rowdata.medium == "" && rowdata.status == "Draft on Medium"){
      spreadsheet.getRange(i,get_colnumber_fromname(cols,"medium")).setValue(1);
      SendtoMedium(docdata.body);
      SendSlack("Bot","Juan","🗣 Alguien envio un draft a Medium");
    }
    
    if (rowdata.author != "" && parseInt(rowdata.remaining) == -3 && rowdata.status != "Published"){
      SendSlack("Bot",rowdata.author,"🚨 Solo quedan 3 dias para hacer el paper !!!");
    }
    
    if (rowdata.author != "" && parseInt(rowdata.remaining) == -7 && rowdata.status != "Published"){
      SendSlack("Bot",rowdata.author,"⚠️ ️Quedan 7 dias para hacer el paper");
    }
    
    if (rowdata.author != "" && parseInt(rowdata.remaining) == -10 && rowdata.status != "Published"){
      SendSlack("Bot",rowdata.author,"📅️ ️Quedan 7 dias para hacer el paper");
    }
    
  }
}

function docs(id) {
  var doc = DocumentApp.openById(id);
  var response = {};
  response.title = doc.getName();
  response.body = doc.getBody().getText();
  response.url = doc.getUrl();
  return response
}