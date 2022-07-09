const axios = require("axios");
const qs = require("qs");
const get = require("./get");

function sendMessage(number, message, bay) {
  const messageText = get.getMessageText(message, bay);
  const data = qs.stringify({
    number: number,
    message: messageText,
  });

  const config = {
    method: "post",
    url: "http://localhost:8000/send-message",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //console.log(config);
      successMessage = JSON.stringify(response.data);
      return successMessage;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });

  return;
}

function sendMessageGroups(name, message, bay) {
  const messageText = get.getMessageText(message, bay);
  const data = qs.stringify({
    name: name,
    message: messageText,
  });

  const config = {
    method: "post",
    url: "http://localhost:8000/send-group-message",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //console.log(config);
      successMessage = JSON.stringify(response.data);
      return successMessage;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });

  return;
}

function sendMessageError(number, message) {
  const data = qs.stringify({
    number: number,
    message: message,
  });

  const config = {
    method: "post",
    url: "http://localhost:8000/send-message",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //console.log(config);
      successMessage = JSON.stringify(response.data);
      return successMessage;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });

  return;
}

module.exports = {
  sendMessage: sendMessage,
  sendMessageGroups: sendMessageGroups,
  sendMessageError: sendMessageError,
};
