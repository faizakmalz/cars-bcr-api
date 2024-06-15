import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  role!: "customer" | "admin" | "superadmin";
  createdAt!: string;
  updatedAt!: string;

  static get tableName() {
    return "users";
  }

}

export type Users = ModelObject<UsersModel>;
