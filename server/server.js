const express = require("express");
const isDev = process.env.NODE_ENV === "development";
const server = require("../dist/server-app");
if (!isDev) { //线上环境
    console.log('prod');    
    // console.log(server);
} else { // 开发环境
    console.log('dev');
}

