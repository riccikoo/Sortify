exports.checkAuth = (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, userId: req.session.userId, role: req.session.role });
  } else {
    res.json({ loggedIn: false });
  }
};
