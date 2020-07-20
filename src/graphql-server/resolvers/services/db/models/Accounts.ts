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
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { Chores } from './Chores';
import { ChoreAccounts } from './ChoreAccounts';

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

  @HasMany(() => Chores, 'created_by_account_id')
  choresCreated!: Chores[];

  @BelongsToMany(
    () => Chores,
    () => ChoreAccounts,
    'chore_id',
    'account_id'
  )
  chores!: Array<Chores & { ChoreAccounts: ChoreAccounts }>;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    field: 'is_active',
  })
  isActive!: boolean;

  @Column({
    type: DataType.DATE,
    field: 'last_login_at',
  })
  lastLoginAt!: Date;

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
