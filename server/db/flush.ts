/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { LibSQLDatabase } from 'drizzle-orm/libsql'

import { LibsqlError } from '@libsql/client'

import { useDb } from './utils'

import { bodies } from '../db/schema/bodies'

/*****************************************************************************************************************/

const db = useDb({
  url: process.env.TURSO_DB_URL || 'file:db.perseus.sqlite',
  authToken: process.env.TURSO_DB_AUTH_TOKEN
})

/*****************************************************************************************************************/

const flushBodies = async (db: LibSQLDatabase, action?: string) => {
  try {
    await db.delete(bodies).returning().all()
  } catch (error) {
    if (error instanceof LibsqlError) {
      console.log(
        `Something went wrong while flushing ${action || 'the bodies table'}. ${error.name}: ${
          error.code
        } ${error.message}`
      )
    } else {
      console.log(`Something went wrong while flushing ${action || 'the bodies table'}.`)
    }

    console.log(`Flushing ${action || 'the bodies table'} finished unsuccessfully.`)
    return
  }

  console.log(`Flushing ${action || 'the bodies table'} finished successfully.`)
}

/*****************************************************************************************************************/

const flush = async (db: LibSQLDatabase) => {
  // Flush the bodies table of all objects:
  console.log('Flushing the bodies table')
  await flushBodies(db)
  console.log('Finished flushing the database.')
}

/*****************************************************************************************************************/

console.log('Flushing the database...')
flush(db)

/*****************************************************************************************************************/
