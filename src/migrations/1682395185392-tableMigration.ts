import { MigrationInterface, QueryRunner } from "typeorm";

export class TableMigration1682395185392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
