const bcrypt = require("bcrypt");
const userModel = require("../../models/users/users");
const lessonModel = require("../../models/lessons/lessons");
const userValidators = require("../validators/users");

const controller = {
  showSignUpForm: (req, res) => {
    res.render("pages/signup", {
      errorObject: {},
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  },

  signUp: async (req, res) => {
    // Front end Joi validations in validators
    const validationResults = userValidators.register.validate(req.body, {
      abortEarly: false,
    });

    console.log(req.body);
    let errorObject = {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      confirmpassword: null,
    };
    if (validationResults.error) {
      //email = error message
      console.log(validationResults.error);
      validationResults.error.details.forEach((detail) => {
        errorObject[detail.context.key] = detail.message;
      });

      res.render("pages/signup", {
        ...req.body,
        errorObject,
      });
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
        role: validatedResults.role,
      });
    } catch (err) {
      console.log(err);
      res.send("failed to create user");
      return;
    }
    res.redirect("/login");

    // // log the user in by creating a session
    // //guard against sessions fixations
    // req.session.regenerate(function (err) {
    //   if (err) {
    //     res.send("unable to regenerate session");
    //     return;
    //   }

    //   // store user information in session, typically a user id
    //   req.session.user = user._id;
    //   req.session.username = user.firstname;

    //   // backend send -> s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo
    //   // front saves as cookie
    //   // subsequent req. to backend -> included the cookie in request: s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo

    //   // save the session before redirection to ensure page
    //   // load does not happen before session is saved
    //   req.session.save(function (err) {
    //     if (err) {
    //       return next(err);
    //     }
    //     // console.log(req.session)
    //     console.log("log in sucessfully");
    //     res.redirect("/");
    //   });
    // });
  },

  login: async (req, res, next) => {
    // front end joi validations here ...
    const validationResults = userValidators.login.validate(req.body, {
      abortEarly: false,
    });
    console.log(req.body);
    let errorObject = {
      email: null,
      password: null,
    };
    if (validationResults.error) {
      //email = error message
      validationResults.error.details.forEach((detail) => {
        errorObject[detail.context.key] = detail.message;
      });

      res.render("pages/login", {
        signUpMsg: "",
        ...req.body,
        errorObject,
      });
      return;
    }

    //backend validation
    const validatedResults = validationResults.value;
    let user = null;

    // get user with email from DB, user model is the mongoose lib to interact with db
    try {
      user = await userModel.findOne({ email: validatedResults.email });
      //null is when is incorrect infomation
      if (user === null) {
        errorObject.email = "The email you entered is incorrect";
        res.render("pages/login", {
          signUpMsg: "",
          ...req.body,
          errorObject,
        });
        return;
      }
    } catch (err) {
      res.render("page/404", { title: "Sorry, page not found" });
    }

    // use bcrypt to compare the given password with the one store as has in DB
    const pwMatches = await bcrypt.compare(
      validatedResults.password,
      user.hash
    );

    if (!pwMatches) {
      console.log(req.body);
      errorObject.password = "The password you entered is incorrect";
      res.render("pages/login", {
        signUpMsg: "",
        ...req.body,
        errorObject,
      });
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
      req.session.username = user.firstname;

      // backend send -> s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo
      // front saves as cookie
      // subsequent req. to backend -> included the cookie in request: s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save(function (err) {
        if (err) {
          return next(err);
        }
        console.log("log in sucessfully");
        console.log("redirect to", res.locals.redirect);
        res.redirect(res.locals.redirect);
      });
    });
  },

  showLoginForm: (req, res) => {
    console.log(req.path);
    res.render("pages/login", {
      signUpMsg: "Your sign up is successfull, please log in to continue.",
      email: "",
      password: "",
      errorObject: {},
    });
  },

  //actual log in
  //type in username and pw, req sent to server, server create session, session id returned
  //browser will store the cookie
  ///all subsequent request will contain the cookies

  // login: async (req, res) => {
  //   // front end joi validations here ...
  //   const validationResults = userValidators.login.validate(req.body, {abortEarly : false});
  //   console.log(req.path);
  //   if (validationResults.error) {
  //     console.log(validationResults.error.details);
  //     console.log(validationResults.error.details[0].message);
  //     console.log(validationResults.error.details[1].message);

  //     let errorObject = {
  //       email: null,
  //       password: null,
  //     }
  //     //email = error message
  //     error.details.forEach(detail => {
  //         errorObject[detail.context.key] = detail.message
  //     })

  //     //set loginerror to true
  //     req.app.locals.validationErrors = errorObject
  //     req.app.locals.loginError = true;
  //     //redirect to where it came from, could be any path
  //     res.redirect(req.path);
  //     return;
  //   }

  //   //backend validation
  //   const validatedResults = validationResults.value;
  //   let user = null;

  //   // get user with email from DB, user model is the mongoose lib to interact with db
  //   try {
  //     user = await userModel.findOne({ email: validatedResults.email });
  //     //null is when is incorrect infomation
  //     if(user === null){
  //       res.send("failed to get user");
  //       return;
  //     }
  //   } catch (err) {
  //     res.send("failed to get user");
  //     return;
  //   }

  //   // use bcrypt to compare the given password with the one store as has in DB

  //   const pwMatches = await bcrypt.compare(
  //     validatedResults.password,
  //     user.hash
  //   );

  //   if (!pwMatches) {
  //     res.send("incorrect password");
  //     return;
  //   }
  //   // log the user in by creating a session
  //   //guard against sessions fixations
  //   req.session.regenerate(function (err) {
  //     if (err) {
  //       res.send("unable to regenerate session");
  //       return;
  //     }

  //     // store user information in session, typically a user id
  //     req.session.user = user._id;
  //     req.session.username = user.firstname;
  //     req.app.locals.loginError = null;
  //     // backend send -> s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo
  //     // front saves as cookie
  //     // subsequent req. to backend -> included the cookie in request: s%3A2v3yqeOSO-bgFCRHfk3KeVF90M84M0_a.IV4EbakG06Zakhhe3p1GR9FD%2FiFpFv9tDxYKgYwx6Qo

  //     // save the session before redirection to ensure page
  //     // load does not happen before session is saved
  //     req.session.save(function (err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       console.log("log in sucessfully");
  //       res.redirect(req.path);
  //     });
  //   });
  // },

  showHistory: async (req, res) => {
    //show user past classes
    //get todays date, check which lessons has pass the date of lessom, if pass
    //it shld be in the history, sort accroding to lates class first
    //populate reviews section to see if user has reviewed this class before
    let lessons = [];

    const today = new Date();
    const time = today.toLocaleString("en-US", { timeZone: "Singapore" });
    console.log(time);

    try {
      lessons = await lessonModel
        .find({ students: req.session.user, lessonDate: { $lte: new Date() } })
        .sort({ lessonDate: -1 })
        .populate({
          path: "reviews",
          match: { user: req.session.user },
        });
    } catch (err) {
      console.log(err);
      res.redirect("/");
      return;
    }
    console.log(new Date());
    console.log(lessons[0]);
    res.render("users/history", {
      lessons,
      // user: req.session.user,
    });
  },
  showUpcomingLessons: async (req, res) => {
    //find student in the lessons model, they were added in when they booked class
    let lessons = [];
    console.log(req.session.user);
    try {
      lessons = await lessonModel.find({
        students: req.session.user,
        lessonDate: { $gte: new Date() },
      });
      console.log(lessons);
    } catch (err) {
      console.log(err);
      res.redirect("/login");
      return;
    }

    res.render("users/upcoming", {
      lessons,
      // username: req.session.user
    });
  },
  deleteUpcomingLesson: async (req, res) => {
    //remove student from lesson
    //add back capacity to lesson
    //add back credits to user
    let lesson = null;
    let user = null;
    console.log(req.query.lesson);
    try {
      lesson = await lessonModel.findByIdAndUpdate(
        { _id: req.params.lesson_id },
        { $pull: { students: req.session.user }, $inc: { capacity: -1 }},
        { new: true }
      );

      user = await userModel.findOneAndUpdate(
        { _id: req.session.user },
        { $inc: { credits: lesson.credits } },
        { new: true } //new means it will return teh update doc, if not it will return doc b4 updates
      ); //depends on wad u save in your login for user
    } catch (err) {
      console.log(err);
      // res.redirect("/login", { user });
      return;
    }

    res.redirect(`/users/upcoming`);
  },
  //oncce cookies is stores, it will persist
  //subsequest request will conatin the cookies
  showShoppingCartTab: async (req, res) => {
    console.log(req.params);
    let lesson = null;
    try {
      //add the lesson to the shopping cart
      lesson = await lessonModel.findById({ _id: req.params.lesson_id });
    } catch (err) {
      console.log(err);
      res.redirect("/login");
      return;
    }
    res.render("users/shopping-cart", {
      lesson,
      // user: req.session.user
    });
  },

  showEmptyCart: async (req, res) => {
    res.render("users/shopping-cart-message", {
      message: "Your shopping cart is currently empty, book some classes now!",
      buttonText: "Find Classes",
      buttonLink: "/studios"
      // user: req.session.user
    });
  },
  confirmBooking: async (req, res) => {
    //front end authentication is the auth middle ware, authen the cookies is avail
    //add user to the students
    //decrease lesson capacity
    let user = null;
    let lesson = null;

    try {
      lesson = await lessonModel.findOneAndUpdate(
        //make sure that the lesson has capacity, ppl might book while user stays on the page
        { _id: req.params.lesson_id, capacity: {$lte : 9 } },
        { $push: { students: req.session.user },  $inc: { capacity: 1 } },
        { new: true }
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
      res.redirect("users/shopping-cart-message",{
        message: "An error has occured! you may try to book your class again.",
        buttonText: "Find Classes",
        buttonLink: "/studios"
      });
      return;
    }

    res.render("users/shopping-cart-message", {
      message: "Thank you! View You upcoming lessons!",
      buttonText: "View Upcoming",
      buttonLink: "/users/upcoming"
      
    });
  },

  showProfile: async (req, res) => {
    let user = null;
    try {
      if (req.body){
        user = await userModel.findByIdAndUpdate(
          { _id: req.session.user },
          { $set: { ...req.body } },
          {new: true}
        );
        req.session.username = user.firstname;
      }else{
        user = await userModel.findById({ _id: req.session.user });
      }
    } catch (err) {
      console.log(err);
      res.redirect("/login");
      return;

    }
    
    res.render("users/profile", {
      user,
    });
  },

  editProfile: async (req, res) => {
    // let user = null;
    //if someone tries to go edit page straight
    if (!req.body) {
      res.redirect("/users/prodile");
      return;
    }
    console.log(req.body)

    res.render("users/profile-edit", {
      user: req.body,
    });
  },

  logout: async (req, res) => {
    //invalidate the session, not clear, means theres still a session use no user saved inside
    req.session.user = null;
    req.session.username = null;
    //so the currents session is invalid
    req.session.save(function (err) {
      if (err) {
        res.redirect("/login");
        return;
      }

      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) {
          res.redirect("/login");
          return;
        }

        res.redirect("/");
      });
    });
  },
};

module.exports = controller;
