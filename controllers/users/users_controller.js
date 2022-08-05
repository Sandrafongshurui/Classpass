const bcrypt = require("bcrypt");
const userModel = require("../../models/users/users");
const lessonModel = require("../../models/lessons/lessons");
const userValidators = require("../validators/users");

const controller = {
  //this is a modal
  showRegistrationForm: (req, res) => {
    res.render("pages/register");
  },

  signUp: async (req, res) => {
    console.log(req.body);
    //problem 1
    //convert the body.role radio into a string
    console.log(req.body.role.value);

    // Front end Joi validations in validators
    const validationResults = userValidators.register.validate(req.body);

    if (validationResults.error) {
      res.send(validationResults.error);
      console.log(validationResults.error);
      return;
    }

    //backend validation
    const validatedResults = validationResults.value;
    // hash the password
    const hash = await bcrypt.hash(validatedResults.password, 10);

    // create the user and store in db
    //using mongoose lib auto creat and store in dbs
    try {
      await userModel.create({
        firstname: validatedResults.firstname,
        lastname: validatedResults.lastname,
        email: validatedResults.email,
        hash: hash, //put in the hash, not the plan text pass word
        credits: 10,
        role: req.body.role,
      });
    } catch (err) {
      console.log(err);
      res.send("failed to create user");
      return;
    }
    res.send("user created");
    // res.redirect('/users/login')
  },

  //this will need the modal
  showLoginForm: (req, res) => {
    res.render("pages/login", {
      errMsgName: "",
    });
    //res.send("show login form")
  },

  //actual log in
  //type in username and pw, req sent to server, server create session, session id returned
  //browser will store the cookie
  ///all subsequent request will contain the cookies

  login: async (req, res) => {
    // front end joi validations here ...
    const validationResults = userValidators.login.validate(req.body);

    if (validationResults.error) {
      res.send(validationResults.error);
      //console.log(validationResults.error);
      return;
    }

    //backend validation
    const validatedResults = validationResults.value;
    let user = null;

    // get user with email from DB, user model is the mongoose lib to interact with db
    try {
      user = await userModel.findOne({ email: validatedResults.email });
      //null is when is incorrect infomation
      if (results === null) {
        res.send("failed to get user");
        return;
      }
      console.log(user);
    } catch (err) {
      res.send("failed to get user");
      return;
    }

    // use bcrypt to compare the given password with the one store as has in DB

    const pwMatches = await bcrypt.compare(
      validatedResults.password,
      user.hash
    );

    if (!pwMatches) {
      res.send("incorrect password");
      return;
    }
    // log the user in by creating a session
    //guard against sessions fixations
    req.session.regenerate(function (err) {
      if (err) {
        res.send("unable to regenerate session");
        return;
      }

      // store user information in session, typically a user id
      req.session.user = user._id;

      // backend send -> s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo
      // front saves as cookie
      // subsequent req. to backend -> included the cookie in request: s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        // console.log(req.session)
        console.log("log in sucessfully");
        //res.redirect('/')
        res.send("im loged in");
      });
    });
  },
  //oncce cookies is stores, it will persist
  //subsequest request will conatin the cookies
  showShoppingCartTab: async (req, res) => {
    //empty shopping cart
    console.log(req.params)
   
      //add the lesson to the shopping cart
      const lesson = await lessonModel.findById({ _id: req.params.lesson_id });
      res.render("users/shopping-cart", {
        lesson,
        user: "62e5fbc02fadae2aaa65e636",
      });
    
  },
  // showEmptyShoppingCartTab: async (req, res) => {
  //   //empty shopping cart
  //   console.log(req.params)
   
  //     //add the lesson to the shopping cart
  //     const lesson = await lessonModel.findById({ _id: req.params.lesson_id });
  //     res.render("users/shopping-cart", {
  //       lesson,
  //       user: "62e5fbc02fadae2aaa65e636",
  //     });
    
  // },

  showThankYouMessage: async (req, res) => {
    //front end authentication is the auth middle ware, authen the cookies is avail
    //add user to the students
    //decrease lesson capacity
    let user = null;
    try {
      const lesson = await lessonModel.findOneAndUpdate(
        { _id: req.params.lesson_id },
        { $push: { students: req.session.user } },
        { $inc: { capacity: -1 } }
      );
      console.log(lesson);

      user = await userModel.findOneAndUpdate(
        { _id: req.session.user },
        { $inc: { credits: -lesson.credits } },
        { new: true } //new means it will return teh update doc, if not it will return doc b4 updates
      ); //depends on wad u save in your login for user
      console.log(user);
    } catch (err) {
      console.log(err);
      res.redirect("/login", { user });
      return;
    }

    res.render("users/shopping-cart-message", {user: "62e5fbc02fadae2aaa65e636",});
  },
  showDashboard: (rw, res) => {
    //verify that the session user exits, this is put in a aseparte middleware.js and inserted in teh server.js
    // if(!req.session.user){
    //     res.send("you are not autheticated")
    //     return
    // }
    res.send("welcome to your protected dashboard");
  },

  showProfile: async (req, res) => {
    //verify that the session user exits, this is put in a aseparte middleware.js and inserted in teh server.js
    // if(!req.session.user){
    //     res.send("you are not autheticated")
    //     return
    // }

    // get user data from db using session user
    let user = null;

    try {
      user = await userModel.findOne({ email: req.session.user }); //use mongoose library to find
    } catch (err) {
      console.log(err);
      res.redirect("/users/login");
      return;
    }

    res.render("users/profile", { user });
  },

  logout: async (req, res) => {
    //invalidate the session, not clear, means theres still a session use no user saved inside
    req.session.user = null;
    //so the currents session is invalid
    req.session.save(function (err) {
      if (err) {
        res.redirect("/users/login");
        return;
      }

      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) {
          res.redirect("/users/login");
          return;
        }

        // res.redirect('/')
        res.send("logged out");
      });
    });
  },
};

module.exports = controller;
