-- AlterTable
ALTER TABLE `product` ADD COLUMN `subCatalogId` INTEGER NULL;

-- CreateTable
CREATE TABLE `subCatalog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `catalogId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subCatalogId_fkey` FOREIGN KEY (`subCatalogId`) REFERENCES `subCatalog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subCatalog` ADD CONSTRAINT `subCatalog_catalogId_fkey` FOREIGN KEY (`catalogId`) REFERENCES `Catalog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
