import { defineSchema, t, Archetype } from '@strav/database/schema'

export default defineSchema('conversation', {
  archetype: Archetype.Entity,
  fields: {
    id: t.uuid().primaryKey(),
    visitor_id: t.uuid().nullable(),
    session_id: t.varchar(255).required().unique(),
    context: t.jsonb().nullable(),
    metadata: t.jsonb().nullable(),
    status: t.varchar(50).default('active'),
  },
})