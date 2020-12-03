const { Router } = require("express");

//route instance
const router = Router();

const {
  addUser,
  updateUser,
  userDelete,
  viewAllUsers,
  viewAllUsersPagination,
  viewAllUsersDistance,
} = require("../controllers/userController");


router.post(
  "/addusredata",
  addUser
);


router.post(
  "/update",
  updateUser
);

router.post(
  "/deleteuser",
  userDelete
);

router.get("/viewallusers", viewAllUsers);

router.get("/viewwithpagination", viewAllUsersPagination);

router.get("/viewwithdistance", viewAllUsersDistance);

//exporting the user routes
module.exports = router;
