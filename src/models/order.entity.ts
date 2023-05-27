import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Product } from "./product.entity";
  import { User } from "./user.entity";
  
  @Entity()
  export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    quantity: number;
  
    @Column({ default: "active", enum: ["active", "completed"] })
    status: string;
  
    @OneToOne(() => User)
    @JoinColumn()
    user: User;
  
    @ManyToMany(() => Product)
    @JoinTable()
    product: Product[];
  }
  