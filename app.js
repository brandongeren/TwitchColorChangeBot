var tmi = require('tmi.js')

var user = "";
var chan = "";

var options = {
	options: {
		debug: true
	},
	connection: {
		cluster: "aws",
		reconnect: true
	},
	identity: {
		username: user,
		password: ""
	},

	channels: [chan]
};

// Returns a random integer between 1 and 14
function getRandomIdx() {
  return Math.floor(Math.random() * 15);
}

var colors = new Map();
colors.set(0, "Blue");
colors.set(1, "BlueViolet");
colors.set(2, "CadetBlue");
colors.set(3, "Chocolate");
colors.set(4, "Coral");
colors.set(5, "DodgerBlue");
colors.set(6, "Firebrick");
colors.set(7, "GoldenRod");
colors.set(8, "Green");
colors.set(9, "HotPink");
colors.set(10, "OrangeRed");
colors.set(11, "Red");
colors.set(12, "SeaGreen");
colors.set(13, "SpringGreen");
colors.set(14, "YellowGreen");

var color = -1;
var lastColor = -1;


var client = new tmi.client(options);
client.connect();


client.addListener("message", function (channel, userstate, message, self) {
	// only listen to own messages
	if (userstate["display-name"] == user) {
		while (lastColor == color) {
			color = colors.get(getRandomIdx());
		}
		lastColor = color;
		client.color(color);
	}

});

