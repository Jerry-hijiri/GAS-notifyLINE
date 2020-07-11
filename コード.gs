function sendToLine(text){
  var token = 'JD7zMl60LQN0ONmQ6m98zR011abnYnf1ULQE0D9FaEk';
  var options ={
     "method"  : "post",
     "payload" : "message=" + "\n\n" + "聖様、明日の午後の予定は以下の通りでございます" + "\n\n" + "ご確認くださいませ" + "\n\n" + text,
     "headers" : {"Authorization" : "Bearer "+ token}
   };

   UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);
}

function main() {
  var calendars = CalendarApp.getAllCalendars();
  Logger.log(calendars);
  var calendar = calendars[1]; //自分のカレンダー取得
  Logger.log(calendar);
  var text = ""; //送信メッセージ初期化
  var now = new Date();
  var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); //明日の日付
  Logger.log(date);
  var events = calendar.getEventsForDay(date);  //明日の予定取得
  Logger.log(events);
  
  for(j in events) { //予定を1個ずつ見ていく
    var event = events[j]; //ｊ番目の予定を取得
    var title = event.getTitle(); //予定のタイトル
    var start = toTime(event.getStartTime()); //開始時刻取得
    var end = toTime(event.getEndTime()); //終了時刻取得
    var at = event.getLocation() //開催場所
    Logger.log(title);
    //メッセージに追加
    text += "\n" + (Number(j) + 1) +". " +title+"\n" +start + ' - ' + end  ;
    
    if (at !=""){
      text += " @" + at;     //場所があれば追加
    }
  }
  if(text ==""){//予定がなかったとき
   text += "\n明日の予定はありません"; 
  }
  sendToLine(text);
}
//時刻のフォーマット変換
function toTime(str){   
  return Utilities.formatDate(str, 'JST', 'HH:mm');
}