const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateTableUser1656192024700 {
    name = 'CreateTableUser1656192024700'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "userName" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
