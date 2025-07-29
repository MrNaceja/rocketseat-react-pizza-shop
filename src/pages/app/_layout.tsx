import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div>
      <h1>Layout App</h1>
      <Outlet />
    </div>
  )
}
