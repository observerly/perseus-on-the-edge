/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { z } from 'zod'

/*****************************************************************************************************************/

export const BodySchema = z
  .object({
    datetime: z.date().optional().default(new Date()),
    latitude: z.number().min(-90).max(90).optional().default(0),
    longitude: z.number().min(0).max(360).optional().default(0)
  })
  .default({
    latitude: 0,
    longitude: 0,
    datetime: new Date()
  })

/*****************************************************************************************************************/
