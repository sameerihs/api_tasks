const express = require("express");

const router = new express.Router();
// 21BAI1109
router.get("/bfhl", (req, res) => {
  try {
    res.status(200).json({ operation_code: 1 });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
});

router.post("/bfhl", (req, res) => {
  const { data } = req.body;
  const user_id = "Mohamed_Sameer_16062003";
  const email = "mdsameer2003@gmail.com";
  const roll_number = "21BAI1109";

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

  if (highest_alphabet.length > 0) {
    alphabets.push(highest_alphabet[0]);
  }
  // console.log({
  //   is_success: true,
  //   user_id,
  //   email,
  //   roll_number,
  //   numbers,
  //   alphabets,
  //   highest_alphabet,
  // });

  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_alphabet,
  });
});
module.exports = router;
