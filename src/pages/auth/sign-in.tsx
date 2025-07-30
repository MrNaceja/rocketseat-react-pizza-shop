import { zodResolver } from '@hookform/resolvers/zod'
import { useHead } from '@unhead/react'
import { useCallback } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import z4 from 'zod/v4'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInFormSchema = z4.object({
  email: z4.email('Email é obrigatório.'),
})

type SignInForm = z4.infer<typeof signInFormSchema>

export function SignInPage() {
  useHead({
    title: 'Sign In',
  })

  const signInForm = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
  })

  const handleAccessPainel = useCallback<SubmitHandler<SignInForm>>(
    async ({ email }) => {
      toast.success(`Link mágico enviado para ${email}.`)
    },
    [],
  )

  return (
    <div className="grid h-full place-items-center p-5">
      <div className="flex h-full w-sm flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            Acessar Painel
          </h1>
          <p className="text-muted-foreground text-sm">
            Acompanhe suas vendas pelo painel do parceiro!
          </p>
        </div>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={signInForm.handleSubmit(handleAccessPainel)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Seu email</Label>
            <Input
              placeholder="example@email.com"
              id="email"
              type="email"
              {...signInForm.register('email')}
            />
          </div>

          <Button type="submit" disabled={signInForm.formState.isSubmitting}>
            Acessar Painel
          </Button>
        </form>

        <span className="before:bg-border relative grid w-full place-items-center before:absolute before:top-1/2 before:-z-[1] before:h-[1px] before:w-full">
          <span className="text-muted-foreground bg-background px-2">ou</span>
        </span>

        <Button asChild variant="outline">
          <Link to="/sign-up">Criar conta grátis</Link>
        </Button>
      </div>
    </div>
  )
}
