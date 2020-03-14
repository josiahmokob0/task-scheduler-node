const login = async (ctx, req, res) => {
  const { passport, jwt } = ctx;
    passport.authenticate("local", { session: false }, (err, user, _) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid password/username"});
      }
      if (err) {
        return res.status(400).json({ message: "Something went wrong"});
      }
      const token = jwt.sign(user, process.env.SECRET);
      return res.status(200).json({ user, message: "login success" , token });
    })(req, res);
}

const signUp = async (ctx, req, res, next) => {
  const { db, jwt } = ctx;
  try {
    const user = await db.User.create(req.body);
    const { id, username, firstName, lastName } = user;
    const payload = { id, username, firstName, lastName };
    const token = jwt.sign(payload, process.env.SECRET);
    return res.status(201).json({ payload, message: "registration success", token });
  } catch(err) {
    next(err)
    return res.status(400).json({ message: "error in registration" });
  }
}

module.exports = {
  login,
  signUp,
}
