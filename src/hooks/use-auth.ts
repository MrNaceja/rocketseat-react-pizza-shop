import { useMutation } from '@tanstack/react-query'

import { AuthService } from '@/services/pizza-shop/auth.service'

export function useAuth() {
  const { mutateAsync: signIn } = useMutation({
    mutationFn: AuthService.signIn,
  })

  const { mutateAsync: signUp } = useMutation({
    mutationFn: AuthService.signUp,
  })

  const { mutateAsync: signOut } = useMutation({
    mutationFn: AuthService.signOut,
  })

  return {
    signIn,
    signUp,
    signOut,
  }
}
