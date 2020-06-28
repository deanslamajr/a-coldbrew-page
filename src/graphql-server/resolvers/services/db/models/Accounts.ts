import {
  Model,
  Column,
  Default,
  Table,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'accounts' })
export class Accounts extends Model<typeof Accounts> {
  @Default(() => uuidv4())
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  is_active!: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at!: Date;
}
