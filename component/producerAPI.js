// jshint esversion:6

import uuid from 'uuid';
import kafka from 'kafka-node';
import {kafkaconfig} from '../config';

// const uuid = require('uuid');
// const kafka = require('kafka-node');
// const kafkaconfig = require('../config');

const clientId = 'KAFKA-CLIENT-001';

console.log(kafkaconfig.zookeeperUri);
const kafkaClient = new kafka.Client(kafkaconfig.zookeeperUri, clientId, {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});

const producer = new kafka.HighLevelProducer(kafkaClient);
producer.on('ready', ()=> {
    console.log('Kafka producer is ready and conncted to Kafka Server');
});

producer.on('error', ()=> {
    console.log('Kafka producer is failed to start. Unable to connect to Kafka Server');
});

const producerService = {
    sendMessage: ({topic, msgType, publisherid, sessionid, message}, callback = ()=> {}) => {
        if(!publisherid) {
            callback(new Error('Invalid publisher id passed'));
        }
        if(!topic) {
            callback(new Error('Invalid topic passed'));
        }

        let event = {
            id: uuid.v4,
            userid: publisherid,
            sessionid: sessionid,
            date: new Date(),
            type: msgType,
            message: message
        };

        //let bufferedMessage = new Buffer.from(JSON.stringify(event));
        let bufferedMessage = JSON.stringify(event);

        let record = [
            {
                topic: topic,
                messages: bufferedMessage,
                key: uuid.v4(),
                attributes: 1
            }
        ];

        producer.send(record, (error, data) => {
            //console.log(`Record => ${JSON.stringify(record)}`);
            //console.log(error);

            callback(error, data);
        });
    }
};

module.exports = producerService;