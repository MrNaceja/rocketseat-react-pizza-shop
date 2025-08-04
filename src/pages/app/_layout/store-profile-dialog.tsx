import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type PropsWithChildren, useCallback } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z4 from 'zod/v4'

import { Button } from '@/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Textarea } from '@/components/textarea'
import {
  RESTAURANT_PROFILE_QUERY_KEY,
  useRestaurantProfile,
} from '@/hooks/use-restaurant-profile'
import { RestaurantService } from '@/services/pizza-shop/restaurant.service'

const restaurantProfileFormSchema = z4.object({
  name: z4.string(),
  description: z4.string().optional(),
})

type RestaurantProfileFormData = z4.infer<typeof restaurantProfileFormSchema>

export function RestaurantProfileDialog({ children }: PropsWithChildren) {
  const queryClient = useQueryClient()
  const { profile } = useRestaurantProfile()

  const restaurantProfileForm = useForm<RestaurantProfileFormData>({
    resolver: zodResolver(restaurantProfileFormSchema),
    values: {
      name: profile?.name || '',
      description: profile?.description || '',
    },
  })

  const updateRestaurantProfileCache = useCallback(
    ({ name, description }: RestaurantProfileFormData) => {
      const restaurantProfileCached =
        queryClient.getQueryData<RestaurantProfile>(
          RESTAURANT_PROFILE_QUERY_KEY,
        )

      if (restaurantProfileCached) {
        queryClient.setQueryData(RESTAURANT_PROFILE_QUERY_KEY, {
          ...restaurantProfileCached,
          name,
          description,
        })
      }
      return { restaurantProfileCached }
    },
    [queryClient],
  )

  const updateRestaurantProfileMutation = useMutation({
    mutationFn: RestaurantService.updateRestaurantProfile,
    onMutate({ name, description }) {
      const { restaurantProfileCached } = updateRestaurantProfileCache({
        // Optimistic UI
        name,
        description,
      })

      return {
        previousRestaurantProfile: restaurantProfileCached,
      }
    },
    onError(error, __, context) {
      if (context?.previousRestaurantProfile) {
        updateRestaurantProfileCache({
          // Optimistic UI
          name: context.previousRestaurantProfile.name,
          description:
            context.previousRestaurantProfile.description || undefined,
        })
      }
      throw error
    },
  })

  const handleConfirm = useCallback<SubmitHandler<RestaurantProfileFormData>>(
    async ({ name, description }) => {
      toast.promise(
        updateRestaurantProfileMutation.mutateAsync({ name, description }),
        {
          loading: 'Atualizando perfil...',
          success: 'Perfil atualizado com sucesso!',
          error(error) {
            return {
              message: `Problemas ao atualizar o perfil. ${(error as Error).message}`,
            }
          },
        },
      )
    },
    [updateRestaurantProfileMutation],
  )

  return (
    <Dialog>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogClose />
          <DialogTitle>Perfil da loja</DialogTitle>
          <DialogDescription>
            Atualize as informações do seu estabelecimento visíveis ao cliente
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={restaurantProfileForm.handleSubmit(handleConfirm)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...restaurantProfileForm.register('name')} />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...restaurantProfileForm.register('description')}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button size="sm" variant="ghost">
                Cancelar
              </Button>
            </DialogClose>
            <Button size="sm" variant="default" type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function RestaurantProfileDialogTrigger({
  children: trigger,
}: PropsWithChildren) {
  return <DialogTrigger asChild>{trigger}</DialogTrigger>
}
