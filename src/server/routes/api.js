const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');


// router.post('/', (req, res) => {
//     const user = new Admin({
//         username: req.body.username,
//         password: req.body.password
//     });

//     user.save()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json({ message: err })
//         })
// })

const {
    userRegister,
  } = require("./auth");
  
  router.post('/register', (req, res) => {
    userRegister(req.body, "user", res);
  })

router.post('/login', (req, res) => {
    let userData = req.body
    Admin.findOne({ username: userData.username }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid Username')
            } else
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
                }
        }
    })
})

router.get('/:id', async (req, res) => {
    try {
      const user = await Admin.findById(req.params.id);
      res.send(user);
    } catch {
      res.json({ message: err });
    }
});

module.exports = router