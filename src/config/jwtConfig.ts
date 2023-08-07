const jwtConfig = {
  accessToken: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  },
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  resetToken: {
    secret: process.env.RESET_TOKEN_SECRET,
    expiresIn: process.env.RESET_TOKEN_EXPIRES_IN,
  },
};
