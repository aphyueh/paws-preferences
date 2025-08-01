import React, { useState } from "react";
import { auth } from "./components/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function FirebaseTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup successful:", userCredential.user);
      alert("Signup success");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Test Firebase Signup</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
