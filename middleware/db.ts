/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { type H3Event, defineEventHandler } from 'h3'

import { type LibSQLDatabase } from 'drizzle-orm/libsql'

import { useDb } from '../server/db/utils'

/*****************************************************************************************************************/

declare module 'h3' {
  interface H3EventContext {
    db: LibSQLDatabase
  }
}

/*****************************************************************************************************************/

const createDBContext = (event: H3Event) => {
  const { db } = useRuntimeConfig()
  event.context.db = useDb(db)
}

/*****************************************************************************************************************/

export default defineEventHandler(async event => {
  createDBContext(event)
})

/*****************************************************************************************************************/
