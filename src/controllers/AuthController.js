const AuthService = require("../services/AuthService");

class AuthController {
  // [POST] /auth/login
  async login(req, res) {
    const authService = new AuthService();
    const email = req.body.email;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(await authService.login(email, password, code));
  }

  // [POST] /auth/register
  async register(req, res) {
    const authService = new AuthService();
    const email = req.body.email;
    const password = req.body.password;
    const code = res.statusCode;
    return res.send(await authService.register(email, password, code));
  }
}

module.exports = new AuthController();
