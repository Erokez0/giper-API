import passport from "passport";
import * as passportStrategy from "passport-http-bearer"
import { myDataSource } from "../data_source/data_source";
import { User } from "../../entity/users";

const BearerStrategy = passportStrategy.Strategy;

passport.use(new BearerStrategy(
    async function(token: any, done: any) {
        await myDataSource.getRepository(User).findOneByOrFail({token: token}), function (err: any, user: any) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
        return done(null, user, { scope: 'read' });
        }; 
    }
));