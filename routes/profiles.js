const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Profiles = require('../models/Profile');

router.use(bodyParser.json());

//gets back all the posts
router.get('/', async (req, res) => {
    //res.send('we are on posts route');
    try {
        const posty = await Profiles.find().sort({
            date: 1
        });
        //console.log('GET: ' + posty);
        res.json(posty);
    } catch (err) {
        res.json({
            message: err
        });
    }
    console.log('...after GET route called...');
});

//gets back specific machine's data based on machine_id
router.get('/:postId', async (req, res) => {
    try {
        console.log('MiD: ' + req.params.postId);
        //console.log(res.json());
        //console.log('response');
        const specificMachinePost = await Profiles.find({
            machine_id: req.params.postId
        }).sort({
            date: 1
        });
        res.json(specificMachinePost);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//gets back unique machine_id
//changed dropdown to use name instead of machine_id
router.get('/machine/machine_ids', async (req, res) => {
    try {
        const uniqueMachineId = await Profiles.distinct(
            "machine_id"
        );
        res.json(uniqueMachineId);
        console.log('these are unique ids:' + uniqueMachineId);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//submits a post
router.post('/', async (req, res) => {
    const post = new Profiles({
        name: req.body.name,
        date: req.body.date,
        email: req.body.email,
        avatar: req.body.avatar,
        data: req.body.data,
        password: req.body.password
    });
    //console.log(things);

    try {
        const savedPost = await post.save();
        //res.type('json');
        res.json(savedPost);
    } catch (err) {
        res.send({
            message: err
        });
    }
});



//submits array of post
router.post('/array', async (req, res) => {
    //console.log(req.body);
    var tables = req.body;
    var savedPost = [];
    console.log(tables);

    for (var i = 0; i < tables.length; i++) {

        var name1 = tables[i].name;
        var data1 = tables[i].data;
        var date1 = tables[i].date;
        var swVer = tables[i].sw_version;
        var machineId = tables[i].machine_id;

        const post = await new Post({
            name: name1,
            data: data1,
            date: date1,
            sw_version: swVer,
            machine_id: machineId
        });

        //try to push each tablename to db
        savedPost.push(post);
        post.save();
    }
    res.json(savedPost);
});

//deletes post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Profiles.deleteOne({
            _id: req.params.postId
        });
        res.json(removedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//updates a post
// router.patch('/:postId', async (req, res) => {
//   try {
//     await Post.updateOne({
//       _id: req.params.postId
//     }, {
//       $set: {
//         cpu: req.body.cpu,
//         memory: req.body.memory,
//         temperature: req.body.temperature
//       }
//     });
//     res.json(updatedPost);
//   } catch (err) {
//     res.json({
//       message: err
//     });
//   }
// });

module.exports = router;