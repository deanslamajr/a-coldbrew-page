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
import shortid from 'shortid';

@Table({ tableName: 'new-account-tokens' })
export class NewAccountTokens extends Model<typeof NewAccountTokens> {
  @Default(() => uuidv4())
  @PrimaryKey
  @Column(DataType.UUIDV4)
  id!: string;

  @Default(() => shortid.generate())
  @Column(DataType.STRING)
  code!: string;

  @Column(DataType.STRING)
  email!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  has_been_used!: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at!: Date;
}
