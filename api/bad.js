module.exports = (req, res, next) => {
  if (req.body?.todo?.includes("bad")) {
    return res.status(400).json({ error: "bad", message: "bad words not allowed" })
  }

  next()
}