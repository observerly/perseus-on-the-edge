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
