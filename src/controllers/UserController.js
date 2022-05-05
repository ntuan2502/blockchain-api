const UserService = require("../services/UserService");

class UserController {
  // [GET] /user/profile
  async profile(req, res) {
    const userService = new UserService();
    const userId = req.user._id;
    const code = res.statusCode;
    return res.send(await userService.profile(userId, code));
  }

  // [POST] /user/send
  async send(req, res) {
    const userService = new UserService();
    const userId = req.user._id;
    const body = req.body;
    const code = res.statusCode;
    return res.send(await userService.send(userId, body, code));
  }
  // [GET] /user/transaction
  async transaction(req, res) {
    const userService = new UserService();
    const userId = req.user._id;
    const code = res.statusCode;
    return res.send(await userService.transaction(userId, code));
  }
  // [GET] /user/getBlock
  async getBlock(req, res) {
    const userService = new UserService();
    const userId = req.user._id;
    const code = res.statusCode;
    return res.send(await userService.getBlock(userId, code));
  }
  // [GET] /user/findAllBlock
  async findAllBlock(req, res) {
    const userService = new UserService();
    const userId = req.user._id;
    const code = res.statusCode;
    return res.send(await userService.findAllBlock(userId, code));
  }
}
module.exports = new UserController();
