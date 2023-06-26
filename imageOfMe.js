if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
};
const express = require('express');
const app = express();
const port = 4002;
const https = require('https');
const fs = require('fs');
const { SSL_KEY, SSL_CERT } = process.env;


app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/media/me.png`)
});


if (__dirname.includes('Desktop')) {
	app.listen(port, console.log(`Server started on port ${port}, serving an image of me`));
}
else {
	const sslServer = https.createServer({
		key: fs.readFileSync(SSL_KEY),
		cert: fs.readFileSync(SSL_CERT),
	}, app);
	sslServer.listen(port, () => console.log(`Secure server started on port ${port}, serving an image of me`));
};