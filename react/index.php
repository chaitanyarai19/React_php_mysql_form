<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
// DB connection settings
$servername = "localhost";
$username = "root"; // Change to your MySQL username
$password = ""; // Change to your MySQL password
$dbname = "test"; // Change to your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

// Hash the password before saving it
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert data into the database
$sql = "INSERT INTO user (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    // Return a success response
    echo json_encode(["status" => "success", "message" => "Registration successful!","name" => $name,"email" => $email,"password" => $password]);
} else {
    // Return an error response
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

// Close the connection
$conn->close();
?>
