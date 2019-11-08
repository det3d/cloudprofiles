const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');

router.use(bodyParser.json());

//gets back all the users
router.get('/', async (req, res) => {
    //res.send('we are on posts route');
    try {
        const posty = await User.find().sort({
            date: 1
        });
        console.log('GET / : ' + posty);
        res.json(posty);
    } catch (err) {
        res.json({
            message: err
        });
    }
    console.log('...after GET route called - Users...');
});

//gets back specific id based on drivers license
router.get('/driverslicense/:userId', async (req, res) => {
    try {
        console.log('DriversLicense_ID: ' + req.params.userId);
        const specificUser = await User.find({
            driverslicense: req.params.userId
        }).sort({
            date: 1
        });
        res.json(specificUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//gets back specific id based on email
router.get('/email/:userId', async (req, res) => {
    try {
        console.log('Email_ID: ' + req.params.userId);
        const specificUser = await User.find({
            email: req.params.userId
        }).sort({
            date: 1
        });
        res.json(specificUser);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//gets back unique machine_id
//changed dropdown to use name instead of machine_id
// router.get('/machine/machine_ids', async (req, res) => {
//     try {
//         const uniqueMachineId = await User.distinct(
//             "machine_id"
//         );
//         res.json(uniqueMachineId);
//         console.log('these are unique ids:' + uniqueMachineId);
//     } catch (err) {
//         res.json({
//             message: err
//         });
//     }
// });

//submits a post
router.post('/', async (req, res) => {
    const post = new User({
        name: req.body.name,
        date: req.body.date,
        email: req.body.email,
        avatar: req.body.avatar,
        password: req.body.password,
        driverslicense: req.body.driverslicense,
        licenseplate: req.body.licenseplate,
        data: req.body.data
    });

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

        const post = await new Post({
            name: name1,
            data: data1,
            date: date1
        });

        //try to push each tablename to db
        savedPost.push(post);
        post.save();
    }
    res.json(savedPost);
});

//deletes post
router.delete('/:userId', async (req, res) => {
    try {
        const removedPost = await User.deleteOne({
            _id: req.params.userId
        });
        res.json(removedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//updates a post
// router.patch('/:userId', async (req, res) => {
//   try {
//     await Post.updateOne({
//       _id: req.params.userId
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