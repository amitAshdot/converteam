<?

$recepient = "amitashdot@gmail.com,"; 
// $recepient = "eyalivne@gmail.com,micha@targetcall.co.il,"; 
// $recepient = "amitashdot@gmail.com"; 

$text_1 = trim($_POST["name"]);
$text_2 = trim($_POST["phone"]);
$text_3 = trim($_POST["email"]);
$text_4 = trim($_POST["buss"]);
$text_5 = trim($_POST["area"]);

$text_3 = trim($_POST["utm_campaign"]);
$text_4 = trim($_POST["keywordBottom"]);

$message = " \n ליד חדש מקמפיין סלולר - מקאן \n
שם: $text_1 \n
טלפון: $text_2\n
אימייל: $text_3 \n
תחום: $text_3 \n
איזור: $text_3 \n

קמפיין: $text_3 \n
מילת מפתח : $text_4\n
";

$pagetitle = "פניה חדשה - converteam";
$headers = "From: https://converteam.co.il/ \r\nContent-type: text/plain; charset=utf8 \r\n";
$from = "https://converteam.co.il/";
 if ( mail($recepient, $pagetitle, $message, $headers,$from)) {
      echo("Email successfully sent to $to_email... $recepient");
    } else {
      echo("Email sending failed...");
    }
?>
