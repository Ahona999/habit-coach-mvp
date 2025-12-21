import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Login } from "./Login";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); 
  // idle | loading | error | success
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!email || !validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    } else {
      setStatus("success");
    }
  };

  return (
    <Login
   email={email}
   onEmailChange={setEmail}
   status={status}
   errorMessage={errorMessage}
   onSubmit={handleLogin}
 />
 );
}

