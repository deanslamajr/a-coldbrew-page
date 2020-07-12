import {
  Model,
  Column,
  Default,
  Table,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
  Unique,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'accounts' })
export class Accounts extends Model<typeof Accounts> {
  @Default(() => uuidv4())
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
  })
  isActive!: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt!: Date;

  @Column({
    type: DataType.DATE,
    field: 'last_login_at',
  })
  lastLoginAt!: Date;
}
