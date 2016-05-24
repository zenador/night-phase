Meteor.startup(function() {
/*
	WebFontConfig = {
		google: { families: [ 'Open+Sans:400,700:latin,latin-ext', 'Raleway:400,700'] }
	};
	(function() {
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
			'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
		//console.log("async fonts loaded", WebFontConfig);
	})();
*/
});

$( document ).ready(function() {
	var lastTouchY = 0;
	var preventPullToRefresh = false;

	$('body').on('touchstart', function (e) {
		if (e.originalEvent.touches.length != 1) { return; }
		lastTouchY = e.originalEvent.touches[0].clientY;
		preventPullToRefresh = window.pageYOffset == 0;
	});

	$('body').on('touchmove', function (e) {
		var touchY = e.originalEvent.touches[0].clientY;
		var touchYDelta = touchY - lastTouchY;
		lastTouchY = touchY;
		if (preventPullToRefresh) {
			// To suppress pull-to-refresh it is sufficient to preventDefault the first overscrolling touchmove.
			preventPullToRefresh = false;
			if (touchYDelta > 0) {
				e.preventDefault();
				return;
			}
		}
	});
});

window.addEventListener("beforeunload", function (e) {
	if ( (getGameState() == 'inProgress') || (getGameState() == 'waitingForPlayers') ) {
		if (isHost()) {
			var confirmationMessage = TAPi18n.__("ui.dialog.host close window");
		} else {
			var confirmationMessage = TAPi18n.__("ui.dialog.player close window");			
		}
		(e || window.event).returnValue = confirmationMessage; //Gecko + IE
		return confirmationMessage;                            //Webkit, Safari, Chrome
	}
});

Template.registerHelper('equals', function (a, b) {
	return a === b;
});

Template.registerHelper('lessThan', function (a, b) {
	return a < b;
});

Template.registerHelper('isYou', function (thisPlayerID) {
	var playerID = Session.get("playerID");
	if (playerID == thisPlayerID)
		return true;
	else
		return false;
});

Template.registerHelper('formatTime', function (time) {
	var isToday = moment(time).isSame(new Date(), "day");
	if (isToday) {
		return moment(time).format('h.mma');
	} else {
		return moment(time).format('h.mma DD-MM-YYYY');
	}
});

Template.main.helpers({
	whichView: function() {
		return Session.get('currentView');
	}
});

Template.main.events({
	'click button.btn-tooltip': function (event) {
		showInfoMessage($(event.target).attr('data-tooltip'));
	},
});

Template.startMenu.helpers({
	playerName: function() {
		return Session.get('playerName');
	},
	accessCode: function() {
		if (Session.get('prefillAccessCode'))
			return Session.get('prefillAccessCode');
		else
			return Session.get('accessCode');
	},
	playerAccessCode: function() {
		if (Session.get('prefillPlayerAccessCode'))
			return Session.get('prefillPlayerAccessCode');
		else
			return Session.get('playerAccessCode');
	},
	canResume: function() {
		return (Session.get('BKgameID') && Session.get('BKplayerID'));
	},	
});

Template.startMenu.events({
	'click button#newgame': function () {
		var playerName = $('#playerName').val();
		if (!playerName) {
			showErrorMessage(TAPi18n.__("ui.validation.form.player name"));
			return false;
		}

		var game = generateNewGame();
		if (!game)
			return false;

		var player = generateNewHostPlayer(game, playerName);

		Session.set("playerName", playerName);
		Session.set("accessCode", game.accessCode);
		Session.set("playerAccessCode", player.accessCode);
		Session.set("usurpCode", game.usurpCode);
		Session.set("gameID", game._id);
		Session.set("playerID", player._id);
		Session.set("currentView", "lobby");

		//showInfoMessage(TAPi18n.__("ui.validation.usurp code", game.usurpCode));

		Meteor.call('findGame', game._id, function(error, result) {
			if (error) {
				showErrorMessage(TAPi18n.__("ui.server connect error"));
			} else {
				var game = result;
				if (game)
					showInfoMessage("New game has been synced to server");
				else
					showErrorMessage("New game has not been synced to server");
			}
		});
	},
	'click button#joingame': function () {
		var playerName = $('#playerName').val().trim();
		if (!playerName) {
			showErrorMessage(TAPi18n.__("ui.validation.form.player name"));
			return false;
		}
		var accessCode = $('#accessCode').val().trim().toLowerCase();
		
		Meteor.call('findGame', {accessCode: accessCode}, function(error, result) {
			if (error) {
				showErrorMessage(TAPi18n.__("ui.server connect error"));
			} else {
				var game = result;
				if (game) {
					Meteor.call('getPlayersSameName', game._id, playerName, function(error, result) {
						if (error) {
							showErrorMessage(TAPi18n.__("ui.server connect error"));
						} else {
							var playersSameName = result;
							if (playersSameName) {
								showErrorMessage(TAPi18n.__("ui.validation.form.player name taken"));
								return false;
							}

							if (game.locked) {
								showErrorMessage(TAPi18n.__("ui.validation.form.game room locked"));
								return false;
							}

							var player = generateNewPlayer(game, playerName);

							Session.set("playerName", playerName);
							Session.set("accessCode", accessCode);
							Session.set("playerAccessCode", player.accessCode);
							Session.set("gameID", game._id);
							Session.set("playerID", player._id);
							Session.set("currentView", "lobby");
						}
					});
				} else {
					showErrorMessage(TAPi18n.__("ui.validation.form.access code"));
				}
			}
		});
	},
	'click button#resumegame': function () {
		var gameID = Session.get("BKgameID");
		var playerID = Session.get("BKplayerID");
		Session.set("gameID", gameID);
		Session.set("playerID", playerID);
		Session.set("currentView", "lobby");
	},
	'click button#rejoingame': function () {
		var accessCode = $('#playerAccessCode').val().trim().toLowerCase();
		
		Meteor.call('findPlayerAndGame', {accessCode: accessCode}, function(error, result) {
			if (error) {
				showErrorMessage(TAPi18n.__("ui.server connect error"));
			} else {
				var player = result[0];
				var game = result[1];
				if (player && game) {
					Session.set("playerName", player.name);
					Session.set("accessCode", game.accessCode);
					Session.set("playerAccessCode", player.accessCode);
					Session.set("gameID", game._id);
					Session.set("playerID", player._id);
					Session.set("currentView", "lobby");
				} else {
					showErrorMessage(TAPi18n.__("ui.validation.form.player access code"));
				}
			}
		});
	},
});

Template.accessCode.helpers({
	accessCode: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.accessCode;
	},
	playerAccessCode: function () {
		var player = getCurrentPlayer();
		if (!player) {
			return null;
		}
		return player.accessCode;
	},
});

Template.lobby.helpers({
	game: function () {
		return getCurrentGame();
	},
	accessLink: function () {
		return getAccessLink();
	},
	/*
	player: function () {
		return getCurrentPlayer();
	},
	*/
	isHost: isHost,
	isGameState: function (state) {
		return getGameState() == state;
	},
	endGameList: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.endGameList;
	},
});

Template.lobby.events({
	'click button': function () {//this must be before the specific buttons, otherwise messages may never appear (if they are cleared immediately)
		clearMessage();
	},
	'input textarea#roleMap': function () {
		disableStartGameRole();
	},
	'change textarea#roleMap': function () {
		disableStartGameRole();
	},
	'paste textarea#roleMap': function () {
		disableStartGameRole();
	},
	'input textarea#voteMap': function () {
		disableStartGameVote();
	},
	'change textarea#voteMap': function () {
		disableStartGameVote();
	},
	'paste textarea#voteMap': function () {
		disableStartGameVote();
	},
	'input textarea#themeMap': function () {
		disableStartGameTheme();
	},
	'change textarea#themeMap': function () {
		disableStartGameTheme();
	},
	'paste textarea#themeMap': function () {
		disableStartGameTheme();
	},
	'input textarea#openInfo': function () {
		updateOpenInfo();
	},
	'change textarea#openInfo': function () {
		updateOpenInfo();
	},
	'paste textarea#openInfo': function () {
		updateOpenInfo();
	},
	'click button#addRoleCount': function () {
		var lineNo = $(event.target).attr('data-line');
		changeRoleCount(lineNo, 4, ",", true);
	},
	'click button#minusRoleCount': function () {
		var lineNo = $(event.target).attr('data-line');
		changeRoleCount(lineNo, 4, ",", false);
	},
	'click button#addPileCount': function () {
		var lineNo = $(event.target).attr('data-line');
		changeRoleCount(lineNo, 2, "|", true);
	},
	'click button#minusPileCount': function () {
		var lineNo = $(event.target).attr('data-line');
		changeRoleCount(lineNo, 2, "|", false);
	},
	'click button#updateRoleMap': function () {
		updateRoleMap();
	},
	'click button#updateVoteMap': function () {
		updateVoteMap();
	},
	'click button#updateThemeMap': function () {
		updateThemeMap();
	},
	'click button#hideShowRoleMap': function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		if (game.roleMapIsVisible) {
			Games.update(game._id, {$set: {roleMapIsVisible: false}});
		} else {
			var choice = confirm(TAPi18n.__("ui.dialog.share box info"));
			if (choice == false)
				return false;
			Games.update(game._id, {$set: {roleMapIsVisible: true}});
		}
	},
	'click button#hideShowVoteMap': function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		if (game.voteMapIsVisible) {
			Games.update(game._id, {$set: {voteMapIsVisible: false}});
		} else {
			var choice = confirm(TAPi18n.__("ui.dialog.share box info"));
			if (choice == false)
				return false;
			Games.update(game._id, {$set: {voteMapIsVisible: true}});
		}
	},
	'click button#hideShowThemeMap': function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		if (game.themeMapIsVisible) {
			Games.update(game._id, {$set: {themeMapIsVisible: false}});
		} else {
			var choice = confirm(TAPi18n.__("ui.dialog.share box info"));
			if (choice == false)
				return false;
			Games.update(game._id, {$set: {themeMapIsVisible: true}});
		}
	},
	'click button#switchRoleMapMode': function () {
		updateRoleMap();
		$('textarea#roleMap').toggle();
		$('div#roleMapNames').toggle();
	},
});

function disableStartGameRole() {
	$('button#startgame').prop("disabled", true);
	$('button#updateRoleMap').prop("disabled", false);
}

function disableStartGameVote() {
	$('button#startgame').prop("disabled", true);
	$('button#updateVoteMap').prop("disabled", false);
}

function disableStartGameTheme() {
	$('button#startgame').prop("disabled", true);
	$('button#updateThemeMap').prop("disabled", false);
}

function changeRoleCount(rowIndex, columnIndex, delimiter, isAdd) {
	var roleMap = $('#roleMap').val();
	var rows = roleMap.split("\n");
	var row = rows[rowIndex];
	var cells = row.split(delimiter);
	var cell = cells[columnIndex];
	var num = parseInt(cell.trim());
	if (isAdd)
		num += 1;
	else
		num -= 1;
	if (num < 0)
		num = 0;
	cells[columnIndex] = " "+num;
	row = cells.join(delimiter);
	rows[rowIndex] = row;
	roleMap = rows.join("\n");
	$('#roleMap').val(roleMap);
	//disableStartGameRole();
	updateRoleMap();
}

function updateRoleMap() {
	var game = getCurrentGame();
	if (!game)
		return null;
	var roleMap = $('#roleMap').val();
	Games.update(game._id, {$set: {roleMap: roleMap}});
	parseRoleMap(roleMap);
	$('button#updateRoleMap').prop("disabled", true);
	if ($('button#updateVoteMap').prop("disabled") && $('button#updateThemeMap').prop("disabled")) {
		$('button#startgame').prop("disabled", false);
	}
}

function updateVoteMap() {
	var game = getCurrentGame();
	if (!game)
		return null;
	var voteMap = $('#voteMap').val();
	Games.update(game._id, {$set: {voteMap: voteMap}});
	parseVoteMap(voteMap);
	$('button#updateVoteMap').prop("disabled", true);
	if ($('button#updateRoleMap').prop("disabled") && $('button#updateThemeMap').prop("disabled")) {
		$('button#startgame').prop("disabled", false);
	}
}

function updateThemeMap() {
	var game = getCurrentGame();
	if (!game)
		return null;
	var themeMap = $('#themeMap').val();
	Games.update(game._id, {$set: {themeMap: themeMap}});
	parseThemeMap(themeMap);
	$('button#updateThemeMap').prop("disabled", true);
	if ($('button#updateRoleMap').prop("disabled") && $('button#updateVoteMap').prop("disabled")) {
		$('button#startgame').prop("disabled", false);
	}
}

Template.playerList.helpers({
	players: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		var players = Players.find({gameID: game._id}).fetch();
		players.forEach(function(player){
			var roleName = "";
			if (player.role && player.role.name)
				roleName = player.role.name.replace(/ *<.*>/g, "");
			player.roleName = roleName;
		});
		return players;
	},
	numPlayers: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		var numPlayers = Players.find({gameID: game._id}).count();
		return numPlayers;
	},
	isHost: isHost,
	roomIsLocked: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.locked;
	},
	isGameState: function (state) {
		return getGameState() == state;
	},
	hidePlayerList: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hidePlayerList;
	},
	preventSwapping: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.preventSwapping;
	},
	preventPeeking: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.preventPeeking;
	},
});

Template.playerList.events({
	'click button#updatePlayerOpenInfo': function () {
		var player = getCurrentPlayer();
		if (!player)
			return false;
		var openInfo = $('#playerOpenInfo').val();
		Players.update(player._id, {$set: {openInfo: openInfo, updatedAt: new Date()}});
	},
	'click button.removePlayer': function () {
		var playerName = $(event.target).attr('data-playerName');
		var choice = confirm(TAPi18n.__("ui.dialog.remove player", playerName));
		if (choice == false)
			return false;
		var playerId = $(event.target).attr('data-playerId');
		Players.remove(playerId);
	},
	'click button.transferHost': function () {
		var playerName = $(event.target).attr('data-playerName');
		var choice = confirm(TAPi18n.__("ui.dialog.transfer host", playerName));
		if (choice == false)
			return false;
		var playerId = $(event.target).attr('data-playerId');
		Players.update(playerId, {$set: {isHost: true}});
		Players.update(getCurrentPlayer()._id, {$set: {isHost: false}});
	},
	'click button.togglePlayerDeathState': function () {
		var playerId = $(event.target).attr('data-playerId');
		var player = Players.findOne(playerId);
		var wasDead = player.isDead;
		Players.update(playerId, {$set: {isDead: !wasDead, updatedAt: new Date()}});
	},
	'click button.addDummyPlayer': function () {
		var playerName = $('#dummyPlayerName').val().trim();
		if (!playerName) {
			showErrorMessage(TAPi18n.__("ui.validation.form.player name"));
			return false;
		}
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		var playersSameName = Players.find({gameID: game._id, name: playerName}).count();
		if (playersSameName) {
			showErrorMessage(TAPi18n.__("ui.validation.form.player name taken"));
			return false;
		}
		generateNewDummyPlayer(game, playerName);
		$('#dummyPlayerName').val('');
	},
	'click button#lockGameRoom': function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		if (game.locked) {
			Games.update(game._id, {$set: {locked: false}});
		} else {
			Games.update(game._id, {$set: {locked: true}});
		}
	},
	'click button#swapPlayerRoles': function () {
		var thisPlayer = getCurrentPlayer();
		if (!thisPlayer)
			return false;
		var player1id = $('#playerToSwap1').val();
		var player2id = $('#playerToSwap2').val();
		if (player1id == player2id)
			return false;
		var player1name = $('#playerToSwap1 option:selected').text();
		var player2name = $('#playerToSwap2 option:selected').text();
		var player1 = Players.findOne(player1id);
		var player2 = Players.findOne(player2id);
		if (!player1 || !player2)
			return false;
		var choice = confirm(TAPi18n.__("ui.dialog.swap player roles", {player1: player1name, player2: player2name}));
		if (choice == false)
			return false;
		var player1role = player1.role;
		var player2role = player2.role;
		var player1knows = player1.knowingText;
		var player2knows = player2.knowingText;
		Players.update(player1id, {$set: {role: player2role, knowingText: player2knows}});
		Players.update(player2id, {$set: {role: player1role, knowingText: player1knows}});
		createLog(TAPi18n.__("ui.log.swapped player roles", {player: thisPlayer.name, player1: player1name, player2: player2name}));
	},
	'click button#peekPlayerRole': function () {
		var thisPlayer = getCurrentPlayer();
		if (!thisPlayer)
			return false;
		var targetPlayerId = $('#playerToPeek').val();
		var targetPlayerName = $('#playerToPeek option:selected').text();
		var targetPlayer = Players.findOne(targetPlayerId);
		if (!targetPlayer)
			return false;
		if (thisPlayer._id == targetPlayer._id)
			return false;
		var choice = confirm(TAPi18n.__("ui.dialog.peek player role", targetPlayerName));
		if (choice == false)
			return false;
		alert(TAPi18n.__("ui.dialog.role of this player is", {name: targetPlayerName, role: targetPlayer.role.name}));
		createLog(TAPi18n.__("ui.log.peeked player role", {actionPlayer: thisPlayer.name, targetPlayer: targetPlayerName}));
	},
	'click button#toggleAccess': function () {
		$('div.accessCode').toggleClass("hidden");
		if ($("#toggleAccess").text()==TAPi18n.__("ui.button.game menu.hide access"))
			$("#toggleAccess").text(TAPi18n.__("ui.button.game menu.show access"));
		else
			$("#toggleAccess").text(TAPi18n.__("ui.button.game menu.hide access"));
	},
});

function updateOpenInfo() {
	var game = getCurrentGame();
	if (!game)
		return null;
	var openInfo = $('#openInfo').val();
	Games.update(game._id, {$set: {openInfo: openInfo, updatedAt: new Date()}});
}

function leaveGame () {
	var player = getCurrentPlayer();
	var game = getCurrentGame();

	if (game && player) {
		/*
		if (game.state == 'inProgress' && player.state != 0) {
			Games.update(game._id, {$set: {state: 'playerQuit'}});
		} else
		*/
		if (player.isHost) {
			var newHost = Players.findOne({gameID: game._id, isHost: false, isDummy: false});
			if (newHost)
				Players.update(newHost._id, {$set: {isHost: true}});
			Players.update(player._id, {$set: {isHost: false}});
		}
	}

	//if (player && player.state != 0 && game && game.state != "over")
		Players.remove(player._id);
	Session.set("playerID", null);
	Session.set("gameID", null);
	Session.set("BKplayerID", null);
	Session.set("BKgameID", null);
	Session.set("currentView", "startMenu");
	Session.set("accessCode", null);
	Session.set("playerAccessCode", null);
}

function parseRoleMap(roleMap) {
	var roleMapHalves = roleMap.split("---");
	var pileList = [];
	var pileHeight = 0;
	var pileMapCount = 0;
	if (roleMapHalves.length == 2) {
		var pileMap = roleMapHalves[0];
		roleMap = roleMapHalves[1];

		var pileRows = pileMap.split("\n");
		for (var i=0; i < pileRows.length; i++){ var row = pileRows[i].trim();
			if (row == "" || row.slice(0, 1) == "#")
				continue;
			var cell = row.split("|");
			if (cell.length == 3) {
				var pileCount = parseInt(cell[2].trim());
				pileMapCount += pileCount;
				var rawContent = cell[1].trim();
				var content = [];
				if (rawContent != "")
					content = $.parseJSON(rawContent);
				pileList.push({name: cell[0].trim(), count: pileCount, index: i, content: content});
			}
		}
		pileHeight = pileRows.length-1;
	}

	var rows = roleMap.split("\n");
	var roleMapNames = [];
	for (var i=0; i < rows.length; i++){ var row = rows[i].trim();
		if (row == "" || row.slice(0, 1) == "#")
			continue;
		var cell = row.split(",");
		if (cell.length == 5)
			roleMapNames.push({name: cell[1].trim(), count: parseInt(cell[4].trim()), index: pileHeight+i});
	}

	roleMap = 'id,name,knows,desc,count\n'+roleMap;
	var parsedResults = Papa.parse(roleMap, {
		delimiter: ",",
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		comments: "#",
		preview: 100
	});
	results = parsedResults.data;

	var roleids = [];
	var rollyDict = {};
	var roleMapCount = 0;

	for (var i=results.length;i--;){
		var result = results[i];
		if (result.count > 0) {
			roleids.push(result.id);
		}
	}

	for (var i=0; i < results.length; i++){ var result = results[i];
		if (result.count > -1) {//now add all regardless of count
			roleMapCount += result.count;

			var roleName = result.name;
			if (typeof roleName != "string") {
				roleName = String(roleName);
			}
			roleName = roleName.trim();

			var roleDesc = result.desc;
			if (typeof roleDesc != "string") {
				roleDesc = String(roleDesc);
			}
			roleDesc = roleDesc.trim();

			var knows = result.knows;
			var knowsArray = [];
			
			if (typeof knows != "string") {
				knows = String(knows);
			}
			knows = knows.trim().split(" ");
			for (var j=0; j < knows.length; j++){ var know = knows[j];
				
				if (typeof know != "string") {
					know = String(know);
				}
				var subKnowsArray = [];
				know = know.trim().split("-");
				for (var k=0; k < know.length; k++){ var knowInt = parseInt(know[k]);
					if ($.inArray(knowInt, roleids) >= 0) {
						subKnowsArray.push(knowInt);
					}
				}
				if (subKnowsArray.length > 0) {
					knowsArray.push(subKnowsArray);
				}
				
			}
			
			rollyDict[result.id] = {id:result.id, name:roleName, count:result.count, knows:knowsArray, desc:roleDesc};
		}
	}

	roleMapCount += pileMapCount;

	var game = getCurrentGame();
	if (!game)
		return null;
	Games.update(game._id, {$set: {roleMapParsed: rollyDict, roleMapCount: roleMapCount, roleMapNames: roleMapNames, pileList:pileList}});
}

function assignPlayers(players, rollyDict, pileList, themes) {
	var takeOutHost = false;
	var hostRole = null;

	for (var key in rollyDict) {
		var dictItem = rollyDict[key];
		if (dictItem.name == "<>") {
			var randIndex = getRandom(themes.length);
			//dictItem["name"] = themes[randIndex];
			dictItem.name = themes[randIndex];
			themes.splice(randIndex, 1);
		}
	}

	var nowroles = [];
	for (var key in rollyDict) {
		var dictItem = rollyDict[key];
		for (var i=dictItem.count;i--;){
			if (dictItem.name.indexOf("<Host>") >= 0) {
				takeOutHost = true;
				hostRole = dictItem;
			} else {
				nowroles.push(dictItem);
			}
		}
	}

	for (var i=0; i < pileList.length; i++){ var pile = pileList[i];
		var unshuffled_pile = parseItem(pile.content, []);
		var shuffled_pile = shuffleArray(unshuffled_pile);
		shuffled_pile = shuffled_pile.slice(0, pile.count);
		for (var j=shuffled_pile.length;j--;){
			var dictItem = rollyDict[shuffled_pile[j]];
			nowroles.push(dictItem);
		}
	}

	nowroles = nowroles.slice(0, players.length);
	var default_role = nowroles[nowroles.length - 1];
	var shuffled_roles = shuffleArray(nowroles);
	var role = null;
	players.forEach(function(player){
		if (takeOutHost && player.isHost) {
			role = hostRole;
		} else {
			role = shuffled_roles.pop();
			if (role === undefined){
				role = default_role;
			}
		}
		Players.update(player._id, {$set: {role: role, updatedAt: new Date()}});
	});

}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		//var j = Math.floor(Math.random() * (i + 1));
		var j = Math.floor(Random.fraction() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function parseVoteMapForPlayers(voteMap) {
	var game = getCurrentGame();
	if (!game)
		return null;
	var players = Players.find({'gameID': game._id}).fetch();
	var playerNames = [];
	players.forEach(function(player){
		playerNames.push(player.name);
	});
	voteMap = voteMap.replace(/<Players>/gi, playerNames.join('/'));
	parseVoteMap(voteMap);
}

function parseVoteMap(voteMap) {
	voteMap = 'name,choices,showplayername\n'+voteMap;
	var parsedResults = Papa.parse(voteMap, {
		delimiter: ",",
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
		comments: "#",
		preview: 50
	});
	results = parsedResults.data;

	var voteDict = {};

	for (var i=0; i < results.length; i++){ var result = results[i];
		var choiceName = result.name;
		if (typeof choiceName != "string") {
			choiceName = String(choiceName);
		}
		choiceName = choiceName.trim();

		var choices = result.choices;
		var choiceArray = [];
		
		if (typeof choices != "string") {
			choices = String(choices);
		}
		choices = choices.split("/");
		for (var j=0; j < choices.length; j++){ var choice = choices[j];
			if (typeof choice != "string") {
				choice = String(choice);
			}
			choiceArray.push(choice.trim());
		}

		var showplayername = result.showplayername;
		
		voteDict[choiceName] = {name: choiceName, choices: choiceArray, shouldShowChoicePlayer: showplayername}; 
	}

	var game = getCurrentGame();
	if (!game)
		return null;
	Games.update(game._id, {$set: {voteMapParsed: voteDict}});
}

function parseThemeMap(themeMap) {
	var rows = themeMap.split("\n");
	var themes = [];
	for (var i=0; i < rows.length; i++){ var row = rows[i].trim();
		if (row == "" || row.slice(0, 1) == "#")
			continue;
		themes.push(row);
	}

	var game = getCurrentGame();
	if (!game)
		return null;
	Games.update(game._id, {$set: {themeMapParsed: themes}});
}

function getAccessLink(){
	var game = getCurrentGame();
	if (!game){
		return;
	}
	return Meteor.settings.public.url + game.accessCode + "/";
}

function getRandom(length) {
	//return Math.floor(Math.random() * length);
	return Math.floor(Random.fraction() * length);
}

function generateAccessCode(){
	var code = words[getRandom(words.length)]+" "+words[getRandom(words.length)]+" "+words[getRandom(words.length)];

	return code;
}

function generateUsurpCode(){
	var code = "";
	var possible = "abcdefghijklmnopqrstuvwxyz";

	for(var i=0; i < 6; i++){
		code += possible.charAt(getRandom(possible.length));
	}
	return code;
}

function getCurrentGame(){
	var gameID = Session.get("gameID");
	if (gameID) {
		return Games.findOne(gameID);
	}
}

function getCurrentPlayer(){
	var playerID = Session.get("playerID");

	if (playerID) {
		return Players.findOne(playerID);
	}
}

function isHost() {
	var player = getCurrentPlayer();
	if (!player) {
		return null;
	}
	return player.isHost;
}

function generateNewGame(){
	var game = {
		accessCode: generateAccessCode(),
		usurpCode: generateUsurpCode(),
		state: "waitingForPlayers",
		locked: false,
		roleMap: '',
		roleMapParsed: parseRoleMap(''),
		roleMapCount: 0,
		roleMapNames: [],
		pileList: [],
		voteMap: '',
		voteMapParsed: parseVoteMap(''),
		themeMap: '',
		themeMapParsed: parseThemeMap(''),
		roleMapIsVisible: false,
		voteMapIsVisible: false,
		themeMapIsVisible: false,
		hideOpenInfo: true,
		hideRandomBox: true,
		hideSoundBox: true,
		hideTimeBox: true,
		hidePlayerList: false,
		preventSwapping: true,
		preventPeeking: true,
		hideLog: true,
		preventSendAsRole: true,
		preventSendToHost: true,
		playSoundNow: false,
		openInfo: '',
		endGameList: '',
		currentChoiceType: null,
		lastChoiceType: null,
		lastChoiceResult: [],
		randomPlayer: 'None',
		createdAt: new Date(),
		updatedAt: new Date(),
		telegram: null,
		startTime: null,
		paused: true,
		pausedTime: null,
	};

	var gameID = Games.insert(game);
	game = Games.findOne(gameID);

	return game;
}

function generateNewPlayer(game, name){
	return generateNewPlayerFull(game, name, false, false);
}

function generateNewHostPlayer(game, name){
	return generateNewPlayerFull(game, name, true, false);
}

function generateNewDummyPlayer(game, name){
	return generateNewPlayerFull(game, name, false, true);
}

function generateNewPlayerFull(game, name, isHost, isDummy){
	var player = {
		gameID: game._id,
		name: name,
		role: null,
		selectedChoice: null,
		isHost: isHost,
		isDummy: isDummy,
		isDead: false,
		openInfo: "",
		knowingText: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		telegram: null,
		accessCode: generateAccessCode(),
	};

	var playerID = Players.insert(player);

	return Players.findOne(playerID);
}

Template.infoBox.helpers({
	knowingText: function () {
		var player = getCurrentPlayer();
		if (!player) {
			return null;
		}
		return player.knowingText;
	},
	hideHostInfo: function () {
		var player = getCurrentPlayer();
		if (!player) {
			return null;
		}
		var playerIsMod = false;
		if (player.role != null)
			playerIsMod = (player.role.name.indexOf("<Host>") >= 0);
		return showDummyBoxes() && !playerIsMod;
	},
	isHost: isHost,
});

function selectText() {
	try {
		if (window.ActiveXObject) {
			var c = document.selection.createRange();
			return c.htmlText;
		}
		var nNd = document.createElement("span");
		//nNd.className = "selInfo";
		nNd.classList.add("selInfo");
		var selName = "selInfo-"+Math.floor(Math.random() * (1000000));
		nNd.classList.add(selName);
		var w = getSelection().getRangeAt(0);
		w.surroundContents(nNd);
		return selName;
		//return nNd.innerHTML;
	} catch (e) {
		return 'nvm';
		/*
		if (window.ActiveXObject) {
			return document.selection.createRange();
		} else {
			return getSelection();
		}
		*/
	}
}

Template.infoBox.events({
	'click button#toggleInfo': function () {
		$('#infoBox').toggleClass("hidden");
		if ($("#toggleInfo").text()==TAPi18n.__("ui.button.game menu.hide info"))
			$("#toggleInfo").text(TAPi18n.__("ui.button.game menu.show info"));
		else
			$("#toggleInfo").text(TAPi18n.__("ui.button.game menu.hide info"));
	},
	'click button#hideSelectedInfo': function () {
		var selName = selectText();
		$('span.'+selName).css({"display":"none"});
	},
	'click button#restoreInfo': function () {
		//$('span.selInfo').removeAttr("style");
		$('span.selInfo').contents().unwrap();
	},
});

Template.gameInfo.helpers({
	roleMap: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.roleMap;
	},
	voteMap: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.voteMap;
	},
	themeMap: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.themeMap;
	},
	roleMapIsVisible: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.roleMapIsVisible;
	},
	voteMapIsVisible: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.voteMapIsVisible;
	},
	themeMapIsVisible: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.themeMapIsVisible;
	},
});

Template.gameOptions.helpers({
	roleMap: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.roleMap;
	},
	voteMap: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.voteMap;
	},
	themeMap: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.themeMap;
	},
	roleMapIsVisible: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.roleMapIsVisible;
	},
	voteMapIsVisible: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.voteMapIsVisible;
	},
	themeMapIsVisible: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.themeMapIsVisible;
	},
	templates: function () {
		return templates;
	},
	templateVariations: function () {
		return Session.get("templateVariations");
	},
	roleMapNames: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		/*
		var roleMapNames = game.roleMapNames.map(function(item, index) {
			return {index: index, value: item};
		});
		*/
		return game.roleMapNames;
	},
	pileList: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.pileList;
	},
});

Template.gameOptions.events({
	'change select#optionTemplate': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var templateId = $('select#optionTemplate').val();
		var template = templeDict[templateId];
		$('#roleMap').val(template.roleMap);
		$('#voteMap').val(template.voteMap);
		$('#themeMap').val(template.themeMap);
		updateRoleMap();
		updateVoteMap();
		updateThemeMap();
		var templateCounts = template.counts;
		if (templateCounts == null)
			templateCounts = [];
		templateCounts = templateCounts.map(function(item, index) {
			item.index = index;
			return item;
		});
		Session.set("templateVariations", template.counts);
		setTemplateVariation();
	},
	'change select#optionTemplateVariation': function () {
		setTemplateVariation();
	},
});

function setTemplateVariation() {
	var game = getCurrentGame();
	if (!game)
		return null;
	var templateId = $('select#optionTemplate').val();
	var template = templeDict[templateId];
	var templateVarId = $('select#optionTemplateVariation').val();
	if (template.counts == null || templateVarId == null)
		return null;
	var templateVar = template.counts[templateVarId];
	var templateVarNums = $.parseJSON(templateVar.numbers);

	var roleMap = $('#roleMap').val();
	var rows = roleMap.split("\n");
	var splitPos = rows.indexOf("---");
	for (var i=0; i < rows.length; i++){ var row = rows[i];
		if (row == "" || row.slice(0, 1) == "#")
			continue;
		if (i < splitPos) {
			var delimiter = "|";
			var columnIndex = 2;
		} else if (i > splitPos) {
			var delimiter = ",";
			var columnIndex = 4;
		} else {
			continue;
		}
		var cells = row.split(delimiter);
		var cell = cells[columnIndex];
		var firstCell = cells[0].trim();
		var num = 0;
		if (firstCell in templateVarNums) {
			num = templateVarNums[firstCell];
		}
		cells[columnIndex] = " "+num;
		row = cells.join(delimiter);
		rows[i] = row;
		roleMap = rows.join("\n");
	}
	$('#roleMap').val(roleMap);
	//disableStartGameRole();
	updateRoleMap();
}

Template.openInfo.helpers({
	hideOpenInfo: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideOpenInfo;
	},
	openInfo: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.openInfo;
	},
	isHost: isHost,
});

Template.choiceBox.helpers({
	noChoiceType: function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		return game.currentChoiceType == null;
	},
	shouldShowChoicePlayer: function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		return game.currentChoiceType.shouldShowChoicePlayer;
	},
	lastChoiceResult: getLastChoiceResult,
	choiceTypes: function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var keys = $.map(game.voteMapParsed, function(v, i){
			return i;
		});
		return keys;
	},
	numChoicesSubmitted: function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		return getNumChoicesSubmitted(game);
	},
	playersChoicesSubmitted: function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		return getPlayersChoicesSubmitted(game);
	},
	playersChoicesNotSubmitted: function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var thosePlayers = Players.find({'gameID': game._id, selectedChoice: null, isDead: false}).fetch();
		if (!thosePlayers || thosePlayers.length == 0) {
			return '0';
		} else {
			var thosePlayersNames = [];
			thosePlayers.forEach(function(thatPlayer){
				thosePlayersNames.push(thatPlayer.name);
			});
			return thosePlayersNames.length + ": " + thosePlayersNames.join(', ');
		}
	},
	playersChoicesCantSubmit: function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var thosePlayers = Players.find({'gameID': game._id, isDead: true}).fetch();
		if (!thosePlayers || thosePlayers.length == 0) {
			return '0';
		} else {
			var thosePlayersNames = [];
			thosePlayers.forEach(function(thatPlayer){
				thosePlayersNames.push(thatPlayer.name);
			});
			return thosePlayersNames.length + ": " + thosePlayersNames.join(', ');
		}
	},
	choices: function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var choices = game.currentChoiceType.choices;
		choices.unshift(TAPi18n.__("ui.label.select choice"));
		return choices;
	},
	isDead: function () {
		var player = getCurrentPlayer();
		if (!player) {
			return null;
		}
		return player.isDead;
	},
	isHost: isHost,
});

function getLastChoiceResult() {
	var game = getCurrentGame();
	if (!game)
		return null;
	var submittedChoices = game.lastChoiceResult;
	if (!submittedChoices || submittedChoices.length == 0) {
		return 'None';
	} else {
		/*
		submittedChoices = submittedChoices.sort();
		var submittedChoicesList = [];
		for (var i=0; i < submittedChoices.length; i++){ var choice = submittedChoices[i];
			if (game.lastChoiceType.shouldShowChoicePlayer == 2) {
				submittedChoicesList.push(choice[0]+' ('+choice[1]+')');
			} else {
				submittedChoicesList.push(choice[0]);
			}
		}
		return submittedChoicesList.join(', ');
		*/
		var submittedChoicesList = {};
		for (var i=0; i < submittedChoices.length; i++){ var choice = submittedChoices[i];
			var choiceType = choice[0];
			var choicePlayer = choice[1];
			if (!(choiceType in submittedChoicesList)) {
				submittedChoicesList[choiceType] = [];
			}
			submittedChoicesList[choiceType].push(choicePlayer);
		}
		var submittedChoicesFullList = [];
		for (var key in submittedChoicesList) {
			var thisList = submittedChoicesList[key].sort();
			if (game.lastChoiceType.shouldShowChoicePlayer == 2) {
				submittedChoicesFullList.push(key+" ("+thisList.length+": "+thisList.join(", ")+")");
			} else {
				submittedChoicesFullList.push(key+" ("+thisList.length+")");
			}
		}
		submittedChoicesFullList = submittedChoicesFullList.sort();
		return submittedChoicesFullList.join(', ');
	}
}

Template.choiceBox.events({
	'change select#optionChoice': function () {
		var choice = $('select#optionChoice').val();
		if (choice == TAPi18n.__("ui.label.select choice"))
			$('button#updateChoice').prop("disabled", true);
		else
			$('button#updateChoice').prop("disabled", false);
	},
	'click button#updateChoice': function () {
		var game = getCurrentGame();
		var player = getCurrentPlayer();
		if (!game || !player)
			return null;
		var choice = $('select#optionChoice').val();
		Players.update(player._id, {$set: {selectedChoice: choice, updatedAt: new Date()}});
		$('button#updateChoice').prop("disabled", true);
		$('select#optionChoice').val(TAPi18n.__("ui.label.select choice"));
		teleGameUpdate(game, TAPi18n.__("telegram.event.who has voted")+"\n"+getCurrentVotingStatus(game));
	},
	'click button#updateChoiceType': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var choiceType = $('select#optionChoiceType').val();
		Games.update(game._id, {$set: {currentChoiceType: game.voteMapParsed[choiceType], lastChoiceType: null, updatedAt: new Date()}});

		var choices = game.voteMapParsed[choiceType].choices;
		var players = Players.find({'gameID': game._id}).fetch();
		players.forEach(function(player){
			telePlayerKeyboardUpdate(player, TAPi18n.__("telegram.event.new voting round"), choices);
		});
	},
	'click button#removeChoiceType': function (event) {
		if (!reqDoubleClick(event, true))
			return false;
		var game = getCurrentGame();
		if (!game)
			return null;
		var lastChoiceResult = [];
		var chosenPlayers = Players.find({'gameID': game._id, selectedChoice: {$ne: null}}).fetch();
		chosenPlayers.forEach(function(chosenPlayer){
			lastChoiceResult.push([chosenPlayer.selectedChoice, chosenPlayer.name]);
			Players.update(chosenPlayer._id, {$set: {selectedChoice: null, updatedAt: new Date()}});
		});
		var lastChoiceType = game.currentChoiceType;
		Games.update(game._id, {$set: {currentChoiceType: null, lastChoiceType: lastChoiceType, lastChoiceResult: lastChoiceResult, updatedAt: new Date()}});
		teleGameUpdate(game, TAPi18n.__("telegram.event.voting results")+"\n"+getLastChoiceResult());
	},
	'click button#restartChoiceType': function (event) {
		if (!reqDoubleClick(event, true))
			return false;
		resetAllChoices();
		
		var game = getCurrentGame();
		if (!game)
			return null;
		var choices = game.currentChoiceType.choices;
		var players = Players.find({'gameID': game._id}).fetch();
		players.forEach(function(player){
			telePlayerKeyboardUpdate(player, TAPi18n.__("telegram.event.reset voting round"), choices);
		});
	},
});

function reqDoubleClick(event, displayChange) {
	var oldClickCount = parseInt($(event.target).attr('data-clickcount'));
	if (oldClickCount == 0) {
		setTimeout(function() {
			toggleDoubleClickStatus(event, oldClickCount, true, displayChange);
		}, 1000);
	}
	return toggleDoubleClickStatus(event, oldClickCount, false, displayChange);
}

function toggleDoubleClickStatus(event, oldClickCount, isOneWay, displayChange) {
	var newClickCount = 0;
	if (oldClickCount == 0 && !isOneWay) {
		newClickCount = 1;
	}
	$(event.target).attr('data-clickcount', newClickCount);
	if (newClickCount == 1) {
		if (displayChange) {
			//$(event.target).css('background-color', 'red');
			var currText = $(event.target).text();
			$(event.target).text(currText+" - "+TAPi18n.__("ui.button.confirm"));
		}
		return false;
	} else {
		if (displayChange) {
			//$(event.target).css('background-color', 'green');
			var currText = $(event.target).text();
			$(event.target).text(currText.replace(" - "+TAPi18n.__("ui.button.confirm"), ""));
		}
		return true;
	}
}

function resetAllChoices() {
	var game = getCurrentGame();
	if (!game)
		return null;
	var chosenPlayers = Players.find({'gameID': game._id, selectedChoice: {$ne: null}}).fetch();
	chosenPlayers.forEach(function(chosenPlayer){
		Players.update(chosenPlayer._id, {$set: {selectedChoice: null, updatedAt: new Date()}});
	});
	Games.update(game._id, {$set: {lastChoiceResult: [], updatedAt: new Date()}});
}

function resetAllGameConditions() {
	var game = getCurrentGame();
	if (!game)
		return null;
	Games.update(game._id, {$set: {
		openInfo: '',
		endGameList: '',
		currentChoiceType: null,
		lastChoiceType: null,
		lastChoiceResult: [],
		randomPlayer: 'None',
		updatedAt: new Date(),
		startTime: null,
		paused: false,
		pausedTime: null,
	}});
}

function resetAllPlayerConditions() {
	var game = getCurrentGame();
	if (!game)
		return null;
	var players = Players.find({'gameID': game._id}).fetch();
	players.forEach(function(player){
		Players.update(player._id, {$set: {
			role: null,
			selectedChoice: null,
			isDead: false,
			openInfo: "",
			knowingText: "",
			updatedAt: new Date(),
		}});
	});
}

Meteor.setInterval(function () {
	Session.set('time', new Date());
}, 1000);

function getTimeToShow(){
	var game = getCurrentGame();
	if (!game)
		return null;
	
	var localStartTime = game.startTime - TimeSync.serverOffset();

	if (game.paused){
		var localPausedTime = game.pausedTime - TimeSync.serverOffset();
		var timeToShow = localPausedTime - localStartTime;
	} else {
		var timeToShow = Session.get('time') - localStartTime;
	}

	if (timeToShow < 0)
		timeToShow = 0;

	return timeToShow;
}

Template.timeBox.helpers({
	hideTimeBox: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideTimeBox;
	},
	timeToShow: function () {
		var timeToShow = getTimeToShow();
		return moment(timeToShow).format('mm[<span>:</span>]ss');
	},
	gamePaused: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.paused;
	},
	isHost: isHost,
});

Template.timeBox.events({
	'click #toggleTimer': function () {
		var game = getCurrentGame();
		if (!game)
			return null;

		var currentServerTime = TimeSync.serverTime(moment());

		if(game.paused){
			if (game.startTime == null)
				var newStartTime = currentServerTime;
			else
				var newStartTime = currentServerTime - (game.pausedTime - game.startTime);
			Games.update(game._id, {$set: {paused: false, pausedTime: null, startTime: newStartTime}});
		} else {
			Games.update(game._id, {$set: {paused: true, pausedTime: currentServerTime}});
		}
	},
	'click #resetTimer': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		Games.update(game._id, {$set: {paused: true, pausedTime: null, startTime: null}});
	},
});

Template.randomBox.helpers({
	randomPlayer: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.randomPlayer;
	},
	hideRandomBox: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideRandomBox;
	},
	isHost: isHost,
});

Template.randomBox.events({
	'click button#chooseRandomPlayer': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var players = Players.find({'gameID': game._id}).fetch();
		var randIndex = getRandom(players.length);
		Games.update(game._id, {$set: {randomPlayer: players[randIndex].name}});
	},
});

Template.soundBox.helpers({
	hideSoundBox: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideSoundBox;
	},
});

Template.soundBox.events({
	'click button#playSound': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		setTimeout(function() {
			Games.update(game._id, {$set: {playSoundNow: true}});
		}, 2000);
	},
});

Template.hostDisplayBox.helpers({
	hideOpenInfo: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideOpenInfo;
	},
	hideTimeBox: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideTimeBox;
	},
	hideRandomBox: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideRandomBox;
	},
	hideSoundBox: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideSoundBox;
	},
	hidePlayerList: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hidePlayerList;
	},
	hideLog: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideLog;
	},
	preventSwapping: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.preventSwapping;
	},
	preventPeeking: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.preventPeeking;
	},
	preventSendAsRole: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.preventSendAsRole;
	},
	preventSendToHost: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.preventSendToHost;
	},
	isHost: isHost
});

Template.hostDisplayBox.events({
	'click button#hideOpenInfo': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.hideOpenInfo;
		Games.update(game._id, {$set: {hideOpenInfo: !currVal}});
	},
	'click button#hideTimeBox': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.hideTimeBox;
		Games.update(game._id, {$set: {hideTimeBox: !currVal}});
	},
	'click button#hideRandomBox': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.hideRandomBox;
		Games.update(game._id, {$set: {hideRandomBox: !currVal}});
	},
	'click button#hideSoundBox': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.hideSoundBox;
		Games.update(game._id, {$set: {hideSoundBox: !currVal}});
	},
	'click button#hidePlayerList': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.hidePlayerList;
		Games.update(game._id, {$set: {hidePlayerList: !currVal}});
	},
	'click button#hideLog': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.hideLog;

		if (currVal) {
			var choice = confirm(TAPi18n.__("ui.dialog.show game log"));
			if (choice == false)
				return false;
		}

		Games.update(game._id, {$set: {hideLog: !currVal}});
	},
	'click button#preventSwapping': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.preventSwapping;
		Games.update(game._id, {$set: {preventSwapping: !currVal}});
	},
	'click button#preventPeeking': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.preventPeeking;
		Games.update(game._id, {$set: {preventPeeking: !currVal}});
	},
	'click button#preventSendAsRole': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.preventSendAsRole;
		Games.update(game._id, {$set: {preventSendAsRole: !currVal}});
	},
	'click button#preventSendToHost': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var currVal = game.preventSendToHost;
		Games.update(game._id, {$set: {preventSendToHost: !currVal}});
	},
});

Template.log.helpers({
	logs: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		var logs = Logs.find({'gameID': game._id}, {sort: {createdAt: -1}}).fetch();
		return logs;
	},
	hideLog: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.hideLog;
	},
});

Template.chat.helpers({
	messages: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		var player = getCurrentPlayer();
		if (!player)
			return false;
		var messages = Messages.find({gameID: game._id, $or: [{isPrivate: false}, {recipientID: player._id}, {senderID: player._id}], createdAt: {$gt: moment().subtract(60, 'minutes').toDate()}}, {sort: {createdAt: -1}}).fetch();
		return messages;
	},
	preventSendAsRole: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.preventSendAsRole;
	},
	preventSendToHost: function () {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		return game.preventSendToHost;
	},
	isHost: isHost,
	isGameState: function (state) {
		return getGameState() == state;
	},
});

Template.chat.events({
	'click button#sendmsg': sendChatMsg,
	'keydown #msg': function (event) {
		if (event.keyCode == 13) {
			sendChatMsg();
			return false;
		}
	},
	'click button#toggleChat': function () {
		$('#chat').toggleClass("hidden");
		if ($("#toggleChat").text()==TAPi18n.__("ui.button.game menu.hide chat"))
			$("#toggleChat").text(TAPi18n.__("ui.button.game menu.show chat"));
		else
			$("#toggleChat").text(TAPi18n.__("ui.button.game menu.hide chat"));
	},
});

function sendChatMsg () {
	var msg = $('#msg').val().trim();
	if (!msg)
		return false;
	var game = getCurrentGame();
	if (!game)
		return;
	var player = getCurrentPlayer();
	if (!player)
		return false;
	var showRole = $('#showRole').is(":checked");
	var toHost = $('#toHost').is(":checked");
	var displayName = player.name;
	if (!(game.preventSendAsRole) && showRole && player.role != null)
		displayName = player.role.name.replace(/ *<.*>/g, "");
	var recipientID = null;
	var isPrivate = false;
	if (!(game.preventSendToHost) && toHost) {
		var hostPlayer = Players.findOne({gameID: game._id, isHost: true});
		if (hostPlayer)
			recipientID = hostPlayer._id;
		isPrivate = true;
	}
	createMessage(msg, player._id, recipientID, displayName, game._id, isPrivate);
	$('#msg').val('');
}

function createMessage(msg, senderID, recipientID, displayName, gameID, isPrivate){
	var message = {
		content: msg,
		senderID: senderID,
		recipientID: recipientID,
		isPrivate: isPrivate,
		sender: displayName,
		gameID: gameID,
		createdAt: new Date()
	};

	//Messages.insert(message);
	Meteor.call('createMessage', message);
}

function createLog(msg){
	var game = getCurrentGame();
	if (!game)
		return;

	var log = {
		content: msg,
		gameID: game._id,
		createdAt: new Date()
	};

	Logs.insert(log);
}

function clearLogs(){
	var game = getCurrentGame();
	if (!game)
		return;
	var logs = Logs.find({'gameID': game._id}).fetch();
	logs.forEach(function(log){
		Logs.remove(log._id);
	});
}

function showErrorMessage(msg) {
	FlashMessages.sendError(msg);
}

function showInfoMessage(msg) {
	FlashMessages.sendInfo(msg);
}

function clearMessage() {
	FlashMessages.clear();
}

function getKnownPlayers(currentPlayer) {
	var game = getCurrentGame();
	if (!game) {
		return null;
	}
	var rollyDict = game.roleMapParsed;
/*
	var currentPlayer = getCurrentPlayer();
	if (!currentPlayer) {
		return null;
	}
*/
	var tagRegex = / *<.*>/g;
	var yourRoleName = currentPlayer.role.name.replace(tagRegex, "");
	var knowingText = yourRoleName + " = You<br>";

	if (currentPlayer.role.desc) {
		knowingText += "<br>"+currentPlayer.role.desc+"<br><br>";
	}

	var knownList = currentPlayer.role.knows;

	for (var i=0; i < knownList.length; i++){ var subKnownList = knownList[i];
		var leftSide = [];
		var rightSide = [];
		for (var j=0; j < subKnownList.length; j++){ var item = subKnownList[j];
			var roleplayers = Players.find({'gameID': game._id, 'role.id': rollyDict[item].id, _id: {$ne: currentPlayer._id}}).fetch();
			if (roleplayers.length) {
				var thisRoleName = roleplayers[0].role.name.replace(tagRegex, "");
				leftSide.push(thisRoleName);
			}
			roleplayers.forEach(function(roleplayer){
				rightSide.push(roleplayer.name);
			});
		}
		if (rightSide.length == 0)
			continue;
		rightSide = shuffleArray(rightSide);
		var bothSides = leftSide.join(', ') + " = " + rightSide.join(', ');
		knowingText = knowingText + bothSides + "<br>";
	}

	return knowingText;
}

function savePlayersWithRoles() {
	var game = getCurrentGame();
	if (!game) {
		return null;
	}
	playerListRoles = "";
	var players = Players.find({'gameID': game._id}).fetch();
	players.forEach(function(player){
		var roleName = player.role.name.replace(/ *<.*>/g, "");
		playerListRoles += player.name + ': ' + roleName + '<br>';
		
		var knowingText = getKnownPlayers(player);
		Players.update(player._id, {$set: {knowingText: knowingText, updatedAt: new Date()}});
		telePlayerUpdate(player, knowingText);
	});
	Games.update(game._id, {$set: {endGameList: playerListRoles, updatedAt: new Date()}});
}

function showDummyBoxes() {
	var game = getCurrentGame();
	if (!game) {
		return null;
	}
	var dummyPlayers = Players.find({gameID: game._id, isDummy: true}).count();
	return isHost() && dummyPlayers;
}

Template.dummyBoxes.helpers({
	isHost: isHost,
	showDummyBoxes: showDummyBoxes,
	dummyPlayers: function (state) {
		var game = getCurrentGame();
		if (!game) {
			return null;
		}
		var player = getCurrentPlayer();
		if (!player) {
			return null;
		}
		var playerIsMod = (player.role.name.indexOf("<Host>") >= 0);
		if (playerIsMod) {
			var players = Players.find({gameID: game._id, isDummy: true}).fetch();
		} else {
			var players = Players.find({gameID: game._id, $or: [{isDummy: true},{isHost: true}]}).fetch();
		}
		return players;
	},
});

Template.dummyBoxes.events({
	'click button.secret.tapToShow': function (event) {
		//if ($('button.secret.tapToHide').length > 0)
		//	return false;
		$(event.target).removeClass('tapToShow');
		$(event.target).addClass('tapToHide');

		$(event.target).next(".showHere").show();
		$("#overlay").show();

		//if (Session.get('preventAccidents')) {
			$(event.target).addClass('disabled');
		//}
	},
/*
	'click button.secret.tapToHide': function (event) {
		$(event.target).removeClass('tapToHide');
		$(event.target).addClass('tapToShow');

		$(event.target).next(".showHere").hide();
		$("#overlay").hide();

		//if (Session.get('preventAccidents')) {
			$(event.target).addClass('disabled');
		//}
	},
*/
	'click button.closeDummyBox': function (event) {
		$(".showHere").hide();
		$("#overlay").hide();
	},
});

Template.gameMenu.helpers({
	isHost: isHost,
	isGameState: function (state) {
		return getGameState() == state;
	},
});

Template.gameMenu.events({
	'click button#startgame': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		var players = Players.find({gameID: game._id}).fetch();

		if (players.length != game.roleMapCount) {
			showErrorMessage(TAPi18n.__("ui.validation.start game wrong player number", {playercount: players.length, rolecount: game.roleMapCount}));
			return false;
		}

		parseVoteMapForPlayers(game.voteMap);

		assignPlayers(players, game.roleMapParsed, game.pileList, game.themeMapParsed);

		savePlayersWithRoles();
		
		Games.update(game._id, {$set: {state: 'inProgress', hidePlayerList: true, updatedAt: new Date()}});
	},
	'click button.endgame.ingame': function (event) {
		if (!reqDoubleClick(event, true))
			return false;
		endGame();
	},
	'click button.leavegame.inlobby': leaveGame,
	'click button.leavegame.ingame': function () {
		var player = getCurrentPlayer();
		var game = getCurrentGame();
		if (player && player.state != 0 && game && game.state == "inProgress") {
			var choice = confirm(TAPi18n.__("ui.dialog.player leave game"));
			if (choice == false)
				return false;
		}
		leaveGame();
	},
	'click button.preparegame.ingame': function () {
		var game = getCurrentGame();
		if (!game)
			return null;
		Games.update(game._id, {$set: {state: 'waitingForPlayers', hidePlayerList: false, updatedAt: new Date()}});
		resetAllGameConditions();
		resetAllPlayerConditions();
		clearLogs();
	},
});

function endGame() {
	var game = getCurrentGame();
	if (!game)
		return null;
	Games.update(game._id, {$set: {state: 'over', updatedAt: new Date()}});
	generateNewResult(game);
	teleGameUpdate(game, TAPi18n.__("telegram.event.game ended")+'\n'+game.endGameList);
}

function generateNewResult(game){
	var numPlayers = Players.find({gameID: game._id}).count();
	var result = {
		started: game.createdAt,
		ended: new Date(),
		numPlayers: numPlayers,
		roleMap: game.roleMap
	};

	Results.insert(result);
}

setTimeout(function() {
	Tracker.autorun(maintainIntegrityPlayer);
}, 000);

//Tracker.autorun(trackGameState);
Tracker.autorun(trackSoundState);
Tracker.autorun(autoSubscribe);

function autoSubscribe () {
	var gameID = Session.get("gameID");
	Meteor.subscribe("games", gameID);
	Meteor.subscribe("players", gameID);
	Meteor.subscribe("messages", gameID);
	Meteor.subscribe("logs", gameID);
}
/*
function maintainIntegrityGame () {
	var gameID = Session.get("gameID");
	var playerID = Session.get("playerID");

	if (!gameID || !playerID) {
		return false;
	}

	var game = Games.findOne(gameID);
	if (!game) {
		kickSelfOutOfGame(gameID, playerID);
	}
}
*/
function maintainIntegrityPlayer () {
	var gameID = Session.get("gameID");
	var playerID = Session.get("playerID");

	if (!gameID || !playerID) {
		return;
	}

	var player = Players.findOne(playerID);
	//need the above to trigger the running of the following when necessary
	//need the following before taking action because client cannot query players directly in some cases

	Meteor.call('findPlayer', playerID, function(error, result) {
		if (error) {
			kickSelfOutOfGame(gameID, playerID);
			showErrorMessage(TAPi18n.__("ui.server connect error"));
		} else {
			var player = result;
			if (!player) {
				kickSelfOutOfGame(gameID, playerID);
			}
		}
	});
}

function kickSelfOutOfGame(gameID, playerID) {
	Session.set("gameID", null);
	Session.set("playerID", null);
	Session.set("BKgameID", gameID);
	Session.set("BKplayerID", playerID);
	Session.set("currentView", "startMenu");
}

function getGameState () {
	var gameVar = Games.findOne(Session.get("gameID"), {fields: {'state': 1}});
	if (!gameVar)
		return null;
	else
		return gameVar.state;
}
/*
function trackGameState () {
	var state = getGameState();
	clearMessage();
	if (state == 'playerQuit') {
		Tracker.nonreactive(leaveGame);
		FlashMessages.sendError(TAPi18n.__("ui.update.player left"), {autoHide: false});
	}
}
*/
function trackSoundState () {
	var game = getCurrentGame();
	if (!game)
		return null;
	if (game.playSoundNow == true) {
		if (isHost()) {
			Games.update(game._id, {$set: {playSoundNow: false}});
			var audio = new Audio('sfx/woop-sound.mp3');
			audio.play();
		}
	}
}

Template.ruleBox.events({
	'click button#toggleIntro': function () {
		$('#ruleContent').hide();
		$('#guideContent').hide();
		$('#introContent').toggle();
	},
	'click button#toggleRules': function () {
		$('#introContent').hide();
		$('#guideContent').hide();
		$('#ruleContent').toggle();
	},
	'click button#toggleGuide': function () {
		$('#introContent').hide();
		$('#ruleContent').hide();
		$('#guideContent').toggle();
	},
});

Template.footer.helpers({
	versionNo: function () {
		return VERSION_NUMBER;
	}
});

Template.footer.events({
	'click #usurp': function (event) {
		if (!reqDoubleClick(event, false))
			return false;

		if ($('#accessCode').val())
			var usurpCode = $('#accessCode').val().trim().toLowerCase();
		else
			var usurpCode = '';
		if (usurpCode == '')
			usurpCode = Session.get("usurpCode");
		
		Meteor.call('findGame', {usurpCode: usurpCode}, function(error, result) {
			if (error) {
				showErrorMessage(TAPi18n.__("ui.server connect error"));
			} else {
				var game = result;
				if (!game)
					return false;

				if (Session.get("currentView") == "lobby") {
					if (Session.get("gameID") != game._id)
						return false;

					var player = getCurrentPlayer();
					if (!player)
						return false;

					var oldHost = Players.findOne({gameID: game._id, isHost: true});
					Players.update(oldHost._id, {$set: {isHost: false}});

					Players.update(player._id, {$set: {isHost: true}});
				} else {
					/*
					//for now, just usurp from within
					var playerName = $('#playerName').val().trim();
					if (!playerName) {
						return false;
					}

					var oldHost = Players.findOne({gameID: game._id, isHost: true});
					Players.update(oldHost._id, {$set: {isHost: false}});

					var player = generateNewHostPlayer(game, playerName);

					Session.set("playerName", playerName);
					Session.set("accessCode", game.accessCode);
					Session.set("playerAccessCode", player.accessCode);
					Session.set("usurpCode", game.usurpCode);
					Session.set("gameID", game._id);
					Session.set("playerID", player._id);
					Session.set("currentView", "lobby");
					*/
				}
			}
		});
	},
});

function teleGameUpdate(game, text) {
	if (!game)
		game = getCurrentGame()
	if (!game)
		return;
	var chatID = game.telegram;
	if (chatID)
		return Meteor.call('messageFromWeb', chatID, text);
};

function telePlayerUpdate(player, text) {
	if (!player)
		player = getCurrentPlayer()
	if (!player)
		return;
	var chatID = player.telegram;
	if (chatID)
		return Meteor.call('messageFromWeb', chatID, text);
};

function telePlayerKeyboardUpdate(player, text, array) {
	if (!player)
		player = getCurrentPlayer()
	if (!player)
		return;
	var chatID = player.telegram;
	if (chatID)
		return Meteor.call('messageKeyboardFromWeb', chatID, text, array);
};
