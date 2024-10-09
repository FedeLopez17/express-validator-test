const usersStorage = require("../storages/usersStorage");

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
};

exports.userGetById = (req, res) => {
  const { id } = req.params;

  const user = usersStorage.getUser(id);

  if (user) {
    res.render("user", {
      user,
    });
  } else {
    res.status(404).render("404");
  }
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create User",
  });
};

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be valid";
const ageErr = "must be between 0 and 120";
const bioErr = "should be less than 200 characters";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),

  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }),

  body("email").isEmail().withMessage(`Email ${emailErr}`),

  body("age")
    .optional({ values: "falsy" })
    .isInt({ min: 0, max: 120 })
    .withMessage(`Age ${ageErr}`),

  body("bio")
    .optional({ values: "falsy" })
    .isLength({ min: 0, max: 200 })
    .withMessage(`Bio ${bioErr}`),
];

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create User",
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  },
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update User",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update User",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    });
    res.redirect("/");
  },
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.usersSearch = (req, res) => {
  const { search } = req.query;

  res.render("index", {
    title: "Search Result",
    search,
    users: usersStorage.findByNameOrEmail(search),
  });
};
