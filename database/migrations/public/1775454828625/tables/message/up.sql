-- Create table: message
CREATE TABLE IF NOT EXISTS "message" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "conversation_id" UUID NOT NULL,
  "role" "message_role" NOT NULL,
  "content" TEXT NOT NULL DEFAULT '',
  "metadata" JSONB,
  "is_typing" BOOLEAN DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "pk_message" PRIMARY KEY ("id")
);
