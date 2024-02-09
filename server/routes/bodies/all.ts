/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { publicPaginatedProcedure } from '../../router/pagination'

import { BodySchema } from '../../schema/body'

import { getBodiesForObserver } from '../../orm/bodies'

/*****************************************************************************************************************/

/**
 *
 * findManyBodiesByInput
 *
 * @param {object} input - zod PaginationSchema & BodySchema { skip: number, take: number, et al. }
 *
 */
export const all = publicPaginatedProcedure.input(BodySchema).query(async opts => {
  const { db } = opts.ctx

  // Handle pagination route input:
  const { skip, take } = opts.input

  // Handle where clause querystring params for filtering astronomical bodies:
  const { datetime, latitude, longitude } = opts.input

  // An observer is a Geographic coordinate that includes a latitude and longitude:
  // An observation by that Observer is at a specific datetime:
  const bodies = await getBodiesForObserver(db, { latitude, longitude }, datetime)

  return {
    count: bodies.length,
    description: `A list of astronomical bodies that are above the local observer's horizon at ${datetime}`,
    observer: {
      latitude,
      longitude
    },
    when: datetime,
    bodies: bodies.slice(skip, take)
  }
})

/*****************************************************************************************************************/
