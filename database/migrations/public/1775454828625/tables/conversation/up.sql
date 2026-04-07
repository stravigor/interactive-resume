-- Create table: conversation
CREATE TABLE IF NOT EXISTS "conversation" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "visitor_id" UUID,
  "session_id" VARCHAR(255) NOT NULL DEFAULT '',
  "context" JSONB,
  "metadata" JSONB,
  "status" VARCHAR(50) DEFAULT 'active',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at" TIMESTAMPTZ,
  CONSTRAINT "pk_conversation" PRIMARY KEY ("id")
);
