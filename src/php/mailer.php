<?php


/* Your e-mail for inbox messages */
$myemail = "webnotepad@yandex.ru";


$name = check_input($_POST['p-name'], "Введите ваше имя");
$subject = check_input($_POST['p-subject'], "Введите тему письма");
$email = check_input($_POST['p-email']);
$message = check_input($_POST['p-message'], "Введите ваш сообщение");
$headers = 'Content-type: text/html; charset=utf-8' . "\r\n";

if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email))
{
show_error("Некореектный адрес эл. почты");
}

$msg = 'Name: '.$name."<br>"; 
$msg .= 'E-mail: '.$email."<br>"; 
$msg .= $message;


mail($myemail, $subject, $msg, $headers);
header('Location: send.html');
exit();


function check_input($data, $problem='')
{
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
if ($problem && strlen($data) == 0)
{
show_error($problem);
}
return $data;
}

function show_error($myError)
{
?>
<html>
<body>

<p>Исправте поля в которых была совершена ошибка:</p>
<strong><?php echo $myError; ?></strong>
<p>И повторно нажимите на кнопку отправить. Спасибо!</p>

</body>
</html>
<?php
exit();
}
?>