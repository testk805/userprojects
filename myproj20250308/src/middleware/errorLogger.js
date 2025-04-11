const fs = require('fs');

exports.logError = (error) => {
  const errorMessage = `${new Date().toISOString()} - ${error.message}\n`;
  fs.appendFileSync('error.log', errorMessage);
};