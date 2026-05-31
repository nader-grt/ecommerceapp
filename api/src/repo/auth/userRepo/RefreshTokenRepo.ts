import { RefreshToken, User } from "../../../models/main";

export default class RefreshTokenRepo {
  // async createToken(
  //   userId: number,
  //   token: string,
  //   expiresAt: Date
  // ) {
  //   return RefreshToken.create({
  //     userId,
  //     token,
  //     revoked: false,
  //     expiresAt,
  //   });
  // }


  async createToken(
    userId: number,
    token: string,
    expiresAt: Date
  ) {
    try {
      console.log("CREATE TOKEN INPUT", {
        userId,
        token,
        expiresAt,
      });
  
      const result = await RefreshToken.create({
        userId,
        token,
        revoked: false,
        expiresAt,
      });
  
      console.log("TOKEN CREATED", result.toJSON());
  
      return result;
    } catch (error) {
      console.error("CREATE TOKEN FAILED", error);
      throw error;
    }
  }
  async findToken(token: string) {
    const result = await RefreshToken.findOne({
      where: { token },
      include: [{ model: User, as: "user" }],
    });
  
    return result;
  }

  async revokeToken(token: string) {
    const record = await RefreshToken.findOne({
      where: { token },
    });

    if (record) {
      await record.update({ revoked: true });
    }
  }

  async revokeAllUserTokens(userId: number) {
    await RefreshToken.update(
      { revoked: true },
      { where: { userId } }
    );
  }
}