/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { LibSQLDatabase } from 'drizzle-orm/libsql'

import { LibsqlError } from '@libsql/client'

import { useDb } from './utils'

import { type Body } from './schema/bodies'

import { upsertBodyByUID } from '../orm/bodies'

import { stars } from '../../data/stars'

import { messier } from '../../data/messier'

/*****************************************************************************************************************/

const db = useDb({
  url: process.env.TURSO_DB_URL || 'file:db.perseus.sqlite',
  authToken: process.env.TURSO_DB_AUTH_TOKEN
})

/*****************************************************************************************************************/

const seedBodies = async (db: LibSQLDatabase, values: Body[], action?: string) => {
  try {
    values.forEach(async value => {
      await upsertBodyByUID(db, value)
    })
  } catch (error) {
    if (error instanceof LibsqlError) {
      console.log(
        `Something went wrong while seeding ${action || 'the bodies table'}. ${error.name}: ${
          error.code
        } ${error.message}`
      )
    } else {
      console.log(`Something went wrong while seeding ${action || 'the bodies table'}.`)
    }

    console.log(`Seeding ${action || 'the bodies table'} finished unsuccessfully.`)
    return
  }

  console.log(`Seeding ${action || 'the bodies table'} finished successfully.`)
}

/*****************************************************************************************************************/

const seed = async (db: LibSQLDatabase) => {
  // Seed the bodies table with Star objects:
  console.log('Seeding the bodies table with Star objects...')
  await seedBodies(db, stars, 'the bodies table with Star objects')

  // Seed the bodies table with Messier objects:
  console.log('Seeding the bodies table with Messier objects...')
  await seedBodies(db, messier, 'the bodies table with Messier objects')

  // Done [!!]:
  console.log('Finished seeding the database.')
}

/*****************************************************************************************************************/

console.log('Seeding the database...')
seed(db)

/*****************************************************************************************************************/
