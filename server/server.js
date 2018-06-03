const express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const ReactSSR = require('react-dom/server');
var isDev = process.env.NODE_ENV === 'development';
const app = express();
if (!isDev) { //线上环境 
    console.log('prod');
    const serverApp = require('../dist/server-app').default;
    app.use('/public', express.static(path.join(__dirname, '../dist/')));
    const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf-8');
    app.get('*', (req, res) => {
        var appString = ReactSSR.renderToString(serverApp);
        var html = ejs.render(template, { appString }); res.send(html);
    });
} else { // 开发环境 
    console.log('dev');
    const devServer = require('./utils/dev-server')
    devServer(app);
}
const port = isDev?8000:3000
app.listen(3000, () => { console.log(`server is listening on ${port}`); })