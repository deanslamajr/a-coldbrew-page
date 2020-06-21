import {
  Model,
  Column,
  Table,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'new-account-tokens' })
export class NewAccountTokens extends Model<NewAccountTokens> {
  @PrimaryKey
  @Column
  id!: string;

  @Column
  code!: string;

  @Column
  email!: string;

  @Column
  has_been_used!: string;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;
}
