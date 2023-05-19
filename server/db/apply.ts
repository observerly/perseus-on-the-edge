/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { resolve } from 'pathe'

import { LibsqlError } from '@libsql/client'

import { migrate } from 'drizzle-orm/libsql/migrator'

import { useDb } from './utils'

/*****************************************************************************************************************/

const db = useDb({
  url: process.env.TURSO_DB_URL || 'file:db.perseus.sqlite',
  authToken: process.env.TURSO_DB_AUTH_TOKEN
})

/*****************************************************************************************************************/

const apply = async () => {
  try {
    await migrate(db, {
      migrationsFolder: resolve('./server/db/migrations')
    })
  } catch (error) {
    if (error instanceof LibsqlError) {
      console.log(
        `Something went wrong while applying migrations. ${error.name}: ${error.code} ${error.message}`
      )
    } else {
      console.log('Something went wrong while applying migrations.')
    }
  } finally {
    console.log('Migrations applied successfully.')
  }
}

/*****************************************************************************************************************/

console.log('Applying migrations...')
apply()

/*****************************************************************************************************************/
