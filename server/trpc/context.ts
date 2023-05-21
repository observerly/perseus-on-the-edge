/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { type H3Event } from 'h3'

import { type inferAsyncReturnType } from '@trpc/server'

import { type LibSQLDatabase } from 'drizzle-orm/libsql'

import { useDb } from '../db/utils'

/*****************************************************************************************************************/

declare module 'h3' {
  interface H3EventContext {
    db: LibSQLDatabase
  }
}

/*****************************************************************************************************************/

/**
 * createContext
 *
 * @description Create the context for the base tRPC router to use for all routes
 * @param {H3Event} event
 *
 */
export const createContext = async (event: H3Event) => {
  const { db } = useRuntimeConfig()

  return {
    db: useDb(db),
    ...event.node
  }
}

/*****************************************************************************************************************/

export type Context = inferAsyncReturnType<typeof createContext>

/*****************************************************************************************************************/
