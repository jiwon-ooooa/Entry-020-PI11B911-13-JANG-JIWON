<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 이메일 수신자 (본인 이메일로 수정)
    $to = "your-email@example.com"; 
    $subject = "Contact Form Inquiry";
    
    // 폼 데이터 가져오기 (각 변수에 값이 있는지 확인)
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';
    
    // 이메일 본문 구성
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: noreply@yourdomain.com"; // 발신자 주소 (도메인에 맞게 수정)
    
    // 메일 전송
    if (mail($to, $subject, $body, $headers)) {
        echo "success"; // 성공 시 응답 (AJAX로 받을 수 있음)
    } else {
        echo "fail";    // 실패 시 응답
    }
}
?>
