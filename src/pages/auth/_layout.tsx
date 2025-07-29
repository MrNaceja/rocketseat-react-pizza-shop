import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div>
      <h1>Layout Auth</h1>
      <Outlet />
    </div>
  )
}
