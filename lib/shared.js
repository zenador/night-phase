this.getNumChoicesSubmitted = function (game) {
	return Players.find({'gameID': game._id, selectedChoice: {$ne: null}}).count();
}

this.getPlayersChoicesSubmitted = function (game) {
	var thosePlayers = Players.find({'gameID': game._id, selectedChoice: {$ne: null}}).fetch();
	if (!thosePlayers || thosePlayers.length == 0) {
		return '0';
	} else {
		var thosePlayersNames = [];
		thosePlayers.forEach(function(thatPlayer){
			thosePlayersNames.push(thatPlayer.name);
		});
		return thosePlayersNames.length + ": " + thosePlayersNames.join(', ');
	}
}

this.getCurrentVotingStatus = function (game) {
	if (game.currentChoiceType.shouldShowChoicePlayer) {
		return getPlayersChoicesSubmitted(game);
	} else {
		return getNumChoicesSubmitted(game);
	}
}
