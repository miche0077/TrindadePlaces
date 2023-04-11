//[M1S10] Ex 4 - Middleware JTW Validator
const jwt = require("jsonwebtoken");
require('dotenv').config()

function validateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token || token === "Bearer") {
    return res.status(403).json({ message: "Token ausente!" });
  }

  const tokenJwt = token.slice(7);

  jwt.verify(tokenJwt, process.env.TOKEN_KEY, (error, conteudoDoToken) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Atenção! Token expirado." });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(403).json({ message: "Token não está válido." });
      } else {
        return res.status(500).json({ message: "Erro interno do servidor" });
      }
    } else {
      req.body.userId = conteudoDoToken.id;
      next();
    }
  });
}

module.exports = validateToken;
