import { useState } from "react";
import $ from "jquery";

export const LoginForm = () => {
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [result, setResult] = useState(null);

  const HandleLoginForm = (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!email || !password) {
      setResult({ status: "error", message: "Please fill in all fields." });
      return;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost/react/login.php", // Backend PHP URL
      data: { email, password },
      success: (response) => {
        // JSON.parse not needed, response is already JSON
        setResult(response);
        window.location.href = "https://github.com/";
      },
      error: (xhr, status, error) => {
        console.error("AJAX Error:", error);
        setResult({ status: "error", message: "Failed to connect to server. Please try again later." });
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "35vh",
      }}
    >
      <form onSubmit={HandleLoginForm}>
        <h2>Login Form</h2>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <input className="button" type="submit" value="Login" />
        <br />
        <br />
        {result && (
          <div>
            {result.status === "error" ? (
              <p style={{ color: "red" }}>{result.message}</p>
            ) : (
              <h2 style={{ color: "green" }}>{result.message}</h2>
            )}
          </div>
        )}
      </form>
    </div>
  );
};
