import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import "./index.css"

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}




  
