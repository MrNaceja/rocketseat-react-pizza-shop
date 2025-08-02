import z4 from 'zod/v4'

const envSchema = z4.object({
  VITE_PIZZA_SHOP_API_URL: z4.url(),
  VITE_PIZZA_SHOP_API_DELAY: z4.coerce.number().optional().default(0),
})

export type Env = z4.infer<typeof envSchema>

export const env = envSchema.parse(import.meta.env)
