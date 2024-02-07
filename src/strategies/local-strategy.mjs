import passport, { strategies } from "passport";
import { Strategy } from "passport-local";
import { User } from "../mongoose/schemas/user.mjs";
import { checkPassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
  console.log("inside serialize user");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("inside deserialize user");
  console.log("deserialize", id);
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username });
      if (!findUser) throw new Error("User not found");
      console.log("@SN ", findUser);
      if (!checkPassword(password, findUser.password))
        throw new Error("Invalid credentialst");
      done(null, findUser);
    } catch (err) {
      console.log(err);
      done(err, null);
    }
  })
);
