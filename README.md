﻿# borrowMoney

## Intro
What's upppp

This is just a small project i made on an idle day staying at home :D I spent around 12 hours writting this, including 2-3 hours for the UI.

=> *[link on heroku](https://borrowmoney-thp.herokuapp.com/) - a demo web app.
You can visit this demo and create an acoount (email verification is not required.) It is recommended to use a real email andress in order to avoid errors in server. 

(It would take a while to wake the heroku server up. It may have been sleeping :v)

Thank youuu for visiting this repo. I am just a newbie so I would be very happy if you send me some feedbacks about this. My email is phuonghata1995@gmail.com

<3


## Please notice this T.T

1. This is the first version and I am a newbie, so it would definitely have a lot of bugs. 

2. This is the DEMO version, so all the sensitive information has been deleted. 


## OK, let's go:


### Description

+ User can use this web app to manage the money log, when they lend/borrow money.


### Setup 
1. Customize the package.json (if you want) (edit the name, author, ...)

2. **IMPORTANT PART**

  You have to add 3 following files more to finish set up.
  #### 2.a Create database and get the firebaseConfig
  [create a Cloud Firestore Database](https://firebase.google.com/docs/firestore/quickstart)
  i also put comment in the ```<head>``` tag of index.js about the structur of the database.

  #### 2.b Got the JSON.key file to access database on server
  Just do some search on the internet, like "acces firestore node.js", you will find the answer, how to download that ".json" key.

  #### 2.c make an email account to deliver mail to users.
  - the mail Transporter => i put comment in the file server.js about it. Go check it out

3. Down load the nodemodule: 

```
npm install 
```
4. Use local server to run the app: 

```
cd borrowMoney
node server.js
```
if you see this:
``` 
start listening
```
=> type localhost:1337 on the browser to run the app.


###  How to use?

1. Login/ sign up

There are 2 sections: the money you lend and you borrow, displayed as lists. 
Each item on list consists of following fields: email of target friend, message, amount of money and the "reminding" button.

2. Add the infos of the money you lend others. If you tick the "reminding via email" button, your target friend will receive a reminding email every 2 hours. 

- However they can turn off the "reminding" button every time they log in, but can not delete the item.
- Only you can delete the item on list "Friends borrowing your money"

3. Yea, basically that's it !!


## Thank you for your visiting!

My name is Phuong Ta, a newbie coder coming from Vietnam, started coding in July 2019. I'm currently looking for the chance to improve my skills as well as get more experience working on real projects.


