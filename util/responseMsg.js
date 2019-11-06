class responseMessage {}
let rm = new responseMessage();

rm.NO_USER = { ErrorCode: 1, Message: "No User" };
rm.SUCCESS = "Success";
module.exports = rm;
