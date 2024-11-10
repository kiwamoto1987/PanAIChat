import React, { useState } from "react";

const LoginPage: React.FC = function() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async function() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        // temporarily
        localStorage.setItem("token", data.token);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (e) {
      if (e instanceof(Error)) {
        setError(e.message);
      } else {
        setError("unexpected error occured.");
        console.error(e);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2 >Login</h2>
      <div>{error}</div>
      <div>
        <label>Username or Email</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}

export default LoginPage;
