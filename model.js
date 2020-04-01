let model = {
  userInfo: {},
  friendsBorrow: [],
  iBorrow: []
}

model.saveUserInfo = (email, name) => {
  model.userInfo = {
    email: email,
    name: name
  }
}

model.saveFriendsBorrow = list => {
  model.friendsBorrow = list;
}

model.saveIBorrow = list => {
  model.iBorrow = list;
}

// display list

model.displayFriendsBorrow = (items) => {
  let list = document.getElementById('main-screen-list');
  list.innerHTML = ``;

  if (items.length) {
    for (let value of items) {
      let check = value.remind ? 'checked' : ''
      list.innerHTML += 
      `<div class="list-item">
        <div>${value.email}</div>
        <div>${value.title}</div>
        <div>${value.amount} VND</div>
        <div>Remind via email <input ${check} type="checkbox" id="checkbox-${value.createdAt}" onchange='controller.checkRemind("${value.createdAt}", "friendsBorrow")'/></div>
        <div><button class="error-message" type="button" onclick='controller.deleteBorrow("${value.createdAt}")'>del</button></div>
      </div>`
    }  
  }
  
}

model.displayIBorrow = (items) => {
  let list = document.getElementById('main-screen-i-borrow');
  list.innerHTML = ``;

  if (items.length) {
    for (let value of items) {
      let check = value.remind ? 'checked' : ''
      list.innerHTML += 
      `<div class="list-item">
        <div>${value.email}</div>
        <div>${value.title}</div>
        <div>${value.amount} VND</div>
        <div>Remind via email <input ${check} type="checkbox" id="checkbox-${value.createdAt}" onchange='controller.checkRemind("${value.createdAt}", "iBorrow")'/></div>
        <div></div>
      </div>`
    }  
  }
  
}