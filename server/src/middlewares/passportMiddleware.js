import { Types } from 'mongoose';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/index.js';

const { APP_SECRET } = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: APP_SECRET,
};

export const passportMiddleware = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      // eslint-disable-next-line no-underscore-dangle
      const id = Types.ObjectId(jwtPayload._id);
      User.aggregate([
        {
          $match: { _id: id },
        },
        {
          $project: {
            password: 0,
          },
        },
      ]).exec((err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          // console.log(user);
          return done(null, user[0]);
        } else {
          return done(null, false);
        }
      });
    }),
  );
};
