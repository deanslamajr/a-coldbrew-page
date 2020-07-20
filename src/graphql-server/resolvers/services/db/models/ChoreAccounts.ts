import {
  Model,
  Column,
  Default,
  Table,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { Chores } from './Chores';
import { Accounts } from './Accounts';

@Table({ tableName: 'chore-accounts' })
export class ChoreAccounts extends Model<typeof ChoreAccounts> {
  @Default(() => uuidv4())
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string;

  @ForeignKey(() => Chores)
  @Column({
    type: DataType.UUIDV4,
    field: 'chore_id',
  })
  choreId!: string;

  @ForeignKey(() => Accounts)
  @Column({
    type: DataType.UUIDV4,
    field: 'account_id',
  })
  accountId!: string;

  @AllowNull(false)
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
}
