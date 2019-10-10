const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3004;

const Profile = require('./models/Profile');

const profilesRoute = require('./routes/profiles');

//require('dotenv/config');
require('dotenv').config();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/profiles', profilesRoute);

//Routes
app.get('/', (req, res, next) => {
    res.send('we are on home url');
});

// app.get('/chart', async (req, res) => {
// 	res.sendFile('./routes/chart-data.html', {
// 		root : __dirname
// 	});
// });

// app.get('/barchart', async (req, res) => {
// 	res.sendFile('./routes/bar.html', {
// 		root : __dirname
// 	});
// });

// app.post('/events', async (req, res) => {
//     const post = new Event({
//         name: req.body.name,
//         date: req.body.date,
//         machine_id: req.body.machine_id
//     });

//     try {
//         const savedPost = await post.save();
//         //res.type('json');
//         res.json(savedPost);
//     } catch (err) {
//         res.send({
//             message: err
//         });
//     }
// });

// app.get('/events', async (req, res) => {
//     try {
//         const posty = await Event.find().sort({
//             date: 1
//         });
//         //console.log('GET: ' + posty);
//         res.json(posty);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
//     console.log('...after GET Event called...');
// });

//get events by machine id
// app.get('/events/:m_id', async (req, res) => {
// 	try {
// 		console.log('event by MiD: ' + req.params.m_id);
// 		const machineEvents = await Event.find({
// 			machine_id : req.params.m_id
// 		}).sort({
// 			date : 1
// 		});
// 		//console.log(res.json(specificMachinePost));
// 		res.json(machineEvents);
// 	} catch (err) {
// 		res.json({
// 			message : err
// 		});
// 	}
// 	console.log('...after GET Event for machine_id ...');
// });

//for posting names equivalent to machine_ids
//submits a post
// app.post('/names', async (req, res) => {
// 	const namez = new Names({
// 		name       : req.body.name,
// 		machine_id : req.body.machine_id
// 	});

// 	try {
// 		const savedPost = await namez.save();
// 		res.json(savedPost);
// 	} catch (err) {
// 		res.send({
// 			message : err
// 		});
// 	}
// });

//getting back names
// app.get('/names', async (req, res) => {
// 	try {
// 		const posty = await Names.find().sort({
// 			date : 1
// 		});
// 		//console.log('GET: ' + posty);
// 		res.json(posty);
// 	} catch (err) {
// 		res.json({
// 			message : err
// 		});
// 	}
// 	console.log('...after /names called...');
// });

//connect to db
//https://hackernoon.com/deploying-a-node-app-on-amazon-ec2-d2fb9a6757eb
//You don’t need “dotenv” to read the environment variables. Set the variables in your .bash_profile you should be able to see that process.env.MYAPIKEY no problem.
mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true
    },
    () => {
        console.log('connected to cloud db - MongoDB Atlas');
    }
);
// app.use(express.static('img'));

//start listening to server
app.listen(PORT);
// process.env.PORT ||
// process.env.DB_CONNECTION