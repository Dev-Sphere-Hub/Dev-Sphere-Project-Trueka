export const DotEnvConfig = () => ({
  mongodb: process.env.MONGODB,
  port: +process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.CALLBACK_URL
});
