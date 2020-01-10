const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { check, validationResult } = require('express-validator');
require('./passport');

function generateJWTToken(user) {
    return jwt.sign(user, jwtSecret, {
        subject: user.username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
}

module.exports = (router) => {
    router.post('/login',
        [
            check("Username", "username is required").isLength({ min: 5 }),
            check("Username", "username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
            check("Password", "password is required").not().isEmpty()
        ],
        (req, res) => {
            //check validation object for errors
            let errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            passport.authenticate('local', { session: false }, (error, user, info) => {
                if (error || !user) {
                    return res.status(400).json({
                        message: 'Something is not right',
                        user: user
                    });
                }
                req.login(user, { session: false }, (error) => {
                    if (error) {
                        res.send(error);
                    }
                    let token = generateJWTToken(user.toJSON());
                    return res.json({ user, token });
                });
            })(req, res);
        });
}

