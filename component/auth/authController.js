const User = require('../user//userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res, next) => {
        let {email, password} = req.body;

        const user = await User.find({email});
        if (user.length === 0)
            return res.status(400).send({message: "email does not exist"})

        // const result = bcrypt.compareSync(password, user[0].password);
        const result = password === user[0].password;
        if (!result) {
            return res.status(400).send({message: "password wrong"})
        }

        if(!user[0].isAdmin) {
            return res.status(400).send({message: "you dont have permission to login this page"})
        }

        // console.log(user[0]);
        const token = jwt.sign({_id: user[0]._id}, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).send({
            token,
            user: user[0]
        })
    }
}
