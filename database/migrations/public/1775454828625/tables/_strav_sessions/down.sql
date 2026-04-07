-- Create table: _strav_sessions
CREATE TABLE IF NOT EXISTS "_strav_sessions" (
  "id" UUID NOT NULL,
  "user_id" VARCHAR(255),
  "csrf_token" VARCHAR(64) NOT NULL,
  "data" JSONB NOT NULL DEFAULT '{}',
  "ip_address" VARCHAR(45),
  "user_agent" TEXT,
  "last_activity" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "pk__strav_sessions" PRIMARY KEY ("id")
);
