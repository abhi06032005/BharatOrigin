-- CreateTable
CREATE TABLE "OnboardingRequest" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT,
    "persona" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "stateLocation" TEXT NOT NULL,
    "craftType" TEXT,
    "experience" TEXT,
    "giTag" TEXT,
    "shopName" TEXT,
    "gstNumber" TEXT,
    "inventoryType" TEXT,
    "factoryName" TEXT,
    "sector" TEXT,
    "capacity" TEXT,
    "brandName" TEXT,
    "tagline" TEXT,
    "inceptionYear" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnboardingRequest_pkey" PRIMARY KEY ("id")
);
