const axios = require('axios');
const config = require('./config');

async function authenticate() {
    console.log('Authenticating...');
    const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`, 'utf8').toString('base64');
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
    };
    const data = `grant_type=client_credentials&scope=${config.scope}&redirect_uri=${config.redirectUri}`;
    const response = await axios.post(config.tokenEndpoint, data, { headers });
    console.log('Axios response:', response.data);
    return response.data.access_token;
}

async function listFiles(token, ws) {
    try {
        console.log('Listing files...');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(config.filesEndpoint, { headers });
        const files = response.data.value;
        ws.send(`Files: ${JSON.stringify(files)}`);
        return files;
    } catch (error) {
        console.error('Error listing files:', error.response.data);
        ws.send(`Error listing files: ${error.response.data.error.message}`);
    }
}

async function downloadFile(token, itemId, ws) {
    try {
        console.log(`Downloading file: ${itemId}`);
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${config.filesEndpoint}/${itemId}/$value`, { headers, responseType: 'arraybuffer' });
        const fileBuffer = response.data;
        ws.send(`File contents: ${fileBuffer.toString('base64')}`);
        return fileBuffer;
    } catch (error) {
        console.error('Error downloading file:', error);
        ws.send(`Error downloading file: ${error.message}`);
    }
}

async function listUsersWithAccess(token, itemId, ws) {
    try {
        console.log(`Listing users with access to file: ${itemId}`);
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(config.permissionsEndpoint.replace('{itemId}', itemId), { headers });
        const users = response.data.value;
        ws.send(`Users with access: ${JSON.stringify(users)}`);
        return users;
    } catch (error) {
        console.error('Error listing users with access:', error);
        ws.send(`Error listing users with access: ${error.message}`);
    }
}

module.exports = { authenticate : authenticate,
    listFiles: listFiles,
    downloadFile: downloadFile,
    listUsersWithAccess : listUsersWithAccess
};
