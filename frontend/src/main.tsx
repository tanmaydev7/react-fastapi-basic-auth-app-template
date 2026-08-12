import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { bootstrapAuth } from "@/lib/authApi"
import App from "./App.tsx"
import "./index.css"

function Root() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    void bootstrapAuth().finally(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas text-sm text-text-muted">
        Loading…
      </div>
    )
  }

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Root />
)
