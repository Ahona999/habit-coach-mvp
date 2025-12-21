await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: import.meta.env.VITE_SITE_URL,
  },
});

console.log("OTP sent to:", email);
