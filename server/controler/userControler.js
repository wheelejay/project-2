// import './userModel.js';
// const User = db.users;
// const Op = db.Sequelize.Op;

// exports.create = (req, res) => {

//     if (!req.body.title) {
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//         return;
//     }


// const user = {
//     fname: req.body.fname,
//     lname: req.body.lname,
//     email: req.body.email,
//     password: req.body.password,
//     sweight: req.body.sweight,
//     gweight: req.body.gweight
// };

// User.create(user)
// .then(data => {
//     res.send(data)
// })
// .catch(err => {
//     message:
//     err.message || "Some error occured while creating the User. "
// });
// };

