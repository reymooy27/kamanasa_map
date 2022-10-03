import { createRouter } from "./context";
import {z} from 'zod'
import { TRPCError } from "@trpc/server";

export const disabilitiesRouter = createRouter()

// .query('get-disabilities',{
//   async resolve({ctx}){
//     const disabilities = await ctx?.prisma?.disabilities.findMany({
      
//     })

//     return disabilities
//   }
// })
.mutation('add-data-disabilities', {
    input: z
      .object({
        name: z.string(),
      }),
    async resolve({ input,ctx }) {
      try {
        const newDisabilitiesData = await ctx?.prisma?.disabilities.create({
          data:{
            name: input.name
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