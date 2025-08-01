import { useState } from "react";
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { auth } from "./FirebaseConfig";

export default function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Set display name AFTER user creation
      await updateProfile(user, {
        displayName: displayName
      });

      alert(`Signup successful! Welcome, ${user.displayName}`);
    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="col-lg-5 col-12 mx-auto" id="section_4">
      <h4 className="mb-4 pb-lg-2">Please join us!</h4>

      <form
        onSubmit={handleSignup}
        className="custom-form membership-form shadow-lg"
        role="form"
      >
        <h4 className="text-white mb-4">Become a member</h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-floating mb-3">
          <input
            type="text"
            name="full-name"
            id="full-name"
            className="form-control"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label htmlFor="full-name">Full Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email address</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="message"
            name="message"
            placeholder="Describe message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label htmlFor="message">Comments</label>
        </div>

        <button type="submit" className="form-control">
          Submit
        </button>
      </form>
    </div>
  );
}
