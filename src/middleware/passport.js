
import _ from "lodash";
import { ExtractJwt, Strategy as JWTstrategy } from "passport-jwt";
import { JWT_SECRET, APP_URL } from "./../config/index";

export const jwtStrategy = new JWTstrategy({
    secretOrKey: JWT_SECRET,
    issuer: APP_URL,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
    // Pass the user details to the next middleware
    return done(null, token.user);
});
