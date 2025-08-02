import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useHead } from '@unhead/react'
import { useCallback, useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import z4 from 'zod/v4'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Separator } from '@/components/separator'
import { AuthService } from '@/services/pizza-shop/auth.service'

const signUpFormSchema = z4.object({
  restaurantName: z4.string().nonempty('Nome do restaurante é obrigatório.'),
  managerName: z4.string().nonempty('Nome do administrador é obrigatório.'),
  phone: z4.string(),
  email: z4.email('Email é obrigatório.'),
})

type SignUpForm = z4.infer<typeof signUpFormSchema>

export function SignUpPage() {
  useHead({
    title: 'Sign Up',
  })

  const { mutateAsync: signUp } = useMutation({
    mutationFn: AuthService.signUp,
  })

  const navigate = useNavigate()

  const signUpForm = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  })

  const handleRegister = useCallback<SubmitHandler<SignUpForm>>(
    async ({ email, managerName, restaurantName, phone }) => {
      await toast
        .promise(
          signUp({
            email,
            managerName,
            restaurantName,
            phone,
          }),
          {
            loading: 'Aguarde, registrando seu restaurante...',
            success: {
              message: 'Restaurante registrado com sucesso!',
              action: {
                label: 'Realizar login',
                onClick() {
                  navigate(
                    '/sign-in?' + new URLSearchParams({ email }).toString(),
                  )
                },
              },
            },
            error(error) {
              return {
                message: error.message,
                action: {
                  label: 'Tentar novamente',
                  onClick() {
                    handleRegister({
                      email,
                      managerName,
                      restaurantName,
                      phone,
                    })
                  },
                },
              }
            },
          },
        )
        .unwrap()
    },
    [navigate, signUp],
  )

  useEffect(() => {
    if (signUpForm.formState.errors) {
      Object.entries(signUpForm.formState.errors).forEach(([, error]) => {
        toast.error(error.message)
      })
    }
  }, [signUpForm.formState.errors])

  return (
    <div className="grid h-full place-items-center p-5">
      <div className="flex h-full w-sm flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-muted-foreground text-sm">
            Crie uma conta hoje mesmo e dispare suas vendas!
          </p>
        </div>

        <form
          className="flex w-full flex-col gap-4"
          onSubmit={signUpForm.handleSubmit(handleRegister)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="restaurantName">Seu Estabelecimento</Label>
            <Input
              placeholder="Pizza Show"
              id="restaurantName"
              type="text"
              {...signUpForm.register('restaurantName')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input
              placeholder="Nome do profissional"
              id="managerName"
              type="text"
              {...signUpForm.register('managerName')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Seu Telefone</Label>
            <Input
              placeholder="(00) 0000-0000"
              id="phone"
              type="tel"
              {...signUpForm.register('phone')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Seu email</Label>
            <Input
              placeholder="example@email.com"
              id="email"
              type="email"
              {...signUpForm.register('email')}
            />
          </div>

          <Button type="submit" disabled={signUpForm.formState.isSubmitting}>
            Finalizar cadastro
          </Button>
        </form>

        <Separator label="ou" />

        <Button asChild variant="outline">
          <Link to="/sign-in">Acesse o painel</Link>
        </Button>
      </div>
    </div>
  )
}
