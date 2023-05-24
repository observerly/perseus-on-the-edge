/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import superjson from 'superjson'

import { initTRPC } from '@trpc/server'

import { Context } from '../trpc/context'

/*****************************************************************************************************************/

// Initialise TRPC:
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  allowOutsideOfServer: true,
  errorFormatter({ shape }) {
    return shape
  }
})

export const publicProcedure = t.procedure

/*****************************************************************************************************************/

export const router = t.router

/*****************************************************************************************************************/
