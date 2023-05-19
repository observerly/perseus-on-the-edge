/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { createClient } from '@libsql/client'
import { createClient as createEdgeClient } from '@libsql/client/http'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'

/*****************************************************************************************************************/

let db: LibSQLDatabase | null = null

/*****************************************************************************************************************/

export interface UseDBOptions {
  /**
   *
   * The url to use when connecting to the database.
   *
   */
  url: string
  /**
   *
   * The auth token to use when connecting to the database.
   *
   */
  authToken?: string
}

/*****************************************************************************************************************/

export type UseDB = (options: UseDBOptions) => LibSQLDatabase

/*****************************************************************************************************************/

export const useDb: UseDB = options => {
  // If we have a DB, use it:
  if (db) return db

  const { url, authToken } = options

  // If we are using the edge libsql database:
  if (url && authToken && url.startsWith('libsql://')) {
    db = drizzle(
      createEdgeClient({
        url,
        authToken
      })
    )
  }

  // If we are using the local file system:
  if (url && url.startsWith('file:')) {
    db = drizzle(
      createClient({
        url
      })
    )
  }

  // If we have no database throw an error:
  if (!db) {
    throw new Error(
      'No database has been configured. Please check your .env file and make sure DB_ENV is properly configured \
      and a DB_URL is provided.'
    )
  }

  return db
}

/*****************************************************************************************************************/
