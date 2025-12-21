const { data, error } = await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: window.location.origin,
  },
});

console.log({ data, error });




