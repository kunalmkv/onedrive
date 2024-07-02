require('dotenv').config();

module.exports = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    tenantId: process.env.TENANT_ID,
    redirectUri: process.env.REDIRECT_URI,
    scope: 'https://graph.microsoft.com/.default',
    tokenEndpoint: `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
    filesEndpoint: 'https://graph.microsoft.com/v1.0/me/drive/root/children',
    permissionsEndpoint: 'https://graph.microsoft.com/v1.0/me/drive/items/{itemId}/permissions'
};
