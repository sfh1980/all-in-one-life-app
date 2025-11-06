-- CreateEnum
CREATE TYPE "ImportanceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventType" ADD VALUE 'ACADEMIC';
ALTER TYPE "EventType" ADD VALUE 'HEALTH';
ALTER TYPE "EventType" ADD VALUE 'SOCIAL';
ALTER TYPE "EventType" ADD VALUE 'LIFE_SKILLS';
ALTER TYPE "EventType" ADD VALUE 'FINANCIAL';
ALTER TYPE "EventType" ADD VALUE 'SELF_CARE';
ALTER TYPE "EventType" ADD VALUE 'TRANSPORTATION';

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "gpsLocation" JSONB,
ADD COLUMN     "importanceLevel" "ImportanceLevel" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "templateId" TEXT;

-- CreateTable
CREATE TABLE "event_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL,
    "defaultDuration" INTEGER,
    "defaultMetadata" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_templates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "event_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
