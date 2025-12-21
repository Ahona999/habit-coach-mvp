import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Login } from "./Login";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); 
  // idle | loading | error | success
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) return;

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
      setEmail={setEmail}
      status={status}
      errorMessage={errorMessage}
      onSubmit={handleLogin}
    />
  );
}
