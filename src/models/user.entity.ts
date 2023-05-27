import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  firstname: string;

  @Column({nullable: true})
  lastname: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
