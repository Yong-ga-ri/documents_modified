const express = require('express');
const app = express()
const mongoose = require('mongoose')


const MONGO_URI = 'mongodb+srv://ys:ew4hylORn4hKnJun@directory.4kdpv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


var Client = require('mongodb').MongoClient;

var clientDB;

Client.connect(MONGO_URI, function(err, db){
    
    var mydb = db.db('review_data')

    var cursor = mydb.collection('review_data').find()

    cursor.forEach(function(err, doc){
        console.log(doc)
    })
})