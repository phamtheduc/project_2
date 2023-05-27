import { MigrationInterface, QueryRunner } from "typeorm"

export class UserMigration1682406398095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS public.user (
              id uuid,
              firstname CHARACTER VARYING(255),
              lastname CHARACTER VARYING(255),
              username CHARACTER VARYING(255),
              password CHARACTER VARYING(255),
              PRIMARY KEY (id)
            )`
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.migrations`);

        await queryRunner.query(
        `DROP TABLE public.order_product_product;`
        );
        await queryRunner.query(
        `DROP TABLE public.order;`
        );
        await queryRunner.query(
        `DROP TABLE public.product;`
        );
        await queryRunner.query(
        `DROP TABLE public.user;`
        );
    }

}
