// jshint esversion: 6
//const express = require('express');
import express from 'express';
//const router = express.Router();
import producerService from '../component/producerAPI';
import consumer from '../component/consumerAPI';
// const producerService = require('../component/producerAPI');
import ioccontainer from '../component/ioccontainer';

module.exports = (app) => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Access-Control-Request-Headers');
        res.setHeader('Access-Control-Allow-Credentials', true);

        console.log('************* Request Log ***************');
        console.log(`Request Path: ${req.path}`);
        console.log(`Request Method: ${req.method}`);
        console.log(`Request Date.Time: ${new Date()}`);
        console.log(`Request Query String: ${req.query}`);
        console.log(`Request Body: ${JSON.stringify(req.body)}`);

        if(req.method=='OPTION') {
            res.status(200).json({
                'help':'soon will be implemented'
            });
        }
        else {
            //console.log(`Transfering to next handler`);
            next();
        }
    });

    app.get('/', (req, res, next) => {
        res.status(200).json({
            'message': 'Please use /produce endpoint with payload to publish any message to kafka backbone'
        });
    });

    app.post('/', (req, res, next) => {
        res.status(200).json({
            'message': 'Please use /produce endpoint with payload to publish any message to kafka backbone'
        });
    });

    app.post('/produce', (req, res, next) => {
        //req.session = res.session;
        if(req.get('publisher')===null || req.get('publisher')==='') {
            res.status(401).json({
                'message': 'Unable to find valid [publisher] value in the header. Please get authentication token first from the admin'
            });
        }

        //console.log(`Req.Body => ${JSON.stringify(req.body)}`);
        let payload = req.body || {'topic': '', msgType: '', publisherid: '', sessionid: '', 'message': '', 'date': new Date()};

        //console.log(`Data =>=> ${JSON.stringify(payload)}`);
        producerService.sendMessage({
            topic: payload.topic,
            msgType: payload.msgType,
            publisherid: payload.publisherid,
            sessionid: payload.sessionid,
            message: JSON.parse(payload.message)
        }, (error, data) => {
            //console.log(`Data => ${data} | Error => ${error}`);

            if(!error) {
                res.status(200).json({
                    'message': 'Data published to Kafka cluster'
                });
            }
            else {
                res.status(402).json({
                    'message': error
                });
            }
        });
    });
};