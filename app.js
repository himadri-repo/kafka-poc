#!/usr/bin/env node
'use strict';

// jshint esversion:6
// const express = require('express');
// const http = require('http');
// const https = require('https');
// const bodyParser = require('body-parser');
// const path = require('path');
// const routes = require('./routers');

import express from 'express';
import http from 'http';
import https from 'https';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routers';

const PORT = 4040;

const app = express();

app.use(bodyParser.urlencoded({
    extended: false,
    limit: '2mb'
}));
app.use(bodyParser.json({
    inflate: true,
    limit: '2mb'
}));
routes(app);

app.listen(PORT, function() {
    console.log(`Server started. at ${PORT}`);
    //console.log(`Server started. Listening at port ${process.end.PORT || PORT}, ${data}`);
});