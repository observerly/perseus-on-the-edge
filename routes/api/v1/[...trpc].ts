/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { defineNitroTRPCEventHandler } from 'trpc-nitro-adapter'

import { appRouter as router } from '../../../server/router'

import { createContext } from '../../../server/trpc/context'

/*****************************************************************************************************************/

export default defineNitroTRPCEventHandler({
  router,
  createContext
})

/*****************************************************************************************************************/
