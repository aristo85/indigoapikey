exports.config = {
  mongoUrl: process.env.MONGO_DB ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "secret",
  apiTracker: process.env.API_TRACKER ?? "",
  accessKey: process.env.ACCESS_KEY ?? "",
};
