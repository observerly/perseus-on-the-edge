/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { sql } from 'drizzle-orm'

import { bodies } from '../db/schema/bodies'

import { type LibSQLDatabase } from 'drizzle-orm/libsql'

/*****************************************************************************************************************/

/**
 *
 * getBodiesCount() convenience method
 *
 * @param db an instance of the LibSQLDatabase class
 * @returns the total number of rows in the bodies table
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
