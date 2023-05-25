/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { eq, gte, lte, sql } from 'drizzle-orm'

import { type LibSQLDatabase } from 'drizzle-orm/libsql'

import { type GeographicCoordinate, convertEquatorialToHorizontal } from '@observerly/polaris'

import { type Body, bodies } from '../db/schema/bodies'

/*****************************************************************************************************************/

/**
 *
 * getBodiesForObserver() convenience method
 *
 * @param db an instance of the LibSQLDatabase class
 * @param observer of type GeographicCoordinate
 * @param datetime of type Date
 * @returns an array of bodies that are currently above the local observer's horizon
 *
 */
export const getBodiesForObserver = async (
  db: LibSQLDatabase,
  observer: GeographicCoordinate,
  datetime: Date,
  horizon: number = 0
) => {
  const { latitude } = observer

  // Create a subquery to filter out bodies that are always below
  // the local observer's horizon:
  const sq = db
    .$with('sq')
    .as(db.select({ dec: sql<number>`cast(${bodies.dec} as float)`.as('dec') }).from(bodies))

  const results = await db
    .with(sq)
    .select()
    .from(bodies)
    .where(latitude >= 0 ? gte(sq.dec, latitude - 90) : lte(sq.dec, latitude + 90))
    .orderBy(bodies.uid)
    .all()

  // Further filter the results to only include bodies that are currently
  // above the local observer's horizon, i.e., the observered { alt } is
  // greater than 0:
  return results
    .map(body => {
      const ra = parseFloat(body.ra)

      const dec = parseFloat(body.dec)

      const { alt, az } = convertEquatorialToHorizontal({ ra, dec }, observer, datetime)

      return {
        ...body,
        ra,
        dec,
        alt,
        az
      }
    })
    .filter(body => {
      return body.alt > horizon
    })
}

/*****************************************************************************************************************/

/**
 *
 * getBodiesCount() convenience method
 *
 * @param db an instance of the LibSQLDatabase class
 * @returns the total number of rows in the bodies table
 *
 */
export const getCount = async (db: LibSQLDatabase) => {
  const count = await db
    .select({ count: sql<number>`count(*)` })
    .from(bodies)
    .all()

  return count[0].count
}

/*****************************************************************************************************************/

/**
 *
 * upsertBodyByUID() convenience method
 *
 * @param db an instance of the LibSQLDatabase class
 * @param body of type Body
 * @returns a Promise that resolves to an array of Body objects
 *
 */
export const upsertBodyByUID = async (db: LibSQLDatabase, body: Body): Promise<Body[]> => {
  const result = await db.select().from(bodies).where(eq(bodies.uid, body.uid)).get()

  if (result) {
    return await db.update(bodies).set(body).where(eq(bodies.uid, body.uid)).returning().all()
  } else {
    return await db.insert(bodies).values(body).returning().all()
  }
}

/*****************************************************************************************************************/
