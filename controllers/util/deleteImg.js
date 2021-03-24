const fs = require(`fs`);

exports.deleteImg = (fileName) => {
  try {
    fs.unlinkSync(`static/uploads/${fileName}`);
    console.log(`succesfully deleted`);
  } catch (err) {
    console.log(err);
  }
};
