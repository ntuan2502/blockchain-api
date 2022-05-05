class IndexController {
  async index(req, res) {
    return res.json({
      code: 200,
      success: false,
      message: "Hello world!",
    });
  }
}

module.exports = new IndexController();
