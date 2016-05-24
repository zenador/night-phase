## Description

This is designed as a complement to some tabletop games (hidden roles / social deduction). It is not meant to be played entirely online, or to completely replace a physical copy of the game, but to be used as a tool with your gaming group to streamline parts of the game or save paper.

Example uses:
- Some games have a night phase just to ensure some players know who some other players are (e.g. Avalon). If this is complicated, it may take some time just for the pre-game setup, and it is prone to mistakes and needing to restart. You can use this to skip the night phase and directly show players the info they need to know
- Speed up the role assignation phase for games with troublesome role cards setup (e.g. Shadow Hunters with expansion)
- Try out a new game or new expansion cards or your own modified rules without PnP or needing to make your own proxy cards
- Assign words to players in 'Who's the Spy?' or 'Fake Artist Goes to New York' without tearing bits of paper or erasing mini-whiteboards
- Play basic Werewolf without a moderator or advanced Werewolf with faster setup

It's best if each player plays on their own device, but you can also do a pass-and-play version with some or all players on the same device.

This tool is meant to be general to cater to as many games as possible, and hence does not implement specific game logic. Like with normal tabletop games, rule enforcement and prevention of illegal moves is left up to the players and the honour system.

You may also connect through Telegram to play by chat, though this may be a bit messy as it requires 2 separate chats, 1 private (with bot) and 1 group, because you cannot exchange secret messages with a bot on Telegram group chat. For now, setup has to be done through the web app first, and host has to control the game flow through the web app, though this may change later.

## Link

- Try it out here: [Night Phase](http://nightphase.herokuapp.com)
- Optional companion Telegram bot: [@NightPhaseBot](http://telegram.me/NightPhaseBot)

## Instructions

1. Edit config/settings-example.json to put in your own tokens, URLs, etc.
2. From your terminal, go to this directory, then run `meteor --settings config/settings-example.json`
