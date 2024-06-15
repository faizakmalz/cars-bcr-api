import { UsersModel } from "../models/users.model";

class UsersRepository {
  async createUser(user: Partial<UsersModel>) {
    const newUser =  await UsersModel.query().insert(user);
    console.log('User inserted:', newUser);
    return newUser;
  }

  async findUserByEmail(email: string) {
    return await UsersModel.query().findOne({ email });
  }

  async findUserById(id: string) {
    return await UsersModel.query().findById(id);
  }
}

export const usersRepository = new UsersRepository();
