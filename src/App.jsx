import React, { Suspense } from 'react'
import AppRoutes from './routes/AppRoutes'
import Loading from './components/Loading'
import "./app.css"
const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AppRoutes />
    </Suspense>
  )
}

export default App
