import z4 from "zod/v4";

const envSchema = z4.discriminatedUnion("MODE", [
  z4.object({
    MODE: z4.enum(["mock"]).default("mock"),
    VITE_PIZZA_SHOP_API_URL: z4.string(),
    VITE_PIZZA_SHOP_API_DELAY: z4.coerce.number().optional().default(0),
  }),
  z4.object({
    MODE: z4.enum(["development", "production"]).default("development"),
    VITE_PIZZA_SHOP_API_URL: z4.url(),
    VITE_PIZZA_SHOP_API_DELAY: z4.coerce.number().optional().default(0),
  }),
]);

export type Env = z4.infer<typeof envSchema>;

export const env = envSchema.parse(import.meta.env);
