// Import package used
const importModules = require("import-modules");
const mqtt = require("mqtt");

// Connect to MQTT Broker
const MQclient = mqtt.connect("mqtt://broker.mqtt-dashboard.com:1883");

// Import module helper
const mod = importModules("./Helper");

// Get data from dataConfig
const dataReceivers = mod.get.getData();
const groupsNames = dataReceivers.groupsName;
const contacts = dataReceivers.contacts;
const topicSub = dataReceivers["topic"];

// Whwn MQTT Connected then subscribe to a topic
MQclient.on("connect", () => {
  MQclient.subscribe(topicSub, (err) => {
    if (!err) {
      mod.sendMessage.sendMessageGroups(`${groupsNames[0]}`, "conSuccess", "0");
      console.log("connected!");
    } else {
      console.log(err);
    }
  });
});

MQclient.on("message", (topic, message) => {
  try {
    const bay = topic.split("/")[1];
    groupsNames.forEach((groupsName) => {
      mod.sendMessage.sendMessageGroups(`${groupsName}`, message, bay);
    });
    contacts.forEach((contact) => {
      mod.sendMessage.sendMessage(`${contact}`, message, bay);
    });
  } catch (error) {
    console.log(error);
    contacts.forEach((contact) => {
      mod.sendMessage.sendMessage(
        `${contact}`,
        "Harap bersabar... Coba di cek lagi"
      );
    });
  }
});
