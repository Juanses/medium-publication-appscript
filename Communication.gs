function SendSlack(from,to,message) {
   to = conversion(to);
   var payload =
      {
        "from" : from,
        "to" : to,
        "message" : message
      };
  
  var options =
      {
        "method"  : "POST",
        "payload" : payload,   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
  
  var result = UrlFetchApp.fetch("https://hook.integromat.com/zuh2lr2vixccnwrbitzomt0bie4wz7fy", options);
}

function SendtoMedium(text) {
   var payload =
      {
        "message" : text
      };
  
  var options =
      {
        "method"  : "POST",
        "payload" : payload,   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
  
  var result = UrlFetchApp.fetch("https://hook.integromat.com/rpj3sa5o8hejm5qqk5vivl58css9467v", options);
}

function conversion (input){
  var output;
  switch(input){
    case "Juan":
      output = "D624851FV";
      break;
      case "David":
      output = "D61GLEPU0";
      break;
      case "Javier":
      output = "D624851TM";
      break;
  }
  return output
}
