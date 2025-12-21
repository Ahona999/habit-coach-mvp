await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: window.location.origin,
  },
});




