joinGame = (c, u, o) ->
	if o.chat.type != "group"
		TelegramBot.send('Sorry, you can only join games from a group chat', o.chat.id)
		return
	game = Games.findOne({telegram: o.chat.id})
	if game
		TelegramBot.send('You are already in a game, please /leavegame first', o.chat.id)
		return
	if c.length < 4
		TelegramBot.send('Please put your room access code from the web app after /joingame', o.chat.id)
		return
	accessCode = c[1] + " " + c[2] + " " + c[3]
	accessCode = accessCode.trim().toLowerCase()
	game = Games.findOne({accessCode: accessCode})
	if game
		if game.telegram
			TelegramBot.send('You have been disconnected from your game', game.telegram)
		Games.update game._id, $set: telegram: o.chat.id, updatedAt: new Date
		createLog game._id, 'A telegram chat has been connected'
		TelegramBot.send('Joined game!', o.chat.id)
	else
		TelegramBot.send('Could not find game', o.chat.id)
		return

joinPlayer = (c, u, o) ->
	if o.chat.type != "private"
		TelegramBot.send('Sorry, you can only link to players from a private chat with the bot', o.chat.id)
		return
	player = Players.findOne({telegram: o.chat.id})
	if player
		TelegramBot.send('You are already connected to a player, please /leaveplayer first', o.chat.id)
		return
	if c.length < 4
		TelegramBot.send('Please put your player access code from the web app after /joinplayer', o.chat.id)
		return
	accessCode = c[1] + " " + c[2] + " " + c[3]
	accessCode = accessCode.trim().toLowerCase()
	player = Players.findOne({accessCode: accessCode})
	if player
		if player.telegram
			TelegramBot.send('You have been disconnected from your player', player.telegram)
		Players.update player._id, $set: telegram: o.chat.id, updatedAt: new Date
		TelegramBot.send('Joined as player '+player.name+'!', o.chat.id)
		if player.role
			TelegramBot.send(cleanMsg(player.knowingText), o.chat.id)
	else
		TelegramBot.send('Could not find player', o.chat.id)
		return

Meteor.startup ->
	TelegramBot.token = TELEGRAM_TOKEN
	TelegramBot.start()
	TelegramBot.addListener '/start', (c, u, o) ->
		'Welcome! Please type /help if you don\'t know how to use this bot'
	TelegramBot.addListener '/joingame', (c, u, o) ->
		joinGame(c, u, o)
		false
	TelegramBot.addListener '/joinplayer', (c, u, o) ->
		joinPlayer(c, u, o)
		false
	TelegramBot.addListener '/leavegame', (c, u, o) ->
		game = Games.findOne({telegram: o.chat.id})
		if !game
			return 'You are not in a game anyway'
		Games.update game._id, $set: telegram: null
		createLog game._id, 'A telegram chat has been disconnected'
		'Left room!'
	TelegramBot.addListener '/leaveplayer', (c, u, o) ->
		player = Players.findOne({telegram: o.chat.id})
		if !player
			return 'You are not linked to a player anyway'
		Players.update player._id, $set: telegram: null
		'Delinked from player!'
	TelegramBot.addListener '/v', (c, u, o) ->
		if c.length < 2
			return 'Please put your choice after the command'
		player = Players.findOne({telegram: o.chat.id})
		if !player
			return 'Sorry, you are not linked to a player'
		game = Games.findOne(player.gameID)
		if !game
			return 'Sorry, your player is not in a game'
		if game.currentChoiceType == null
			return 'Sorry, it\'s not time to vote yet'
		vote = c[1..].join(' ')
		index = game.currentChoiceType.choices.indexOf(vote)
		if index == -1
			return 'Sorry, that\'s not a valid vote'
		Players.update(player._id, {$set: {selectedChoice: vote, updatedAt: new Date()}});
		TelegramBot.send("Who has voted so far:\n"+getCurrentVotingStatus(game), game.telegram)
		'You have successfully cast your vote'
	TelegramBot.addListener '/web', (c, u, o) ->
		url = WEB_URL
		game = Games.findOne({telegram: o.chat.id})
		player = Players.findOne({telegram: o.chat.id})
		if player
			return url+"player/"+player.accessCode.replace(/ /g, "%20")
		else if game
			return url+"game/"+game.accessCode.replace(/ /g, "%20")
		else
			return url
	TelegramBot.addListener '/help', (c, u, o) ->
		"For this to work optimally, please link your group chat (with all players) to the web game with /joingame, and your private chat with the bot to your web player with /joinplayer. It needs to be two separate chats because telegram doesn't provide a way for bots and users to privately exchange messages within a group chat. \n\n

		/joingame aaa bbb ccc \n
		Replace access code with the one for your game on the web app to link this chat to that game \n\n

		/joinplayer aaa bbb ccc \n
		Replace access code with the one for your player on the web app to link this chat to that player \n\n

		/leavegame \n
		Delink this chat from the current game \n\n

		/leaveplayer \n
		Delink this chat from the current player \n\n

		/web \n
		Get link to web app \n\n
		"
	return

chunkArray = (array, chunkSize) ->
	[].concat.apply [], array.map((elem, i) ->
		if i % chunkSize then [] else [ array.slice(i, i + chunkSize) ]
	)
	
makeKeyboard = (kb) ->
	JSON.stringify keyboard: kb, one_time_keyboard: true

@messageFromWeb = (chatID, text) ->
	TelegramBot.method 'sendMessage',
		chat_id: chatID
		text: cleanMsg(text)

@messageKeyboardFromWeb = (chatID, text, array) ->
	array = array.map((item, index) ->
		"/v "+item
	)
	kb = chunkArray(array, 1)
	TelegramBot.method 'sendMessage',
		chat_id: chatID
		text: cleanMsg(text)
		reply_markup: makeKeyboard(kb)

createLog = (gameID, msg) ->
	log = 
		content: msg
		gameID: gameID
		createdAt: new Date
	Logs.insert log
	return

cleanMsg = (msg) ->
	return String(msg).replace(/<br>/gi, '\n').replace(/&#44;/g, ',')
