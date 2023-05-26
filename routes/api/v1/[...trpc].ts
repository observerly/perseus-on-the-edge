/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { defineCORSEventHandler } from 'nitro-cors'

import { defineNitroTRPCEventHandler } from 'trpc-nitro-adapter'

import { appRouter as router } from '../../../server/router'

import { createContext } from '../../../server/trpc/context'

/*****************************************************************************************************************/

const trpcHandler = defineNitroTRPCEventHandler({
  router,
  createContext
})

/*****************************************************************************************************************/

export default defineCORSEventHandler(trpcHandler, {
  origin: '*',
  methods: ['GET', 'OPTIONS']
})

/*****************************************************************************************************************/
