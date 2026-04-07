import { defineSchema, t, Archetype } from '@strav/database/schema'

export default defineSchema('message', {
  archetype: Archetype.Component,
  parents: ['conversation'],
  fields: {
    id: t.uuid().primaryKey(),
    role: t.enum(['user', 'assistant']).required(),
    content: t.text().required(),
    metadata: t.jsonb().nullable(),
    is_typing: t.boolean().default(false),
  },
})