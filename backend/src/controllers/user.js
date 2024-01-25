import * as UserService from "../services/user.js";
export const addUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.checkUser(email);
    if (user) {
      return res.status(200).send({
        message: "This email has already been registered, please go to login",
        color: "red",
      });
    }
    const { savedUser, token } = await UserService.createNewUser(
      email,
      password
    );
    console.log(
      "controllers-user-addUser-savedUser.email",
      savedUser.email,
      "token",
      token
    );
    res.status(200).send({
      token: token,
      message: `Your new login is username: ${email} and the password you entered`,
      color: "teal",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUser = async (req, res, next) => {
  const { email, password } = req.query;
  try {
    const { checkUser, token } = await UserService.findUser(email, password);
    console.log("controllers-user-checkUser, token", checkUser, token);
    if (!checkUser) {
      return res.status(200).send({
        message: "Either your username or password are incorrect",
        color: "red",
      });
    }
    res.status(200).send({
      token: token,
      message: `You are now logged in with username ${email}`,
      color: "teal",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
