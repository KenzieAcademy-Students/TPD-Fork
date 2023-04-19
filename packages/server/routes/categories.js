const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").get((req, res) => {
  return res.json([
    {
      id: 1,
      title: "Occaecati Natus Quibusdam",
    },
  ]);
});

module.exports = router;
