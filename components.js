const signinCom = `
<div id="bg-color">
    <img class="img-money" src="./money.png" height="350" width="350"/>
      <div class="auth-head">
        <div class="title-signin">Login to Borrowmoney</div>
        <div class="auth-leading">Someone owes you money? This web app will remind that person via email EVERY 2 HOURS</div>
      </div>
      
      <form id="sign-in-form" class="auth-form">
        <div class="input-wrapper">
            <input placeholder="email" name="email" type="email" maxlength="50"></br> 
            <div id="email-error" class="error-message"></div>
        </div>
        <div class="input-wrapper">
            <input placeholder="password" name="password" type="password"></br>
            <div id="password-error" class="error-message"></div>
        </div>
        <div class="button-wrapper">
            <button id="sign-in-btn" type="submit">Log in ></button>
            <span id="sign-in-error" class="error-message"></span>
            </br>
            <button type="button" id="link-to-sign-up">> Not have an account??</button>
        </div>
    </form>
    </div>
`

const signupCom = `
<div id="bg-color">
    <img class="img-money" src="./money.png" height="350" width="350"/>
      <div class="auth-head">
        <div class="title-signin">Sign up to Borrowmoney</div>
        <div class="auth-leading">Track the money you lend/borrow.</div>
      </div>
      
      <form id="sign-up-form" class="auth-form">
        <div class="input-wrapper">
            <input placeholder="username" name="username" type="text" maxlength="50"></br> 
            <div id="username-error" class="error-message"></div>
        </div>
        <div class="input-wrapper">
            <input placeholder="email" name="email" type="email" maxlength="50"></br> 
            <div id="email-error" class="error-message"></div>
        </div>
        <div class="input-wrapper">
            <input placeholder="password" name="password" type="password"></br>
            <div id="password-error" class="error-message"></div>
        </div>
        <div class="input-wrapper">
            <input placeholder="password" name="confirmPassword" type="password"></br>
            <div id="confirm-password-error" class="error-message"></div>
        </div>
        <div class="button-wrapper">
            <button id="sign-up-btn" type="submit">Sign up ></button>
            <span id="sign-up-error" class="error-message"></span>
            </br>
            <button type="button" id="link-to-sign-in">> Already have an account?</button>
        </div>
    </form>
    </div>
`

const loadingCom = `
<div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center">
    <img src="https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png" height="150" width="150"/>
    <div class="auth-leading">loading...</div>
</div>
`

const mainCom = `
<div class="main-screen">

    <div class="main-screen-section">

      <div class="main-user">
        <div><button id="sign-out-button" type="button" onclick="firebase.auth().signOut();">Sign out</button></div>
        <div id="user-display-name"></div>
        <div id="user-email"></div>
      </div>
      <div class="main-header">
        <div class="main-title">Friends borrowing your money</div>
        <div class="main-leading">And they still not pay back to you. Adding them to this list means, <br>they will recieve a remind email every 2 hours. You and your friend can turn off the remind system anytime.</br><span style="font-size: 20px">Add more to list:</span></div>
      </div>

      <form id="form-add-friends-borrow" class="form-add-borrowed-money">
        <div><input style="width: 200px" id="email-input" name="email" type="email" placeholder="email (registered email)"/></div>
        <div><input style="width: 200px" id="title-input" name="title" placeholder="message. (ex: lunch 22.02)"/></div>
        <div><input name="amount" type="number" id="amount-input" placeholder="amount (VND)"/></div>
        <div>Remind via email <input name="remind" type="checkbox"/></div>
        <div><button id="handleFriendsBorrow">+</button></div>
      </form>
      <div style="height: 12px"><div id="error-add-friends-borrow" class="error-message"></div></div>

      <div id="main-screen-list"></div>

    </div>
    

    

    <div class="main-screen-section">

      <div class="main-header">
        <div class="main-title">You borrow these friends money</div>
        <div class="main-leading">You can only uncheck the item, but you can not delete them. <br>You will recieve a remind email every 2 hours. You and your friend can turn off the remind system anytime.</div>
      </div>
      <div id="main-screen-i-borrow"></div>
    
    </div>

  </div>
`
