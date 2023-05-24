/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { z } from 'zod'

import { publicProcedure } from './trpc'

/*****************************************************************************************************************/

export const publicPaginatedProcedure = publicProcedure.input(
  z.object({
    skip: z.number().default(0),
    take: z.number().default(20)
  })
)

/*****************************************************************************************************************/
