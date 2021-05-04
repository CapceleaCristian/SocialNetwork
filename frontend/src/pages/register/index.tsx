import { useState } from "react";
import { useAuthContext } from "../../context/authContext";

export function RegisterPage() {
  const { setIsAuth } = useAuthContext();
  const [registerState, setRegisterState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });
  const { firstname, lastname, email, password } = registerState;

  function registerHandle(e) {
    setRegisterState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(registerState),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then(({ token }) => {
        localStorage.setItem("token", token);
        setIsAuth(Boolean(token));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="firstname"
            placeholder="firstname"
            onChange={registerHandle}
            value={firstname}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            placeholder="lastname"
            onChange={registerHandle}
            value={lastname}
          />
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={registerHandle}
            value={email}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={registerHandle}
            value={password}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
