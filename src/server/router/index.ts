// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { disabilitiesRouter } from "./disabilities";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("disabilities.", disabilitiesRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
