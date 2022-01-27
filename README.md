# Express Circuit Breaker

**Circuit Beaker** befungsi ketika anda memiliki sebuah aplikasi yang menggunakan `architecture microservice` katakanlah seperti itu, ketika service anda mati atau crash, maka `circuit breaker` akan meghentikan request ke service yang mati tersebut secara otomatis, dan akan melemparkan fallback dari service yang mati tersebut, nanti ketika service yang mati tersebut menyala kembali, lalu `ciruit breaker` akan memberitahukan kepada service yang lain bahwa status service yang sedang mati tersebut sudah `halfOpen` (bisa melakukan request kembali).
