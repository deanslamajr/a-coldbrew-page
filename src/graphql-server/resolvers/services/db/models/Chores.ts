import {
  Model,
  Column,
  Default,
  Table,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
  BelongsTo,
  BelongsToMany,
  AllowNull,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { Accounts } from './Accounts';
import { ChoreAccounts } from './ChoreAccounts';

import { choreVersion } from '../../../../../helpers/constants';

@Table({ tableName: 'chores' })
export class Chores extends Model<typeof Chores> {
  @Default(() => uuidv4())
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  summary!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column({
    type: DataType.DATE,
    field: 'due_date',
  })
  dueDate!: Date;

  @Column({
    type: DataType.DATE,
    field: 'completed_at',
  })
  completedAt!: Date;

  @AllowNull(false)
  @Default(() => choreVersion)
  @Column(DataType.SMALLINT)
  version!: number;

  @BelongsTo(() => Accounts, 'created_by_account_id')
  createdByAccount!: Accounts;

  @BelongsToMany(
    () => Accounts,
    () => ChoreAccounts
  )
  ownedByAccounts!: Accounts[];

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
