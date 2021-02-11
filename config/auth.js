module.exports = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: `${process.env.AUTH0_BASE_URL}:${process.env.HTTPS_PORT}`,
    clientID: process.env.AUTH0_CLIENTID,
    issuerBaseURL: process.env.AUTH0_ISSUER_URL,
};

