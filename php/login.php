<?php
session_start();
$username = $_POST['username'];
$password = $_POST['password'];

// DB에서 사용자 정보 확인 (예제 코드)
if ($username == "test" && $password == "1234") {  
    $_SESSION['user'] = $username;
    header("Location: index.html"); // 로그인 성공 시 메인 페이지로 이동
} else {
    echo "ログイン失敗！";
}
?>
