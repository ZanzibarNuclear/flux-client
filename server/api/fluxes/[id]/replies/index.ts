import { defineEventHandler, readBody } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const parentId = parseInt(event.context.params?.id || '0')

  // GET /api/fluxes
  if (method === 'GET') {
    const client = await serverSupabaseClient(event)
    const { data: replies, error } = await client
      .from('fluxes')
      .select('*, author:flux_authors(*)')
      .eq('parent_id', parentId)

    if (error) {
      console.error('Error fetching replies:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch replies',
      })
    }

    return replies
  }
})