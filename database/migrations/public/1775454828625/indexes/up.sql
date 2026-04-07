CREATE UNIQUE INDEX IF NOT EXISTS "idx_conversation_session_id_unique" ON "conversation" ("session_id");
CREATE INDEX IF NOT EXISTS "idx_message_conversation_id" ON "message" ("conversation_id");
CREATE INDEX IF NOT EXISTS "idx_user_email" ON "user" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_email_unique" ON "user" ("email");
