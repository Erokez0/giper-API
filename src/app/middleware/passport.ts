import passport from "passport";
import * as passportStrategy from "passport-http-bearer"
import { myDataSource } from "../data_source/data_source";
import { User } from "../../entity/users";
import { NextFunction } from "express";
const BearerStrategy = passportStrategy.Strategy;

passport.use(new BearerStrategy(
    async function(token: any, done: any) {
        let user;
        try {
            user = await myDataSource.getRepository(User).findOneByOrFail({token: token});
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'read' });
        }
        catch (err) {
            return done(null, false);
        }


        // await myDataSource.getRepository(User).findOneByOrFail({token: token}), async function (err: any, user: any) {
        //     if (err) { return done(err); }
        //     if (!user) { return done(null, false); }
        // return done(null, user, { scope: 'read' });
        // }; 
    }
));
