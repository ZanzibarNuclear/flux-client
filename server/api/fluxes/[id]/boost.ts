import { defineEventHandler } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  if (method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const id = parseInt(event.context.params?.id)
  const client = await serverSupabaseClient(event)

  // validate inputs
  console.log('POST boost')
  if (!id) {
    return { warning: 'No flux ID provided' }
  }
  const body = await readBody(event)
  const { authorId } = body

  if (!authorId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  console.log('booster is authorId', authorId)

  const { error } = await client
    .from('flux_boosts')
    .insert([{ user_id: authorId, flux_id: id }])

  if (error) {
    if (error.code === '23505') { // unique_violation error code for PostgreSQL
      return { warning: 'Already boosted by this author' }
    }
    console.error('Error boosting flux:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to boost flux' })
  }

  // Count the number of boosts for the flux
  const { count: boostCount, error: countError } = await client
    .from('flux_boosts')
    .select('id', { count: 'exact' })
    .eq('flux_id', id)

  if (countError) {
    console.error('Error counting boosts:', countError)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to count boosts',
    })
  }

  // Update the boost_count on the flux
  const { error: updateError } = await client
    .from('fluxes')
    .update({ boost_count: boostCount })
    .eq('id', id)

  if (updateError) {
    console.error('Error updating boost count:', updateError)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update boost count',
    })
  }

  return { success: true }
})
