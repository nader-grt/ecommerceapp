

import { RefreshToken, User } from "../../../models/main";


export  default class RefreshTokenRepo {
  async createToken(userId: number, token: string, expiresAt: Date) {
   
    return RefreshToken.create({ userId, token, revoked: false, expiresAt });
  }

  async findToken(token: string) {
    console.log("step 55 in repo 5  ",token )
    const result = await RefreshToken.findOne({ where: { token } ,  include: [{ model: User, as: 'tokens' }]})
   // console.log(" result repo  ", result)
    const tokenRecord = await RefreshToken.findOne({ where: { token } });
    return result;
  }

  async revokeToken(token: string) {
    const record = await RefreshToken.findOne({ where: { token } });
    if (record) await record.update({ revoked: true });
  }

  async revokeAllUserTokens(userId: number) {
    await RefreshToken.update({ revoked: true }, { where: { userId } });
  }
}