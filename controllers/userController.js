const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime, // middleware we created
    results: users.length,
    data: { users },
  });
};

exports.getSingleUser = (req, res) => {
  const userID = req.params.id;
  const singleUser = users.find((user) => user._id === userID);
  if (!singleUser)
    return res.status(400).json({
      status: 'fail',
      message: `No user matches the id: ${userID}`,
    });
  res.status(200).json({
    status: 'success',
    data: { singleUser },
  });
};

exports.createUser = (req, res) => {};
exports.updateUser = (req, res) => {};
exports.deleteUser = (req, res) => {};
