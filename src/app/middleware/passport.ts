import passport from "passport";
const BearerStrategy = require('passport-http-bearer').Strategy;
import { myDataSource } from "../data_source/data_source";
import { User } from "entity/users";

passport.use(new BearerStrategy(
    async function(token: any, done: any) {
        await myDataSource.getRepository(User).findOneByOrFail({token: token}), function (err: any, user: any) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
        return done(null, user, { scope: 'read' });
        }; 
    }
));