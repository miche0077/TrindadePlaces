const yup = require("yup");

const validation = yup.object().shape({
  name: yup
    .string("O nome deve ser uma String")
    .required("O nome é necessário!"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha incorreta"),
  email: yup
    .string()
    .email("Precisa ser um email valido")
    .required("O email deve ser inserido"),
  username: yup.string().required("O username é necessário "),
});

function validateNewUser(request, response, next) {
  try {
    validation.validateSync(request.body);
    next();
  } catch (error) {
    response.status(400).json({ message: error.message });
    console.log(error.message);
  }
}

module.exports = validateNewUser;
