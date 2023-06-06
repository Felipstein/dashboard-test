-- CreateTable
CREATE TABLE "widgets" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "layout" JSONB NOT NULL,
    "dashboardId" TEXT NOT NULL,

    CONSTRAINT "widgets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "dashboards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
