import jwt from "jsonwebtoken";
import crypto from "crypto";

import generateAccessToken from "../../middleware/generateAccessToken";
import { generateRefreshToken } from "../../middleware/generateRefreshToken";

import RefreshTokenRepo from "../../repo/auth/userRepo/RefreshTokenRepo";

export default class RefreshTokenUseCase {
  private _refreshTokenRepo = new RefreshTokenRepo();

  async execute(refreshToken: string) {
    try {
      console.log("========== REFRESH TOKEN FLOW ==========");
      console.log("Incoming Refresh Token:", refreshToken);

      // Hash incoming token
      const hash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

      console.log("Token Hash:", hash);

      // Find token in DB
      const tokenRecord = await this._refreshTokenRepo.findToken(hash);

      console.log("Token Record:", tokenRecord);

      if (!tokenRecord) {
        return {
          success: false,
          message: "Token not found",
        };
      }

      if (tokenRecord.revoked) {
        return {
          success: false,
          message: "Token revoked",
        };
      }

      // Verify JWT
      console.log("Before JWT Verify");

      const payload: any = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      );

      console.log("After JWT Verify");
      console.log("Payload:", payload);

      const { email, role, id } = payload;

      // Generate new access token
      console.log("Generating Access Token...");

      const newAccessToken = await generateAccessToken(
        email,
        role,
        id
      );

      console.log("Access Token Generated");

      // Generate new refresh token
      console.log("Generating Refresh Token...");

      const newRefreshToken = await generateRefreshToken(
        email,
        role,
        id
      );

      console.log("Refresh Token Generated");

      // Hash new refresh token
      const newHash = crypto
        .createHash("sha256")
        .update(newRefreshToken)
        .digest("hex");

      console.log("New Hash:", newHash);

      // Revoke old token
      console.log("Revoking Old Token...");

      await this._refreshTokenRepo.revokeToken(hash);

      console.log("Old Token Revoked");

      // Save new token
      console.log("Creating New Refresh Token Record...");

      try {
        const createdToken =
          await this._refreshTokenRepo.createToken(
            id,
            newHash,
            new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            )
          );

        console.log(
          "New Refresh Token Saved:",
          createdToken
        );
      } catch (createError) {
        console.error(
          "CREATE TOKEN ERROR:",
          createError
        );

        throw createError;
      }

      console.log("========== REFRESH SUCCESS ==========");

      return {
        success: true,
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      };
    } catch (err: any) {
      console.error(
        "========== REFRESH ERROR =========="
      );
      console.error(err);

      return {
        success: false,
        message: err?.message || "Refresh failed",
      };
    }
  }
}