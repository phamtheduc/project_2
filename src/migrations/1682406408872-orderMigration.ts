import { MigrationInterface, QueryRunner } from "typeorm"

export class OrderMigration1682406408872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS public.order (
              id uuid,
              quantity integer,
              status CHARACTER VARYING(255),
              userid uuid,
              FOREIGN KEY (userid) REFERENCES public.user(id),
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
