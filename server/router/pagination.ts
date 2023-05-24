/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { z } from 'zod'

import { publicProcedure } from './trpc'

/*****************************************************************************************************************/

export const publicPaginatedProcedure = publicProcedure.input(
  z
    .object({
      skip: z.number().optional().default(0),
      take: z.number().optional().default(10)
    })
    .default({ skip: 0, take: 10 })
)

/*****************************************************************************************************************/
