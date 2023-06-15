export default {
  secretToken: process.env.APP_SECRET || "default",
  expiresInToken: "1d", // "15m", // 15 minutes
  secretRefreshToken: process.env.APP_REFRESH_SECRET || "default",
  expiresInRefreshToken: "30d",
  expiresInRefreshTokenDays: 30,
  secretResetToken: process.env.APP_RESET_SECRET || "default",
  expiresInResetPasswordToken: "30m",
  expiresInResetPasswordTokenMinutes: 30,
  secretEmailConfirmationToken:
    process.env.APP_EMAIL_CONFIRMATION_SECRET || "default",
  expiresInEmailConfirmationToken: "30m",
  expiresInEmailConfirmationTokenMinutes: 30,
};
