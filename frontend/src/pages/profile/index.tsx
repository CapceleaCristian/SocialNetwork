import { useEffect, useState } from "react";

export function ProfilePage() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/api/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((json) => setUserData(json));
  }, []);

  return (
    <div>
      <div>profile here</div>
      <div>{JSON.stringify(userData, null, 4)}</div>
    </div>
  );
}
