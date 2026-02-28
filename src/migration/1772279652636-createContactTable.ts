import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContactTable1772279652636 implements MigrationInterface {
    name = 'CreateContactTable1772279652636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "PhoneNumber" varchar(10), "email" varchar(255), "linkedId" integer, "linkPrecedence" varchar NOT NULL DEFAULT ('primary'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`);
        await queryRunner.query(`CREATE TABLE "temporary_contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "PhoneNumber" varchar(10), "email" varchar(255), "linkedId" integer, "linkPrecedence" varchar NOT NULL DEFAULT ('primary'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, CONSTRAINT "FK_860a3f5d23b62cc0f1a2297a1ea" FOREIGN KEY ("linkedId") REFERENCES "contact" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_contact"("id", "PhoneNumber", "email", "linkedId", "linkPrecedence", "createdAt", "updatedAt", "deletedAt") SELECT "id", "PhoneNumber", "email", "linkedId", "linkPrecedence", "createdAt", "updatedAt", "deletedAt" FROM "contact"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`ALTER TABLE "temporary_contact" RENAME TO "contact"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" RENAME TO "temporary_contact"`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "PhoneNumber" varchar(10), "email" varchar(255), "linkedId" integer, "linkPrecedence" varchar NOT NULL DEFAULT ('primary'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`);
        await queryRunner.query(`INSERT INTO "contact"("id", "PhoneNumber", "email", "linkedId", "linkPrecedence", "createdAt", "updatedAt", "deletedAt") SELECT "id", "PhoneNumber", "email", "linkedId", "linkPrecedence", "createdAt", "updatedAt", "deletedAt" FROM "temporary_contact"`);
        await queryRunner.query(`DROP TABLE "temporary_contact"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
