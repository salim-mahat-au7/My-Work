const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

//model
const Owner = require("../models/owner");

//secret key
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = (passport) => {
  try {
    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        const owner = await Owner.findById(jwt_payload.id);
        if (owner) {
          return done(null, owner);
        }
      })
    );
  } catch (error) {
    console.log("Error");
  }
};
