import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductMigration1682406404635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS public.product (
              id uuid,
              name CHARACTER VARYING(255),
              price NUMERIC(10, 2),
              category CHARACTER VARYING(255),
              PRIMARY KEY (id)
            )`
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
