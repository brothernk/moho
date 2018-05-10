[Imgur](https://i.imgur.com/AHZ9cwu.png)

True That! is an app designed to bring the fun of playing games at parties to modern technology. Following in the footsteps of popular games such as Heads Up!, our drive was to create a real-time game that requires very little set up, and no personal information to play! 

## How It Works
True That! utilizes technologies such as Socket.io, React, MongoDB, and Node.js/Express.js to bring you a real-time gaming experience. Players join a game room with a room key. This ensures that players have a mutual space to play without intereference from outside players. Socket.io allows data flows real-time to show you who is in the room with you, as they join!

[Imgur](https://imgur.com/gallery/SEjhXuJ)

A judge is selected out of the player pool, and once everyone is in the room, the judge is able to start the game. The round officially starts when the judge picks a pre-determined theme from a list of themes, and a prompt is then randomly generated from our prompt database! The players each have 60 seconds to query the Giphy API for a gif that they think the judge will love, and submit it for further examination. At the end of the search session, the gifs are anonymously revealed for all to see! The judge picks their favorite gif for the prompt, and a winner is chosen! A new round is then started with a new judge.