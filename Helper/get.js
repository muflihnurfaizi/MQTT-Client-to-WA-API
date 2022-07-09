const fs = require("fs");
const dayjs = require("dayjs");
require("dayjs/locale/id");

function getData() {
  const file = "./Data/dataConfig.json";
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return data;
}

function getMessageText(message, bay) {
  try {
    const data = getData();
    let time = dayjs()
      .locale("id")
      .format("dddd[, ]DD/MM/YYYY [\nPukul ]HH:mm:ss");
    dataBay = data.bays[bay];
    console.log(dataBay);
    const messageText = data["messageHeader"].concat(
      "\n\n",
      data["substation"],
      "\n",
      time,
      "\n\n",
      dataBay["bayName"],
      ":\n",
      dataBay[message],
      "\n\n",
      data["messageFooter"]
    );
    console.log(messageText);
    return messageText;
  } catch (error) {
    console.log(error);
    return "Harap bersabar ... Coba di cek lagi";
  }
}

module.exports = {
  getData: getData,
  getMessageText: getMessageText,
};
