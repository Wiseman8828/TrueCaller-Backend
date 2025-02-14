const express = require('express');
const router = express.Router();
const { execute } = require('../DBConnection/mySQL')
const { generateRandomData } = require('../Script/fakeInsertion')
const { insertUser } = require('../Constants/queryConstant')
 
// GET all users
router.get('/', async (req, res) => {
  try {
    let response = await execute(`Select * from Users`)
    const fakeData = generateRandomData()
    console.log(fakeData)
    res.send(fakeData)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { name, phoneNumber, email } = req.body;
    const newUser = await db.User.create({ name, phoneNumber, email });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/insert', async (req, res) => {
    try {
        let userCount = req.query.userCount
        while(userCount) {
            const fakeData = generateRandomData()
            
            execute(insertUser, [fakeData])
            userCount--
        }
    } catch (error) {
        console.log(error)
        res.status(409).send(409, 'Internal server error')
    }
    
})

module.exports = router;
