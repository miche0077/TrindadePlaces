const User = require("../../models/users");
const jwt = require("jsonwebtoken");

require('dotenv').config()
async function createLogin(request, response) {
  try {
    const userInDataBase = await User.findOne({
      where: {
        username: request.params.username,
      },
    });

    if (!userInDataBase) {
      return response.status(404).json({ message: "credenciais incorretas" });
    }

    const verifyPassword = await User.findOne({
      where: {
        password: request.params.password,
      },
    });

    if (!verifyPassword) {
      return response.status(404).json({ message: "confira suas informações" });
    }
    const token = jwt.sign(
      {
        id: userInDataBase.id,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    response.json({ name: userInDataBase.username, token: token });
  } catch (error) {
    response.status(500).json({ message: "Solicitação não processada" });
  }
}
module.exports = createLogin;
