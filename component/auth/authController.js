const User = require('../User/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res, next) => {
        let {email, password} = req.body;

        const user = await User.find({email});
        if(user.length === 0)
            res.status(400).send({message:  "email does not exist"})
        else {
            // const result = bcrypt.compareSync(password, user[0].password);
            const result = password === user[0].password;
            if (result) {
                console.log(user[0]);
                const token = jwt.sign({_id: user[0]._id}, process.env.ACCESS_TOKEN_SECRET);
                res.status(200).send({
                    token,
                    user: user[0]
                })
            } else {
                res.status(400).send({message:  "password wrong"})
            }
        }



    }
}
