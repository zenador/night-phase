Meteor.methods({
	'findGame': function(query) {
		var game = Games.findOne(query);
		return game;
	},
	'getPlayersSameName': function(gameID, playerName) {
		var playersSameName = Players.find({gameID: gameID, name: playerName}).count();
		return playersSameName;
	},
	'findPlayer': function(query) {
		var player = Players.findOne(query);
		return player;
	},
	'findPlayerAndGame': function(query) {
		var player = Players.findOne(query);
		if (player)
			var game = Games.findOne(player.gameID);
		else
			var game = null;
		return [player, game];
	},
	'messageFromWeb': function(chatID, text) {
		messageFromWeb(chatID, text);
	},
	'messageKeyboardFromWeb': function(chatID, text, array) {
		messageKeyboardFromWeb(chatID, text, array);
	},
});
