const mongodb = require('mongodb')
const mongoClient = mongodb.mongoClient
const connectionUrl = 'mongodb://127.0.0.127017'
const dbName = 'news-api'
mongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Error has occured!')
    }
    console.log('success')
    const db = client.db(dbName)
    const objectID = mongodb.objectID
    db.collection('reporters').deleteMany({}).then((result)=>{
        console,log(result.deletedCount)
    }).catch((error)=>{
        console.log(error)
    })
})