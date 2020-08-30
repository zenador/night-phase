templates = [
	{
		id: 'new',
		name: 'Select Template',
		roleMap: '',
		voteMap: '',
		themeMap: ''
	},
	{
		id: 'artist',
		name: 'A Fake Artist Goes to New York',
		roleMap: '#Designed by Jun Sasaki and published by Oink Games\n\n1, <Theme>, , , 3\n2, Fake Artist, , , 1\n3, Question Master <Host>, , , 1',
		voteMap: 'Fake, <Players>, 2',
		themeMap: '{Subject}'
	},
	{
		id: 'avalon',
		name: 'Avalon',
		roleMap: '#Designed by Don Eskridge and published by Indie Boards & Cards\n\n1, Merlin, 4-5-8-9-10-11-14-15-17, Good. Knows evil&#44; must remain hidden, 1\n2, Percival, 1-5, Good. Knows Merlin, 1\n3, Loyal Servant, , Good. Loyal Servant of Arthur, 1\n4, Assassin, 5-6-11-14 8 15-16, Evil. Minion of Mordred, 1\n5, Morgana, 4-6-11-14 8 15-16, Evil. Appears as Merlin, 1\n6, Mordred, 4-5-11-14 8 15-16, Evil. Unknown to Merlin, 0\n7, Good Lancelot, , Good?, 0\n8, Evil Lancelot, , Evil?, 0\n9, Smart Oberon, 4-5-6-11-14, Evil. Unknown to Evil, 0\n10, Dumb Oberon, , Evil. Unknown to Evil, 0\n11, Evil Minion, 4-5-6-11-14 8 15-16, Evil. Minion of Mordred, 0\n12, Guinevere, 7-8, Good, 0\n13, Good Reverser, , Good, 0\n14, Bad Reverser, 4-5-6-11 8 15-16, Evil, 0\n15, Real Oberon, , Evil, 0\n16, Fake Oberon, , Good. Appears as Oberon to Evil, 0\n17, Sir Kay, , Good. Appears as Evil to Merlin, 0',
		counts: [{
			name: '5p',
			numbers: '{"1": 1, "2": 1, "3": 1, "4": 1, "5": 1}'
		}, {
			name: '6p',
			numbers: '{"1": 1, "2": 1, "3": 2, "4": 1, "5": 1}'
		}, {
			name: '7p',
			numbers: '{"1": 1, "2": 1, "3": 2, "4": 1, "5": 1, "6": 1}'
		}, {
			name: '8p',
			numbers: '{"1": 1, "2": 1, "3": 3, "4": 1, "5": 1, "6": 1}'
		}, {
			name: '9p',
			numbers: '{"1": 1, "2": 1, "3": 4, "4": 1, "5": 1, "6": 1}'
		}, {
			name: '10p',
			numbers: '{"1": 1, "2": 1, "3": 4, "4": 1, "5": 1, "6": 1, "10": 1}'
		}],
		voteMap: 'Mission, Success/Fail, 1\nMission (Reverse), Success/Fail/Reverse, 1\nTeam Selection, Approve/Reject, 2',
		themeMap: ''
	},
	{
		id: 'bloodboundonlycolour',
		name: 'Blood Bound (online, only colours shown)',
		roleMap: '#Designed by Kalle Krenzer and published by Fantasy Flight Games\n#When playing online, the host can:\n#- Display Player List so everyone can see who they \'sit\' next to and can record open info like their wounds or items next to their names\n#- Allow Peeking at start of game for the initial role sharing and then Prevent Peeking afterwards. Unfortunately, any Harlequin actions need to be handled through external private messages\n#- Display Log to discourage cheating (logs each peek action)\n\nRed Rose Clan | [1, 2, 3, 4, 5, 6, 7, 8, 9] | 3\nBlue Beast Clan | [10, 11, 12, 13, 14, 15, 16, 17, 18] | 3\nInquisitor | [19, 20] | 0\n---\n1, Red, , Elder (1). May use Quill to reverse leadership order. R R 1, 0\n2, Red, , Assassin (2). May double-stab. ? ? 2, 0\n3, Blue, , Harlequin (3). Your true clan is Red. May investigate 2 cards. ? ? 3, 0\n4, Red, , Alchemist (4). May force or heal 1 wound of target when intervening. ? ? 4, 0\n5, Red, , Mentalist (5). May force a player to reveal rank token. R R 5, 0\n6, Red, , Guardian (6). May Shield a target until wounded thrice. R R 6, 0\n7, Red, , Berserker (7). May force attacker to suffer 1 wound. ? R 7, 0\n8, Red, , Mage (8). May Staff target so both do not reveal colour tokens. ? R 8, 0\n9, Red, , Courtesan (9). May Fan a target so they cannot receive intervention. ? R 9, 0\n10, Blue, , Elder (1). May use Quill to reverse leadership order. B B 1, 0\n11, Blue, , Assassin (2). May double-stab. ? ? 2, 0\n12, Red, , Harlequin (3). Your true clan is Blue. May investigate 2 cards. ? ? 3, 0\n13, Blue, , Alchemist (4). May force or heal 1 wound of target when intervening. ? ? 4, 0\n14, Blue, , Mentalist (5). May force a player to reveal rank token. B B 5, 0\n15, Blue, , Guardian (6). May Shield a target until wounded thrice. B B 6, 0\n16, Blue, , Berserker (7). May force attacker to suffer 1 wound. ? B 7, 0\n17, Blue, , Mage (8). May Staff target so both do not reveal colour tokens. ? B 8, 0\n18, Blue, , Courtesan (9). May Fan a target so they cannot receive intervention. ? B 9, 0\n19, Red, , Inquisitor (*). Wins if leader of the winning clan has the True Curse. ?/R/B ?/R/B *, 0\n20, Blue, , Inquisitor (*). Wins if leader of the winning clan has the True Curse. ?/R/B ?/R/B *, 0',
		counts: [{
			name: '6p',
			numbers: '{"Red Rose Clan": 3, "Blue Beast Clan": 3, "Inquisitor": 0}'
		}, {
			name: '7p',
			numbers: '{"Red Rose Clan": 3, "Blue Beast Clan": 3, "Inquisitor": 1}'
		}, {
			name: '8p',
			numbers: '{"Red Rose Clan": 4, "Blue Beast Clan": 4, "Inquisitor": 0}'
		}, {
			name: '9p',
			numbers: '{"Red Rose Clan": 4, "Blue Beast Clan": 4, "Inquisitor": 1}'
		}, {
			name: '10p',
			numbers: '{"Red Rose Clan": 5, "Blue Beast Clan": 5, "Inquisitor": 0}'
		}, {
			name: '11p',
			numbers: '{"Red Rose Clan": 5, "Blue Beast Clan": 5, "Inquisitor": 1}'
		}, {
			name: '12p',
			numbers: '{"Red Rose Clan": 6, "Blue Beast Clan": 6, "Inquisitor": 0}'
		}, {
			name: '13p',
			numbers: '{"Red Rose Clan": 6, "Blue Beast Clan": 6, "Inquisitor": 1}'
		}],
		voteMap: '',
		themeMap: ''
	},
	{
		id: 'bloodbound',
		name: 'Blood Bound (offline, full role shown)',
        roleMap: '#Designed by Kalle Krenzer and published by Fantasy Flight Games\n#When playing offline, the host can:\n#- Display Player List so everyone can record open info like their wounds or items next to their names\n#- At start of game for the initial role sharing, ask players to select all text after their apparent colour in the role box and then Hide Selected Info before showing it to the player on the left\n#- For Harlequin actions, can temporarily Allow Peeking, and then Prevent Peeking afterwards (or just ask the player to Restore Info and show it to the Harlequin)\n#- Display Log to discourage cheating (logs each peek action)\n\nRed Rose Clan | [1, 2, 3, 4, 5, 6, 7, 8, 9] | 3\nBlue Beast Clan | [10, 11, 12, 13, 14, 15, 16, 17, 18] | 3\nInquisitor | [19, 20] | 0\n---\n1, Red Elder (1), , May use Quill to reverse leadership order. R R 1, 0\n2, Red Assassin (2), , May double-stab. ? ? 2, 0\n3, Blue Harlequin (3), , Your true clan is Red. May investigate 2 cards. ? ? 3, 0\n4, Red Alchemist (4), , May force or heal 1 wound of target when intervening. ? ? 4, 0\n5, Red Mentalist (5), , May force a player to reveal rank token. R R 5, 0\n6, Red Guardian (6), , May Shield a target until wounded thrice. R R 6, 0\n7, Red Berserker (7), , May force attacker to suffer 1 wound. ? R 7, 0\n8, Red Mage (8), , May Staff target so both do not reveal colour tokens. ? R 8, 0\n9, Red Courtesan (9), , May Fan a target so they cannot receive intervention. ? R 9, 0\n10, Blue Elder (1), , May use Quill to reverse leadership order. B B 1, 0\n11, Blue Assassin (2), , May double-stab. ? ? 2, 0\n12, Red Harlequin (3), , Your true clan is Blue. May investigate 2 cards. ? ? 3, 0\n13, Blue Alchemist (4), , May force or heal 1 wound of target when intervening. ? ? 4, 0\n14, Blue Mentalist (5), , May force a player to reveal rank token. B B 5, 0\n15, Blue Guardian (6), , May Shield a target until wounded thrice. B B 6, 0\n16, Blue Berserker (7), , May force attacker to suffer 1 wound. ? B 7, 0\n17, Blue Mage (8), , May Staff target so both do not reveal colour tokens. ? B 8, 0\n18, Blue Courtesan (9), , May Fan a target so they cannot receive intervention. ? B 9, 0\n19, Red Inquisitor (*), , Wins if leader of the winning clan has the True Curse. ?/R/B ?/R/B *, 0\n20, Blue Inquisitor (*), , Wins if leader of the winning clan has the True Curse. ?/R/B ?/R/B *, 0',
		counts: [{
			name: '6p',
			numbers: '{"Red Rose Clan": 3, "Blue Beast Clan": 3, "Inquisitor": 0}'
		}, {
			name: '7p',
			numbers: '{"Red Rose Clan": 3, "Blue Beast Clan": 3, "Inquisitor": 1}'
		}, {
			name: '8p',
			numbers: '{"Red Rose Clan": 4, "Blue Beast Clan": 4, "Inquisitor": 0}'
		}, {
			name: '9p',
			numbers: '{"Red Rose Clan": 4, "Blue Beast Clan": 4, "Inquisitor": 1}'
		}, {
			name: '10p',
			numbers: '{"Red Rose Clan": 5, "Blue Beast Clan": 5, "Inquisitor": 0}'
		}, {
			name: '11p',
			numbers: '{"Red Rose Clan": 5, "Blue Beast Clan": 5, "Inquisitor": 1}'
		}, {
			name: '12p',
			numbers: '{"Red Rose Clan": 6, "Blue Beast Clan": 6, "Inquisitor": 0}'
		}, {
			name: '13p',
			numbers: '{"Red Rose Clan": 6, "Blue Beast Clan": 6, "Inquisitor": 1}'
		}],
		voteMap: '',
		themeMap: ''
	},
	{
		id: 'mm',
		name: 'Moriarty\'s Machinations',
		roleMap: '#Designed and published by Redbeard Duadikos\n\n1, Sherlock Holmes (The Detective), 9 3 8, Cop, 0\n2, Professor Moriarty (The Mastermind), 3-8, Robber, 1\n3, Inspector Lestrade (The Policeman), , Cop, 1\n4, Colonel Sebastian Moran (The Bodyguard), 2, Robber, 0\n5, Judge Grede (The Corrupt Magistrate), 9, Robber, 1\n6, Jack the Ripper (The Killer), , Robber, 1\n7, Irene Adler (The Love Interest), 1, Neutral, 0\n8, Doctor Watson (The Loyal Friend), 1, Cop, 1\n9, Brutus (The Thug), , Robber, 0\n10, Mycroft Holmes (The Government Agent), 9, Cop, 0',
		counts: [{
			name: '5p',
			numbers: '{"2": 1, "3": 1, "5": 1, "6": 1, "8": 1}'
		}, {
			name: '6p',
			numbers: '{"1": 1, "2": 1, "3": 1, "4": 1, "6": 1, "7": 1}'
		}, {
			name: '7p',
			numbers: '{"1": 1, "2": 1, "3": 1, "4": 1, "6": 1, "8": 1, "9": 1}'
		}, {
			name: '8p',
			numbers: '{"1": 1, "2": 1, "3": 1, "4": 1, "6": 1, "7": 1, "8": 1, "9": 1}'
		}, {
			name: '9p',
			numbers: '{"1": 1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "8": 1, "9": 1, "10": 1}'
		}, {
			name: '10p',
			numbers: '{"1": 1, "2": 1, "3": 1, "4": 1, "5": 1, "6": 1, "7": 1, "8": 1, "9": 1, "10": 1}'
		}],
		voteMap: 'Heist, Abet/Foil/Take the Fall, 1\nTeam Selection, Approve/Reject, 2',
		themeMap: ''
	},
	{
		id: 'resistance',
		name: 'Resistance',
		roleMap: '#Designed by Don Eskridge and published by Indie Boards & Cards\n\n# Vanilla\n\n1, Spy, 1-4-13 3 9-10 11, , 2\n2, Resistance, , , 3\n\n# Chief/Hunter\n\n3, Spy Chief, 1-4-13 9-10 11, , 0\n4, Spy Hunter, 1-13 3 9-10 11, , 0\n5, Resistance Chief, 5 8, , 0\n6, Resistance Hunter, , , 0\n7, Resistance Dummy Agent, , , 0\n8, Resistance Coordinator, , , 0\n9, Spy Deep Agent, , , 0\n10, Resistance Pretender, , , 0\n\n# Defector\n\n11, Spy Defector, , , 0\n12, Resistance Defector, , , 0\n\n# Reverser\n\n13, Spy Reverser, 1-4 3 9-10 11, , 0\n14, Resistance Reverser, , , 0',
		counts: [{
			name: '5p',
			numbers: '{"1": 2, "2": 3}'
		}, {
			name: '6p',
			numbers: '{"1": 2, "2": 4}'
		}, {
			name: '7p',
			numbers: '{"1": 3, "2": 4}'
		}, {
			name: '8p',
			numbers: '{"1": 3, "2": 5}'
		}, {
			name: '9p',
			numbers: '{"1": 3, "2": 6}'
		}, {
			name: '10p',
			numbers: '{"1": 4, "2": 6}'
		}],
		voteMap: 'Mission, Success/Fail, 1\nMission (Hunter), Success/Fail/Chief Fail, 1\nMission (Reverse), Success/Fail/Reverse, 1\nTeam Selection, Approve/Reject, 2',
		themeMap: ''
	},
	{
		id: 'hitler',
		name: 'Secret Hitler',
		roleMap: '#Designed by Max Temkin, Mike Boxleiter and Tommy Maranges\n#Role assignation only\n\n1, Liberal, , Liberal, 3\n2, Fascist, 2 3-4, Fascist, 1\n3, Hitler <7-10p>, , Fascist, 0\n4, Hitler <5-6p>, 2, Fascist, 1',
		counts: [{
			name: '5p',
			numbers: '{"1": 3, "2": 1, "4": 1}'
		}, {
			name: '6p',
			numbers: '{"1": 4, "2": 1, "4": 1}'
		}, {
			name: '7p',
			numbers: '{"1": 4, "2": 2, "3": 1}'
		}, {
			name: '8p',
			numbers: '{"1": 5, "2": 2, "3": 1}'
		}, {
			name: '9p',
			numbers: '{"1": 5, "2": 3, "3": 1}'
		}, {
			name: '10p',
			numbers: '{"1": 6, "2": 3, "3": 1}'
		}],
		voteMap: 'Election, ja!/nein, 2',
		themeMap: ''
	},
	{
		id: 'shadowhunters',
		name: 'Shadow Hunters',
		roleMap: '#Designed by Yasutaka Ikeda and published by Z-Man Games\n#Role assignation only\n\nHunter | [9, 11, 13] | 0\nShadow | [15, 17, 19] | 0\nNeutral | [1, 3, 5, 7] | 0\nHunter (with Expansion) | [[[9,10], 1, "c"], [[11,12], 1, "c"], [[13,14], 1, "c"]] | 2\nShadow (with Expansion) | [[[15,16], 1, "c"], [[17,18], 1, "c"], [[19,20], 1, "c"]] | 2\nNeutral (with Expansion) | [[[1,2], 1, "c"], [[3,4], 1, "c"], [[5,6], 1, "c"], [[7,8], 1, "c"]] | 0\n---\n1, Allie, , Mother\'s Love: You can fully heal your damage (only once).<br><br>Win Condition: You\'re not dead when the game is over., 0\n2, Agnes, , Cappriccio: Can only be used at the start of your turn. Changes your win condition to "The player to your immediate left wins."<br><br>Win Condition: The player to your immediate right wins., 0\n3, Bob, , Robbery: If your attack kills a character&#44; you take all the Equipment cards that character had.<br><br>Win Condition: You have 5 or more Equipment cards., 0\n4, Bryan, , MYGOD: If your attack kills a character whose HP is 12 or less&#44; you must reveal your identity.<br><br>Win Condition: Your attack kills a player whose HP is 13 or more OR you are on the Erstwhile Altar when the game is over., 0\n5, Charles, , Bloody Feast: After you attack a character&#44; you can attack the same character again by giving yourself 2 points of damage. You can do this several times in the same turn.<br><br>Win Condition: At the time you kill another character&#44; the total number of dead characters is 3 or more., 0\n6, Catherine, , Stigmata: Heal 1 point of damage at the start of your turn.<br><br>Win Condition: You die first OR you are one of the last two characters remaining., 0\n7, Daniel, , Scream: You must reveal your identity when another character dies. You cannot reveal your identity at any other time.<br><br>Win Condition: You die first OR all the Shadow characters are dead and you are not., 0\n8, David, , Grave Digger: You make take one Equipment card of your choice from the discard pile (only once per game).<br><br>Win Condition: You have 3 or more of the following: Talisman&#44; Spear of Longinus&#44; Holy Robe&#44; Silver Rosary., 0\n9, Emi, , Teleport: When you move&#44; you can choose either to roll the dice normally OR move to an adjacent Area Card without rolling the dice.<br><br>Win Condition: All the Shadow characters are dead., 0\n10, Ellen, , Chain of Forbidden Curse: At the start of your turn&#44; choose a character and void his/her special ability until the end of the game (only once).<br><br>Win Condition: All the Shadow characters are dead., 0\n11, Franklin, , Lightning: At the start of your turn&#44; you can choose a character and give him/her damage by rolling a 6-sided die (only once).<br><br>Win Condition: All the Shadow characters are dead., 0\n12, Fu-Ka, , Dynamite Nurse: At the start of your turn&#44; you set the damage of one character to 7 (only once).<br><br>Win Condition: All the Shadow characters are dead., 0\n13, George, , Demolish: At the start of your turn&#44; you can choose a character and give him/her damage by rolling a 4-sided die (only once).<br><br>Win Condition: All the Shadow characters are dead., 0\n14, Gregor, , Ghostly Barrier: Can only be used when your turn is over. You cannot receive any damage until the start of your next turn (only once).<br><br>Win Condition: All the Shadow characters are dead., 0\n15, Unknown, , Deceit: When given a Hermit Card&#44; you may lie about your identity to trigger the card or to say "nothing happens". You do not have to reveal your identity to use this Special Ability. Ellen cannot cancel it.<br><br>Win Condition: All the Hunter characters are dead OR 3 Neutral characters are dead (7-player game only)., 0\n16, Ultra Soul, , Murder Ray: At the start of your turn&#44; you can give 3 points of damage to one character at the Underworld Gate.<br><br>Win Condition: All the Hunter characters are dead OR 3 Neutral characters are dead (7-player game only)., 0\n17, Vampire, , Suck Blood: When you attack and give damage to a player&#44; you immediately heal 2 points of your own damage.<br><br>Win Condition: All the Hunter characters are dead OR 3 Neutral characters are dead (7-player game only)., 0\n18, Valkyrie, , Horn of War Outbreak: When you attack&#44; you only roll the 4-sided die and inflict the amount of damage rolled.<br><br>Win Condition: All the Hunter characters are dead OR 3 Neutral characters are dead (7-player game only)., 0\n19, Werewolf, , Counterattack: When you are attacked by a player&#44; you can choose to counterattack him/her immediately after the initial attack is resolved. It is acceptable to reveal your identity right after you are attacked to do the counterattack.<br><br>Win Condition: All the Hunter characters are dead OR 3 Neutral characters are dead (7-player game only)., 0\n20, Wight, , Multiplication: When your turn is over&#44; you may take an additional number of turns equal to the number of dead characters (only once).<br><br>Win Condition: All the Hunter characters are dead OR 3 Neutral characters are dead (7-player game only)., 0',
		counts: [{
			name: '4p',
			numbers: '{"Hunter (with Expansion)": 2, "Shadow (with Expansion)": 2, "Neutral (with Expansion)": 0}'
		}, {
			name: '5p',
			numbers: '{"Hunter (with Expansion)": 2, "Shadow (with Expansion)": 2, "Neutral (with Expansion)": 1}'
		}, {
			name: '6p',
			numbers: '{"Hunter (with Expansion)": 2, "Shadow (with Expansion)": 2, "Neutral (with Expansion)": 2}'
		}, {
			name: '7p',
			numbers: '{"Hunter (with Expansion)": 2, "Shadow (with Expansion)": 2, "Neutral (with Expansion)": 3}'
		}, {
			name: '8p',
			numbers: '{"Hunter (with Expansion)": 3, "Shadow (with Expansion)": 3, "Neutral (with Expansion)": 2}'
		}],
		voteMap: '',
		themeMap: ''
	},
	{
		id: 'spyfall',
		name: 'Spyfall (no roles)',
		roleMap: '#Designed by Alexandr Ushan and published by Hobby World\n#No roles\n\n1, <Theme>, , , 2\n2, Spy, , , 1',
		voteMap: 'Spy, <Players>, 2',
		themeMap: 'Airplane\nBank\nBeach\nBroadway Theater\nCasino\nCathedral\nCircus Tent\nCorporate Party\nCrusader Army\nDay Spa\nEmbassy\nHospital\nHotel\nMilitary Base\nMovie Studio\nOcean Liner\nPassenger Train\nPirate Ship\nPolar Station\nPolice Station\nRestaurant\nSchool\nService Station\nSpace Station\nSubmarine\nSupermarket\nUniversity'
	},
	{
		id: 'spyfallroles',
		name: 'Spyfall (with roles)',
		roleMap: '#Designed by Alexandr Ushan and published by Hobby World\n#With roles\n\nNon-spies | [[[1,2,3,4,5,6,7], [8,9,10,11,12,13,14], [15,16,17,18,19,20,21], [22, 23, 24, 25, 26, 27, 28], [29, 30, 31, 32, 33, 34, 35], [36, 37, 38, 39, 40, 41, 42], [43, 44, 45, 46, 47, 48, 49], [50, 51, 52, 53, 54, 55, 56], [57, 58, 59, 60, 61, 62, 63], [64, 65, 66, 67, 68, 69, 70], [71, 72, 73, 74, 75, 76, 77], [78, 79, 80, 81, 82, 83, 84], [85, 86, 87, 88, 89, 90, 91], [92, 93, 94, 95, 96, 97, 98], [99, 100, 101, 102, 103, 104, 105], [106, 107, 108, 109, 110, 111, 112], [113, 114, 115, 116, 117, 118, 119], [120, 121, 122, 123, 124, 125, 126], [127, 128, 129, 130, 131, 132, 133], [134, 135, 136, 137, 138, 139, 140], [141, 142, 143, 144, 145, 146, 147], [148, 149, 150, 151, 152, 153, 154], [155, 156, 157, 158, 159, 160, 161], [162, 163, 164, 165, 166, 167, 168], [169, 170, 171, 172, 173, 174, 175], [176, 177, 178, 179, 180, 181, 182], [183, 184, 185, 186, 187, 188, 189], [190, 191, 192, 193, 194, 195, 196]], 1, "c"] | 2\n---\n0, Spy, , Spy, 1\n1, Airplane, , First Class Passenger, 0\n2, Airplane, , Air Marshall, 0\n3, Airplane, , Mechanic, 0\n4, Airplane, , Air Hostess, 0\n5, Airplane, , Copilot, 0\n6, Airplane, , Captain, 0\n7, Airplane, , Economy Class Passenger, 0\n8, Bank, , Armored Car Driver, 0\n9, Bank, , Manager, 0\n10, Bank, , Consultant, 0\n11, Bank, , Robber, 0\n12, Bank, , Security Guard, 0\n13, Bank, , Teller, 0\n14, Bank, , Customer, 0\n15, Beach, , Beach Waitress, 0\n16, Beach, , Kite Surfer, 0\n17, Beach, , Lifeguard, 0\n18, Beach, , Thief, 0\n19, Beach, , Beach Photographer, 0\n20, Beach, , Ice Cream Truck Driver, 0\n21, Beach, , Beach Goer, 0\n22, Cathedral, , Priest, 0\n23, Cathedral, , Beggar, 0\n24, Cathedral, , Sinner, 0\n25, Cathedral, , Tourist, 0\n26, Cathedral, , Sponsor, 0\n27, Cathedral, , Chorister, 0\n28, Cathedral, , Parishioner, 0\n29, Circus Tent, , Acrobat, 0\n30, Circus Tent, , Animal Trainer, 0\n31, Circus Tent, , Magician, 0\n32, Circus Tent, , Fire Eater, 0\n33, Circus Tent, , Clown, 0\n34, Circus Tent, , Juggler, 0\n35, Circus Tent, , Visitor, 0\n36, Corporate Party, , Entertainer, 0\n37, Corporate Party, , Manager, 0\n38, Corporate Party, , Unwanted Guest, 0\n39, Corporate Party, , Owner, 0\n40, Corporate Party, , Secretary, 0\n41, Corporate Party, , Delivery Boy, 0\n42, Corporate Party, , Accountant, 0\n43, Crusader Army, , Monk, 0\n44, Crusader Army, , Imprisoned Saracen, 0\n45, Crusader Army, , Servant, 0\n46, Crusader Army, , Bishop, 0\n47, Crusader Army, , Squire, 0\n48, Crusader Army, , Archer, 0\n49, Crusader Army, , Knight, 0\n50, Casino, , Bartender, 0\n51, Casino, , Head Security Guard, 0\n52, Casino, , Bouncer, 0\n53, Casino, , Manager, 0\n54, Casino, , Hustler, 0\n55, Casino, , Dealer, 0\n56, Casino, , Gambler, 0\n57, Day Spa, , Stylist, 0\n58, Day Spa, , Masseuse, 0\n59, Day Spa, , Manicurist, 0\n60, Day Spa, , Makeup Artist, 0\n61, Day Spa, , Dermatologist, 0\n62, Day Spa, , Beautician, 0\n63, Day Spa, , Customer, 0\n64, Embassy, , Security Guard, 0\n65, Embassy, , Secretary, 0\n66, Embassy, , Ambassador, 0\n67, Embassy, , Tourist, 0\n68, Embassy, , Refugee, 0\n69, Embassy, , Diplomat, 0\n70, Embassy, , Government Official, 0\n71, Hospital, , Nurse, 0\n72, Hospital, , Doctor, 0\n73, Hospital, , Anesthesiologist, 0\n74, Hospital, , Intern, 0\n75, Hospital, , Therapist, 0\n76, Hospital, , Surgeon, 0\n77, Hospital, , Patient, 0\n78, Hotel, , Doorman, 0\n79, Hotel, , Security Guard, 0\n80, Hotel, , Manager, 0\n81, Hotel, , Housekeeper, 0\n82, Hotel, , Bartender, 0\n83, Hotel, , Bellman, 0\n84, Hotel, , Customer, 0\n85, Military Base, , Deserter, 0\n86, Military Base, , Colonel, 0\n87, Military Base, , Medic, 0\n88, Military Base, , Sniper, 0\n89, Military Base, , Officer, 0\n90, Military Base, , Tank Engineer, 0\n91, Military Base, , Soldier, 0\n92, Movie Studio, , Stunt Man, 0\n93, Movie Studio, , Sound Engineer, 0\n94, Movie Studio, , Camera Man, 0\n95, Movie Studio, , Director, 0\n96, Movie Studio, , Costume Artist, 0\n97, Movie Studio, , Producer, 0\n98, Movie Studio, , Actor, 0\n99, Ocean Liner, , Cook, 0\n100, Ocean Liner, , Captain, 0\n101, Ocean Liner, , Bartender, 0\n102, Ocean Liner, , Musician, 0\n103, Ocean Liner, , Waiter, 0\n104, Ocean Liner, , Mechanic, 0\n105, Ocean Liner, , Rich Passenger, 0\n106, Passenger Train, , Mechanic, 0\n107, Passenger Train, , Border Patrol, 0\n108, Passenger Train, , Train Attendant, 0\n109, Passenger Train, , Restaurant Chef, 0\n110, Passenger Train, , Train Driver, 0\n111, Passenger Train, , Stoker, 0\n112, Passenger Train, , Passenger, 0\n113, Pirate Ship, , Cook, 0\n114, Pirate Ship, , Slave, 0\n115, Pirate Ship, , Cannoneer, 0\n116, Pirate Ship, , Tied Up Prisoner, 0\n117, Pirate Ship, , Cabin Boy, 0\n118, Pirate Ship, , Brave Captain, 0\n119, Pirate Ship, , Sailor, 0\n120, Polar Station, , Medic, 0\n121, Polar Station, , Expedition Leader, 0\n122, Polar Station, , Biologist, 0\n123, Polar Station, , Radioman, 0\n124, Polar Station, , Hydrologist, 0\n125, Polar Station, , Meteorologist, 0\n126, Polar Station, , Geologist, 0\n127, Police Station, , Detective, 0\n128, Police Station, , Lawyer, 0\n129, Police Station, , Journalist, 0\n130, Police Station, , Criminalist, 0\n131, Police Station, , Archivist, 0\n132, Police Station, , Criminal, 0\n133, Police Station, , Patrol Officer, 0\n134, Restaurant, , Musician, 0\n135, Restaurant, , Bouncer, 0\n136, Restaurant, , Hostess, 0\n137, Restaurant, , Head Chef, 0\n138, Restaurant, , Food Critic, 0\n139, Restaurant, , Waiter, 0\n140, Restaurant, , Customer, 0\n141, School, , Gym Teacher, 0\n142, School, , Principal, 0\n143, School, , Security Guard, 0\n144, School, , Janitor, 0\n145, School, , Cafeteria Lady, 0\n146, School, , Maintenance Man, 0\n147, School, , Student, 0\n148, Service Station, , Manager, 0\n149, Service Station, , Tire Specialist, 0\n150, Service Station, , Biker, 0\n151, Service Station, , Car Owner, 0\n152, Service Station, , Car Wash Operator, 0\n153, Service Station, , Electrician, 0\n154, Service Station, , Auto Mechanic, 0\n155, Space Station, , Engineer, 0\n156, Space Station, , Alien, 0\n157, Space Station, , Pilot, 0\n158, Space Station, , Commander, 0\n159, Space Station, , Scientist, 0\n160, Space Station, , Doctor, 0\n161, Space Station, , Space Tourist, 0\n162, Submarine, , Cook, 0\n163, Submarine, , Commander, 0\n164, Submarine, , Sonar Technician, 0\n165, Submarine, , Electronics Technician, 0\n166, Submarine, , Radioman, 0\n167, Submarine, , Navigator, 0\n168, Submarine, , Sailor, 0\n169, Supermarket, , Cashier, 0\n170, Supermarket, , Butcher, 0\n171, Supermarket, , Janitor, 0\n172, Supermarket, , Security Guard, 0\n173, Supermarket, , Food Sample Demonstrator, 0\n174, Supermarket, , Shelf Stocker, 0\n175, Supermarket, , Customer, 0\n176, Theater, , Coat Check Lady, 0\n177, Theater, , Prompter, 0\n178, Theater, , Cashier, 0\n179, Theater, , Director, 0\n180, Theater, , Actor, 0\n181, Theater, , Crew Man, 0\n182, Theater, , Audience Member, 0\n183, University, , Graduate Student, 0\n184, University, , Professor, 0\n185, University, , Dean, 0\n186, University, , Psychologist, 0\n187, University, , Maintenance Man, 0\n188, University, , Janitor, 0\n189, University, , Student, 0\n190, World War II Squad, , Resistance Fighter, 0\n191, World War II Squad, , Radioman, 0\n192, World War II Squad, , Scout, 0\n193, World War II Squad, , Medic, 0\n194, World War II Squad, , Cook, 0\n195, World War II Squad, , Imprisoned Nazi, 0\n196, World War II Squad, , Soldier, 0',
		voteMap: 'Spy, <Players>, 2',
		themeMap: ''
	},
	{
		id: '2r1b',
		name: 'Two Rooms and a Boom!',
		roleMap: '#Designed and published by Tuesday Knight Games\n\n30, Moderator <Host>, , Moderate the game. Not really necessary unless you\'re playing with buried roles, 0\n1, Blue President, , Blue Team wins if you don\'t die, 1\n2, Red Bomber, , Kill the President in the last round, 1\n3, Blue Doctor, , Must share with President, 0\n4, Red Engineer, , Must share with Bomber, 0\n5, Blue President\'s Daughter, , Backup for President, 0\n6, Red Martyr, , Backup for Bomber, 0\n7, Blue Angel, , Must verbally tell the truth, 0\n8, Red Angel, , Must verbally tell the truth, 0\n9, Blue Demon, , Must verbally lie, 0\n10, Red Demon, , Must verbally lie, 0\n11, Blue Paparazzo, , Do your best to make sure there are no private conversations, 0\n12, Red Paparazzo, , Do your best to make sure there are no private conversations, 0\n13, Blue Mime, , Do your best to not make any noise, 0\n14, Red Mime, , Do your best to not make any noise, 0\n15, Blue Clown, , Do your best to smile at all times, 0\n16, Red Clown, , Do your best to smile at all times, 0\n17, Blue Spy, , You are actually on the Red Team, 0\n18, Red Spy, , You are actually on the Blue Team, 0\n19, Blue Bouncer, , , 0\n20, Red Bouncer, , , 0\n21, Blue Tentacle, , , 0\n22, Red Tentacle, , , 0\n23, Blue Conman, , , 0\n24, Red Conman, , , 0\n25, Blue Security, , , 0\n26, Red Security, , , 0\n27, Grey Hot Potato, , , 0\n28, Green Leprechaun, , , 0\n29, Purple Drunk, , , 0',
		voteMap: '',
		themeMap: ''
	},
	{
		id: 'werewolf',
		name: 'Werewolf',
		roleMap: '1, Werewolf, 1, , 2\n2, Villager, , , 4',
		voteMap: 'Eat, <Players>, 0\nLynch, Live/Die, 2',
		themeMap: ''
	},
	{
		id: 'ultimatewerewolf',
		name: 'Ultimate Werewolf',
		roleMap: "#Designed by Ted Alspach and published by Bézier Games\n#No artifacts\n\n1, Moderator <Host>, 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56, , 1\n\n# may wake up as werewolves\n\n2, Werewolf <-6>, 2-3-4-19-29 5, Wake with the other werewolves each night and choose a villager to eat., 0\n3, Werewolf Cub <-8>, 2-3-4-19-29 5, Wake with the other werewolves. If you die&#44; the werewolves feed twice the following night., 0\n4, Lone Wolf <-5>, 2-3-4-19-29 5, Wake with the other werewolves. You only win if you are the last player left alive., 0\n29, Teenage Werewolf <-4>, 2-3-4-19-29 5, Wake with the other werewolves. You must say 'werewolf' at least once per day., 0\n19, Wolf Man <-9>, 2-3-4-19-29 5, You wake with the other Werewolves each night&#44; but the seer sees you as a villager., 0\n30, Dreamwolf <-5>, , You don't wake at night with the other Werewolves until after a Werewolf is killed., 0\n6, Cursed <-3>, , You are a villager unless you are attacked by werewolves&#44; at which time you are a werewolf., 0\n\n# wake up first night\n\n7, Cupid <-3>, , Choose two players to be lovers. If one of those players dies&#44; the other dies from a broken heart., 0\n31, The Count <+5>, , The first night you are told how many Werewolves are in each half of the village., 0\n32, Doppelgänger <-2>, , Choose a player on the first night. If that player dies you get their power (if any), 0\n33, Hoodlum <0>, , Choose 2 players on the first night. You win if they are dead and you're alive at the end of the game., 0\n34, Nostradamus <+1>, , The first night&#44; predict which team will win. If you are alive at the end of the game and predicted accurately&#44; you win., 0\n\n# have night action\n\n8, Seer <+7>, , Each night choose a player to learn if they are a villager or a werewolf., 0\n35, Aura Seer <+3>, , Choose a player each night to see if that player is not a Werewolf or Villager, 0\n36, Sorcerer <-3>, , Each night&#44; look for the Seer. You win if the werewolves win., 0\n10, Bodyguard <+3>, , Each night&#44; choose a different player to be protected. That player may not be killed at night. May not choose yourself or the same person you picked last night, 0\n11, Spellcaster <+1>, , Each night&#44; choose a player to silence the following day., 0\n37, Vampire <-7>, , Choose a victim each night to kill., 0\n38, Leprechaun <+5>, , Each night&#44; you may redirect the werewolves' attack to a player sitting next to their target., 0\n39, Chupacabra <+4>, , Each night&#44; choose a player. If that player is a werewolf he dies. If the werewolves are dead&#44; you kill any other player., 0\n40, Old Hag <+1>, , Each night&#44; choose a player to leave the village during the next day., 0\n41, Zombie <-3>, , Each night&#44; pick a player and eat their brains. That player may no longer vote., 0\n42, The Mummy <+2>, , Each night&#44; pick a player to be hypnotized. That player will vote the way you do., 0\n13, Thing <+3>, , Each night&#44; tap a player sitting immediately next to you., 0\n43, Cult Leader <+1>, , Each night choose a player to join your cult. If all players are in your cult&#44; you win., 0\n44, Count Dracula <-2>, , Each night&#44; pick a player to be a wife. If you make it through a day/night cycle with 3 wives&#44; you win., 0\n45, Insomniac <+3>, , Each night&#44; learn if at least one of your neighbours has woken up during the night., 0\n\n# may have night action\n\n46, Bogeyman <-6>, , If the werewolves don't agree on a target quickly&#44; you choose a target. You win if all night active players are dead., 0\n9, Apprentice Seer <+4>, , If the Seer dies&#44; you become the Seer and look for werewolves each night., 0\n47, Bloody Mary <+1>, , If you die&#44; each night kill either a Villager if you were lynched or a Werewolf if you were attacked., 0\n\n# may have night action once or limited times\n\n12, Witch <+4>, , Kill or Heal a player at night&#44; once each per game., 0\n48, Priest <+3>, , One night per game&#44; choose a player to be protected. That player may not be killed at night., 0\n49, Troublemaker <+2>, , One night per game&#44; stir up trouble by calling for two lynches the following day., 0\n50, P.I. <+3>, , One night per game&#44; choose a player. You'll be told if that player or a neighbour is a Werewolf., 0\n\n# action upon someone's death\n\n51, Frankenstein's Monster <+2>, , Whenever a special character dies&#44; you get their power., 0\n\n# action upon own death\n\n14, Diseased <+3>, , If you are attacked by werewolves&#44; they don't get to feed the following night., 0\n15, Hunter <+3>, , If you die&#44; you may immediately kill another player., 0\n16, Prince <+3>, , If you are lynched&#44; reveal your identity and survive., 0\n17, Tough Guy <+3>, , If you are attacked by werewolves&#44; you'll survive until the following night, 0\n\n# careful when being inspected\n\n18, Lycan <-1>, , You are a villager&#44; but you appear to the seer as a werewolf, 0\n#Wolf Man\n\n# check every night\n\n52, Ghost <+2>, , You die the first night&#44; and communicate to the village through single-letter clues (no names or initials)., 0\n53, Drunk <-3>, , You are a villager until the third night&#44; when you sober up and your real role is revealed to you., 0\n20, Old Man <0>, , You will die on night x&#44; where x=the number of werewolves in the game plus 1, 0\n54, Sasquatch <-2>, , You are on the villager team unless a day ends without a lynch. Then you switch teams to the werewolves, 0\n55, The Blob <-1>, , Each night&#44; the player to the right of The Blob is absorbed. If all players are part of The Blob&#44; you win., 0\n\n# passive\n\n5, Minion <-6>, 2-3-4-19-29 5, You know who the werewolves are and vice-versa&#44; but you don't wake up with them at night., 0\n21, Idiot <+2>, , You always vote for players to die., 0\n22, Pacifist <-2>, , You always vote for players to live., 0\n23, Beholder <+2>, 8, The first night you are shown who the Seer is., 0\n24, Tanner <+1>, , Your job is so horrible that you want to die. If you die&#44; you win., 0\n25, Mason <+2>, 25, You know who the other Mason(s) are, 0\n26, Mayor <+2>, , Your vote counts twice., 0\n27, Little Girl, , When a villager next to you dies&#44; you may then peek when the werewolves wake up. You die of fright if they catch you., 0\n56, Martyr <+3>, , Once per game&#44; you may take place of any player who was lynched (before their role is revealed)., 0\n28, Villager <+1>, , Find the werewolves and lynch them before they eat you., 0",
		voteMap: 'Lynch, Live/Die, 2\nEat, <Players>, 0',
		themeMap: ''
	},
	{
		id: 'onuw',
		name: 'One Night Ultimate Werewolf',
		roleMap: '#Designed by Ted Alspach and published by Bézier Games\n#+ some Daybreak roles\n\n1, Doppelgänger, , , 0\n2, Werewolf, , , 0\n13, Alpha Wolf, , , 0\n14, Mystic Wolf, , , 0\n3, Minion, , , 0\n4, Mason, , , 0\n5, Seer, , , 0\n15, Apprentice Seer, , , 0\n16, Paranormal Investigator, , , 0\n6, Robber, , , 0\n17, Witch, , , 0\n7, Troublemaker, , , 0\n8, Drunk, , , 0\n9, Insomniac, , , 0\n10, Villager, , , 0\n11, Tanner, , , 0\n12, Hunter, , , 0\n18, Bodyguard, , , 0\n19, Dream Wolf, , , 0',
		voteMap: 'Lynch, <Players>, 2',
		themeMap: ''
	},
	{
		id: 'blurspyfall',
		name: 'Who\'s the Spy?',
		roleMap: '#谁是卧底 - Based on a Chinese game show\n\n1, {Main Subject}, , , 3\n2, {Spy Subject}, , , 1\n3, Question Master <Host>, 1 2, , 1',
		voteMap: 'Spy, <Players>, 2',
		themeMap: ''
	},
];
templeDict = {};
templates.forEach(function(template){
	templeDict[template.id] = template;
});
