//jshint esversion: 6
import kafka from "kafka-node";
import {kafkaconfig} from '../config';
 
const client1 = new kafka.KafkaClient({})
const client = new kafka.Client(kafkaconfig.zookeeperUri);
 
const topics = [
    {
        topic: "salestopic"
    }
];
const options = {
    autoCommit: true,
    autoCommitIntervalMs: 5000,
    fetchMaxWaitMs: 100,
    fetchMinBytes: 1,
    fetchMaxBytes: 1024 * 1024,
    encoding: "utf8"
};
 
const consumer = new kafka.HighLevelConsumer(client, topics, options);
 
console.log('Consumer listening');

consumer.on("message", function(message) {
 
    // Read string into a buffer.
    //var buf = new Buffer(message.value, "binary"); 
    //var decodedMessage = JSON.parse(buf.toString());

    console.log(`\n\nConsumer Read => ${JSON.stringify(message)}`);

    //Events is a Sequelize Model Object. 
    // return Events.create({
    //     id: decodedMessage.id,
    //     type: decodedMessage.type,
    //     userId: decodedMessage.userId,
    //     sessionId: decodedMessage.sessionId,
    //     message: JSON.stringify(decodedMessage.message),
    //     createdAt: new Date()
    // });

    return message;
});
 
consumer.on("error", function(err) {
    console.log("error", err);
});
 
process.on("SIGINT", function() {
    consumer.close(true, function() {
        process.exit();
    });
});

module.exports = consumer;