// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = process.env.MONGO_URL
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName)

    // db.collection('users').deleteMany({
    //     age: 38
    // }).then(result => {
    //     console.log(result);
    // }).catch(error => {
    //     console.log(error);
    // })

    db.collection('tasks').deleteOne({
        description: "Grocery shopping"
    }).then(result => {
        console.log(result.deletedCount);
    }).catch(error => {
        console.log(error);
    })
})

