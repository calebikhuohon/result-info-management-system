import passport from "passport";
import { UserModel } from "./../api/User/userModel";
import { AppError } from "./../utils/app-error";

/**
 * middleware for checking authorization with jwt
 */
export const authorize = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (error, token) => {
    if (error || !token) {
      console.log("error and token: ", error, token);
      return next(new AppError("Unauthorized", null, 401));
    }
    try {
      const user = await UserModel.findOne({ username: token.username }).exec();
      if (!user) {
        return next(new AppError("Unauthorized", null, 401));
      }
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
