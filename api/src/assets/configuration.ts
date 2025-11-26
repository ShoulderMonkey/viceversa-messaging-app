export const configuration = () => ({
  auth: {
    expiresIn: "8h",
    privateKey: process.env.PRIVATE_KEY,
    keys: {
      private: process.env.PRIVATE_KEY,
      public: process.env.PUBLIC_KEY
    },
  }
})