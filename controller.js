const controller = {};

controller.init = () => {
	view.showComponent('loadingCom')
  firebase.auth().onAuthStateChanged(onAuthStateChangedHandler);
  
	async function onAuthStateChangedHandler(user) {

    try {
      // if (user && user.emailVerified) {
      if (user) {
        await controller.getData()
        view.showComponent('mainCom')

      // } else if (user && !user.emailVerified) {
      //   view.showComponent('signinCom');

      //   user.sendEmailVerification()
      //   .then(view.setText('sign-in-error', 'Check your email to activate your account'))
      } else {
        view.showComponent('signinCom');
      }
    } catch (err) {
      view.showComponent('signinCom');
      view.setText('sign-in-error', err.message)
    }
		
	}
};

controller.signUp = async signUpInfo => {
	let email = signUpInfo.email;
	let password = signUpInfo.password;
  let displayName = signUpInfo.username;
  
  let userId;

	// Lock the button while data is being handled
  view.disable('sign-up-btn')
  
	// Clear the message in sign up form
	view.setText('sign-up-error', '');

	try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
		await firebase.auth().currentUser.updateProfile({
			displayName
    });	
	} catch (error) {
		view.setText('sign-up-error', error.message);
    console.log(error.message)
    // Unlock the button
    view.enable('sign-up-btn')
	}
};

controller.signIn = async signInInfo => {
	let email = signInInfo.email;
	let password = signInInfo.password;

  // Lock the button login while data is being handled
  view.disable('sign-in-btn')
	view.setText('sign-in-error', '');

	// Communicate with firebase to check username and password
	try {
		let result = await firebase.auth().signInWithEmailAndPassword(email, password);
		if (!result.user) {
			throw new Error('Please sign up!');
    } 
	} catch (error) {
    console.log(error)
    view.setText('sign-in-error', error.message);
    
    // Unlock the button if login is failed
    view.enable('sign-in-btn')
	}
};

controller.getData = async () => {
  let user = firebase.auth().currentUser;

  let data = {
    email: user.email,
    username: user.displayName,
    iBorrow: new Array(),
    friendsBorrow: new Array()
  }


  await firebase.firestore().collection('users').doc(user.email)
  .get().then(async doc=>{
    if(!doc.exists) {
      await db.collection('users').doc(user.email).set(data)
    } else {
      data = doc.data()
    }
  })

  // save to model => local storage
  await model.saveUserInfo(data.email, data.username)
  await model.saveFriendsBorrow(data.friendsBorrow);
  await model.saveIBorrow(data.iBorrow)
}

controller.handleAddFriendsBorrow = async (data, dataFriend) => {
  view.disable('handleFriendsBorrow')
  try {
    let signInMethods = await firebase.auth().fetchSignInMethodsForEmail(data.email)

    if (!signInMethods.length) {
        throw new Error('Invalid email. Tell your friend to create an account for this web app!')
    } 
    if (data.email == firebase.auth().currentUser.email) {
        throw new Error('You can not enter your own mail. Please enter another email')
    }

    let list = model.friendsBorrow
    if (list.length) {
      list.splice(0, 0, data)
    } else {
      list = [data]
    }

    // save to model
    model.saveFriendsBorrow(list)

    // display to UI
    model.displayFriendsBorrow(list)
    
    // delete input
    view.setText('error-add-friends-borrow', '')
    view.clearInput('email-input');
    view.clearInput('title-input');
    view.clearInput('amount-input');

    // save to firestore of current user.
    await db
    .collection('users')
    .doc(model.userInfo.email)
    .update({friendsBorrow: list})

    // save to firestore of user's friend.
    await db
    .collection('users')
    .doc(data.email)
    .update({iBorrow: firebase.firestore.FieldValue.arrayUnion(dataFriend)})

   


  } catch(err) {view.setText('error-add-friends-borrow', err.message)}
  view.enable('handleFriendsBorrow')
}

controller.deleteBorrow = async (originId) => {

  // convert to type string
  let id = typeof(originId) != 'string' ? String(originId) : originId;

  let item;

  let newList = model.friendsBorrow.filter((value, index)=>{
    if (value.createdAt == id) {item=value}
    return value.createdAt != id
  })

  // save to model
  model.saveFriendsBorrow(newList)
  model.displayFriendsBorrow(newList)

  // save to firestore of current user.
  await db
  .collection('users')
  .doc(model.userInfo.email)
  .update({friendsBorrow: newList})

  // save to firestore of user's friend.

  // 1. get friend document
  let friendDoc = db.collection("users").doc(item.email);

  await db.runTransaction( t => {
    return t.get(friendDoc)
    .then(doc => {

      // 2. filter list
      let friendIBorrow = doc.data().iBorrow.filter((value, index)=>{
        if (value.createdAt == id) {item=value}
        return value.createdAt != id
      })

      // 3. update list
      t.update(friendDoc, {iBorrow: friendIBorrow})
    })
    .catch(err=>console.log(err.message))

  })
}

controller.checkRemind = async (originId, theList) => {

  // check Id if it is string
  let id = typeof(originId) != 'string' ? String(originId) : originId;

  view.disable("checkbox-" + id)

  if (theList == 'friendsBorrow') {

    let friendEmail;
    let newList = model.friendsBorrow.map((value, index)=>{

      if(value.createdAt == id) {
        
        friendEmail = value.email;

        let prev = value.remind;
        value.remind = !prev;
      }
      return value;
    })

    // save to model and display
    model.saveFriendsBorrow(newList)
    model.displayFriendsBorrow(newList)


    // save to firestore of current user.
    await db
    .collection('users')
    .doc(model.userInfo.email)
    .update({friendsBorrow: newList})

    // update list firestore of user's friend.
    let friendDoc = db.collection('users').doc(friendEmail)

    await db.runTransaction(t=>{
      return t.get(friendDoc)
      .then(doc=>{

        // change data in friend's list => return an array
        let friendIBorrow = doc.data().iBorrow.map((value, index)=>{

          if(value.createdAt == id) {    
            let prev = value.remind;
            value.remind = !prev;
          }
          return value;
        })

        t.update(friendDoc, {iBorrow: friendIBorrow})

      })
    })
    .catch(err=>console.log(err.message))
  }




  if (theList == 'iBorrow') {

    let friendEmail;
    let newList = model.iBorrow.map((value, index)=>{
      if(value.createdAt == id) {
        friendEmail = value.email;
        let prev = value.remind;
        value.remind = !prev;
      }
      return value;
    })

      // save to model
    model.saveIBorrow(newList)
    model.displayIBorrow(newList)

    // save to firestore of current user.
    await firebase
    .firestore()
    .collection('users')
    .doc(model.userInfo.email)
    .update({iBorrow: newList})

    // update list firestore of user's friend.

    let friendDoc = db.collection('users').doc(friendEmail)

    await db.runTransaction(t=>{
      return t.get(friendDoc)
      .then(doc=>{

        // change data in friend's list => return an array
        let friendFriendsBorrow = doc.data().friendsBorrow.map((value, index)=>{

          if(value.createdAt == id) {    
            let prev = value.remind;
            value.remind = !prev;
          }
          return value;
        })

        t.update(friendDoc, {friendsBorrow: friendFriendsBorrow})

      })
    })
    .catch(err=>console.log(err.message))
  }

  view.enable("checkbox-" + id)

}