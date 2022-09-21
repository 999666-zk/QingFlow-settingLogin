if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = 'http://news.baidu.com/';
} else {
    window.location.href = 'http://localhost:8080/';
}
