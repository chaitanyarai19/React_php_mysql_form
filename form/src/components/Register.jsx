import { useState } from "react";
import $ from "jquery";
import "./form.css";

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
        height: "70vh",
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
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <input className="button" type="submit" value="Register" />
        <br />
        <br />
        {result && (
          <div>
            {result.status === "error" ? (
              <p style={{ color: "red" }}>{result.message}</p>
            ) : (
              <>
              <h2 style={{ color: "green" }}>{result.message}</h2>
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
