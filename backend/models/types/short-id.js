const { nanoid } = require("nanoid");

const shortId = {
  type: String,
  default: () => {
    return nanoid();
  },
  required: true,
  index: true,
};

module.exports = shortId;
