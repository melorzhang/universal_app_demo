const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const ReactSSR = require("react-dom/server");
var isDev = process.env.NODE_ENV === "development";
const app = express();
const devPort=8001;
const prodPort=3456;
if (!isDev) { //线上环境
    console.log('prod');
    const serverApp = require('../dist/server-app').default;
    app.use('/', express.static(path.join(__dirname, '../dist/')));
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
const port = isDev ? devPort : prodPort;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
