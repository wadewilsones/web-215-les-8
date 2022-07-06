import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pusher from 'pusher';
import 'dotenv/config';
import postDb from './dBmodel.js';  

const app = express();
const port = process.env.PORT;

//Middleware

app.use(cors());
app.use(express.json());

//Pusher 

const pusher = new Pusher({
    appId: "1432291",
    key: "fb7ba128897cfbafeea2",
    secret: "cefd9e9bb59236516694",
    cluster: "mt1",
    useTLS: true
  });

  
  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
  });



//APIs
app.get('/', (req, res) => {
    res.status(200).send('Hello!')
})



//Upload Image

app.post('/upload', (req,res) => {
    const userData = req.body;
    console.log(userData)
    postDb.create(userData, (err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get('/showPosts', (req, res) => {
    postDb.find({},(err, data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

//DB congig
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log('Database connected');

    const changeStream = mongoose.connection.collection('posts').watch();
    changeStream.on('change', (change) => {
        console.log(change)

        if(change.operationType === 'insert'){
            console.log('Triggering Pusher **IMG UPLOAD**')

            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                caption:postDetails.caption,
                user:postDetails.username,
                image:postDetails.image
            })
           
        }
        else{
            console.log('Unknown trigger from Pusher')
        }
    })
})


app.listen(port, () => {console.log(`Listening on ${port}`)});


