import { MigrationInterface, QueryRunner } from "typeorm"

export class OrderProductMigration1682406577062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS order_product_product (
              orderId uuid,
              productId uuid,
              FOREIGN KEY (orderId) REFERENCES public.order(id),
              FOREIGN KEY (productId) REFERENCES public.product(id),
              PRIMARY KEY (orderId, productId)
            )`
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
