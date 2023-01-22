import { createRouter } from "./context";
import {nullable, z} from 'zod'
import { TRPCError } from "@trpc/server";

export const disabilitiesRouter = createRouter()
.mutation('add-data-disabilities', {
    input: z
      .object({
        name: z.string(),
        nik: z.number().or(z.nan()).optional().default(0).nullable(),
        gender: z.string().nullable(),
        // birthdate: z.date(),
        // rt: z.number(),
        // rw: z.number(),
        // dusun: z.string(),
        // desa: z.string(),
        // kecamatan: z.string(),
        // disabilities: z.string(),

      }).partial(),
    async resolve({ input,ctx }) {
      try {
        const newDisabilitiesData = await ctx?.prisma?.disabilities.create({
          data:{
            name: input.name,
            nik: input.nik,
            gender: input.gender,
            // birthdate: input.birthdate,
            // rt: input.rt,
            // rw: input.rw,
            // dusun: input.dusun,
            // desa: input.desa,
            // kecamatan: input.kecamatan,
            // disabilities: input.disabilities,
          }
        })
      return newDisabilitiesData
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          // message: error,
          cause: error
        })
      }
    },
  })