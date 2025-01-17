import { useState } from "react";
import $ from "jquery";

export const RegForm = () => {
  // Define states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  // Handle form submission
  const handleRegisterForm = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = { name, email, password };

    // Use $.ajax to send the form data
    $.ajax({
      type: "POST",
      url: "http://localhost/react/", // Replace with your backend URL
      data: formData, // Send form data as an object
      
      success: (response) => {
        // Assume the response is JSON
        const parsedData = JSON.parse(response); // Parse response if needed
        setResult(parsedData); // Update result with response
      },
      error: (error) => {
        console.error("Error:", error);
        setResult({ error: "Submission failed. Please try again." });
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form method="post" onSubmit={handleRegisterForm}>
        <h2>Registration Form</h2>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
        <br />
        <br />
        {result && (
          <div>
            <h2>Form Data {result.message}</h2>
            {result.error ? (
              <p style={{ color: "red" }}>{result.error}</p>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {result.name}
                </p>
                <p>
                  <strong>Email:</strong> {result.email}
                </p>
                <p>
                  <strong>Password:</strong> {result.password}
                </p>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};
