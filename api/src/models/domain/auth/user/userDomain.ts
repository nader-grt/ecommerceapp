import bcrypt from "bcrypt";
import { Role } from "../../../user";
import IUserResponse from "../../../../repo/auth/userRepo/userRepo";
import { IUpdateUserProfileDTO } from "../../../../useCases/userUseCase/UpdateUserProfileUseCase";
import { UpdateByAdminData } from "../../../../useCases/userUseCase/updateUserByAdminUseCase";
import { ActorUserAdmin } from "../../../../dbConfig/configApp";

type ActorRole = Role | ActorUserAdmin;

export default class UserDomain {
  protected id?: number;

  protected _firstName = "";
  protected _lastName = "";
  protected _phone = "";
  protected _email = "";

  protected password?: string;
  protected role?: ActorRole | string;

  protected city?: string;
  protected address?: string;

  constructor() {}

  // ================= GETTERS =================

  public get getId() {
    return this.id;
  }

  public get getFirstName() {
    return this._firstName;
  }

  public get getLastName() {
    return this._lastName;
  }

  public get getPhone() {
    return this._phone;
  }

  public get getEmail() {
    return this._email;
  }

  public get getPassword() {
    return this.password;
  }

  public get getRole() {
    return this.role?.toString().toLowerCase();
  }

  // ================= SETTERS =================

  public set setFirstName(v: string) {
    this._firstName = v;
  }

  public set setLastName(v: string) {
    this._lastName = v;
  }

  public set setPhone(v: string) {
    this._phone = v;
  }

  public set setEmail(v: string) {
    this._email = v;
  }

  public set setRole(v: ActorRole | string) {
    this.role = v.toString().toLowerCase();
  }

  // ❌ مهم: لا hashing هنا
  public set setPassword(rawPassword: string) {
    this.password = rawPassword;
  }

  // ================= PASSWORD LOGIC =================

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async setHashedPassword(rawPassword: string): Promise<void> {
    this.password = await this.hashPassword(rawPassword);
  }

  public async comparePassword(
    plain: string,
    hashed: string
  ): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }

  // ================= MAPPING =================

  public toGetAllUsers(data: IUserResponse[]): IUserResponse[] {
    return data.map((u) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      phone: u.phone,
      email: u.email,
    }));
  }

  // ================= UPDATE =================

  public updateProfileUser(data: IUpdateUserProfileDTO): void {
    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._email = data.email;
    this._phone = data.phone;
  }

  public updateByAdmin(data: UpdateByAdminData): void {
    this.updateProfileUser(data);

    if (data.role) {
      this.role = data.role;
    }
  }
}