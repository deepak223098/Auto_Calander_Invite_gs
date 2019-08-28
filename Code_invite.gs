function simpleSheetsToCalendar() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Master_Features_Status_List');
  var last_row = ss.getLastRow();
  var data = ss.getRange("A2:Z"+ last_row).getValues();
  var row = 1;
  var us_oversight = 'abc.com' //list of the email address
  
  function weekdayornot(weekday)
  {
    //Logger.log("in the weekdayornot function");
    if(weekday == 0 || weekday == 6)
         {
           return 1;//Logger.log("Yes its a Holiday");
         }
         else
         {
           return 0;//Logger.log("No its not a Holiday");
         }
  }
  
  for (var i=0; i<data.length;i++)
       {
         var mf = data[i][3];//Engineering Dbug
         var jama_reveiw_id = data[i][15];//REV-XXXX
         var review_status = data[i][16];//In Review
         var fl = data[i][20];//0 means it will send calander invite
         var sub = "AW609: L2 Validation Review | "+ mf +" | "+ jama_reveiw_id
         //Logger.log("gawgagwa "+jama_reveiw_id)
         //Logger.log("sub "+sub)
         row++;
         var date = new Date();
         var mon = Utilities.formatDate(date, Session.getScriptTimeZone(), "MMMM");// April
         //var formattedDate = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
         var day = Utilities.formatDate(new Date(), "GMT", "dd");
         var year = Utilities.formatDate(new Date(), "GMT", "yyyy");
         var d= mon+' '+day+', '+year
         //var d1 = mon+' '+day+2+', '+year
         var t = new Date(d+' 11:00:00 CST')
         //var startTime = new Date('January 20, 2016 20:00:00 UTC')
         //var endTime = new Date('January 20, 2016 21:00:00 UTC');
         var new_date = new Date(t.getTime() + 48 * 60 * 60 * 1000);
         var weekday = new_date.getDay();
         //Logger.log('gwagwa '+weekday)
         //var gh = weekdayornot(weekday);
         //Logger.log("newwwwdate  "+gh);
         if (fl == "0" && review_status == 'In Review')
         {
           
           Logger.log("Fl           ->"+fl);
           Logger.log("review_status->"+review_status);
           var sat_sun = weekdayornot(weekday)
           if (sat_sun == 0)
           {
             var da = Utilities.formatDate(new_date,"GMT", "MMMM dd,yyyy")
             var event = CalendarApp.getDefaultCalendar().createEvent(sub, new Date(da+' 11:00:00 CST'), new Date(da+' 14:00:00 CST'),
                        {//location: 'The Moon',
                         guests: us_oversight,
                          sendInvites: true//"deepak.gupta@rockwellcollins.com"//us_oversight
                          });
           Logger.log('Event ID: ' + event.getId());
           
           }
           else
           {
             var new_next_date = new Date(new_date.getTime() + 48 * 60 * 60 * 1000);
             Logger.log("new_next_date "+new_next_date)
             var da1 = Utilities.formatDate(new_next_date,"GMT", "MMMM dd,yyyy")
             var event = CalendarApp.getDefaultCalendar().createEvent(sub, new Date(da1+' 11:00:00 CST'), new Date(da1+' 14:00:00 CST'),
                        {//location: 'The Moon',
                         guests: us_oversight,
                          sendInvites: true//"deepak.gupta@rockwellcollins.com"//us_oversight
                          });
             Logger.log('Event ID: ' + event.getId());
             Logger.log("new_next_date ",new_next_date)
           }
           ss.getRange("U"+row).setValue("1")
           ss.getRange("V"+row).setValue("calander invite sent")
         }
         //else
        // {
         //  Logger.log("No New Review are There for US over sight");
           
       //  }
       }
}
