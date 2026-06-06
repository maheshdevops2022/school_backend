const bcrypt = require("bcryptjs");

bcrypt.hash("student", 10).then((hash) => {
  console.log(hash);
});

