const envConfig = {
  baseServerApi:
    process.env.NEXT_PUBLIC_SERVER_BASE_API_URL || "http://localhost:5000",
  baseClientUrl:
    process.env.NEXT_PUBLIC_CLIENT_BASE_API_URL || "http://localhost:3000",
};

export default envConfig;
