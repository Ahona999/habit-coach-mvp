<Routes>
  <Route path="/" element={<Auth />} />

  <Route
    path="/onboarding"
    element={session ? <Onboarding /> : <Navigate to="/" replace />}
  />

  <Route
    path="/dashboard"
    element={session ? <Dashboard /> : <Navigate to="/" replace />}
  />

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>

