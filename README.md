![Imgur](https://i.imgur.com/1jGo96l.png)

True That! is an app designed to unite the fun of playing games with friends with fresh modern technology. Following in the footsteps of popular games such as Heads Up!, our drive was to create a real-time game that requires very little set up, and no personal information to play! 

## How It Works

True That! utilizes Socket.io, React, MongoDB, and Node.js/Express.js to bring you a real-time gaming experience. Players join a unique game room with a room key. This ensures that players have a mutual space to play without intereference from outside players. Socket.io allows data flows real-time to show you who is in the room with you, as they join!

![Imgur](https://i.imgur.com/EYl1IVk.jpg)

A judge is selected out of the player pool, and once everyone is in the room, the judge is able to officially start the game. The timer starts when the judge picks a theme for the round, and a prompt is then randomly generated from our prompt database! The players each have 60 seconds to query the Giphy API for a gif that they think the judge will love, and submit it for further examination. At the end of the search session, the gifs are anonymously revealed for all to see! The judge picks their favorite gif for the prompt, and a winner is chosen! Points are divvied accordingly, and new round is started with a new judge.

## Our site is live at https://truethat.app/

![Imgur](https://i.imgur.com/SQIWjhw.png)
