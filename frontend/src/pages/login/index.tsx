import { useState } from "react";

export function LoginPage() {
  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  });
  const { email, password } = loginState;

  function loginHandle(e) {
    setLoginState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("/api/auth/register", {
            body: JSON.stringify(loginState),
            headers: {
              "Content-Type": "application/json"
            }
          });
        }}
      >
        <div>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={loginHandle}
            value={email}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={loginHandle}
            value={password}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
