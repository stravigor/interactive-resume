ALTER TABLE "message" ADD CONSTRAINT "fk_message_conversation_id" FOREIGN KEY ("conversation_id") REFERENCES "conversation" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
