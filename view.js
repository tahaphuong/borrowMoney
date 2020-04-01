const view = {}

view.showComponent = async component => {
  let app = document.getElementById("app");
  let html;

  switch (component) {
    case 'signinCom':
      html = signinCom;
			app.innerHTML = html;

			let linkToSignUp = document.getElementById('link-to-sign-up');
			linkToSignUp.onclick = toSignUp;

			let signInForm = document.getElementById('sign-in-form');
			signInForm.onsubmit = signInFormSubmitHandler;

      function toSignUp() {
        view.showComponent('signupCom')
      }
      function signInFormSubmitHandler(e) {
				e.preventDefault();

				// 1. Get data from user
				let signInInfo = {
					email: signInForm.email.value,
					password: signInForm.password.value
				};

				// 2. Validate data from user
				let validateResults = [
					view.validate(signInInfo.email, validators.email, 'email-error', 'Invalid email, try again!'),
					view.validate(signInInfo.password, validators.password, 'password-error', 'Invalid password, Try again!')
				];

				// 3. Submit sign in
				if (!validateResults.includes(false)) {
					controller.signIn(signInInfo);
				}
			}

      break;
    case 'signupCom': 
      html = signupCom
      app.innerHTML = html;

			let linkToSignIn = document.getElementById('link-to-sign-in');
			linkToSignIn.onclick = toSignIn;

			let signUpForm = document.getElementById('sign-up-form');
			signUpForm.onsubmit = signUpFormSubmitHandler;
			
			function toSignIn() {
				view.showComponent('signinCom');
			}

			function signUpFormSubmitHandler(e) {
				e.preventDefault();
				
				// 1. Store info from the UI
				let signUpInfo = {
					username: signUpForm.username.value,
					email: signUpForm.email.value,
					password: signUpForm.password.value,
					confirmPassword: signUpForm.confirmPassword.value,
					// role: roleStd
				};

				// 2. Validate data from the user
				let validateResults = [
					view.validate(signUpInfo.username, validators.require, 'username-error', 'Username can not be empty!'),
					view.validate(signUpInfo.email, validators.email, 'email-error', 'Invalid email!'),
					view.validate(signUpInfo.password, validators.password, 'password-error', 'Invalid password!'),
					view.validate(
						signUpInfo.confirmPassword,
						value => value && value === signUpInfo.password,
						'confirm-password-error',
						'Invalid confirm password!'
					),
				];

				// 3. Submit sign up
				if (!validateResults.includes(false)) {
					controller.signUp(signUpInfo);
				}
			}

      break;
    case 'mainCom': 
      html = mainCom
			app.innerHTML = html;
			
			let currentUser = firebase.auth().currentUser;

			// display user infos
			view.setText("user-display-name", currentUser.displayName);
			view.setText("user-email", currentUser.email);
			
			// display lists
			model.displayFriendsBorrow(model.friendsBorrow);
			model.displayIBorrow(model.iBorrow);

			// add more to list
			let addFriendsBorrow = document.getElementById('form-add-friends-borrow');
			addFriendsBorrow.onsubmit = addFriendsBorrowHandler;

			function addFriendsBorrowHandler(e) {
				e.preventDefault();

				// 1. Get data as object for current user and user's friend
				let data = {
					email: addFriendsBorrow.email.value,
					title: addFriendsBorrow.title.value,
					amount: addFriendsBorrow.amount.value,
					remind: addFriendsBorrow.remind.checked,
					createdAt: new Date().toISOString()
				}

				let dataFriend = {
					email: model.userInfo.email,
					title: addFriendsBorrow.title.value,
					amount: addFriendsBorrow.amount.value,
					remind: addFriendsBorrow.remind.checked,
					createdAt: new Date().toISOString()
				}

				// 2. Validate data from the user
				let validateResults = [
					view.validate(data.email, validators.email),
					view.validate(data.title, validators.require),
					view.validate(parseInt(data.amount), validators.number),
					view.validate(
						data.remind,
						value => typeof(value) == 'boolean',
					),
				];

				// 3. Submit add infos
				if (!validateResults.includes(false)) {
					controller.handleAddFriendsBorrow(data, dataFriend)
				} else {
					view.setText("error-add-friends-borrow", "Please check your inputs.")
				}
			}

      break; 
    case 'loadingCom':
      html = loadingCom;
      app.innerHTML = html;
      break;
  }
}

view.clearInput = id => {
  document.getElementById(id).value = ''
}

view.validate = function (value, validators, idErrorMessage, errorMessage) {
  if (validators(value)) {
		if (idErrorMessage) {
			view.setText(idErrorMessage, '')
		}
    return true
  } else {
		if (idErrorMessage) {
			view.setText(idErrorMessage, errorMessage)
		}
		return false
  }
};

view.setText = function(id, text) {
  document.getElementById(id).innerHTML = text
}


const validators = {
	require(str) {
		return str;
	},
	email(str) {
		let pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return str.match(pattern);
	},
	password(str) {
		return str.length >= 6;
	}, 
	number(str) {
        return Number.isInteger(Number(str)) && Number(str) > 0
    }
};

view.disable = id => {
document.getElementById(id).setAttribute('disabled', true);
};

view.enable = id => {
document.getElementById(id).removeAttribute('disabled');
};

