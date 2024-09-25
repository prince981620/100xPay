import { z } from "zod"

export const userAuthSchema = z.object({
    phone: z.string().length(10),
    password: z.string().min(8)
})

export type userAuth = z.infer<typeof userAuthSchema>;