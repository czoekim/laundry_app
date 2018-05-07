/** Javascript for main.html and index.html
 * Zoe Kim (ckim) || Charles Mason (cmmason) || Roderick Zak (rzak) || Sam Sadeh (ssadeh)
 * On our honor, we have not given, nor received, nor witnessed any unauthorized assistance on this work.
 * 
 * We worked on this code as a group and referred to:
 * https://firebase.google.com/docs/database/web/read-and-write
 * https://firebase.google.com/docs/auth/web/manage-users
 * https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#signOut
 * https://github.com/firebase/quickstart-js/blob/master/auth/email-password.html
 * https://stackoverflow.com/questions/19435302/pass-div-to-javascript-function-and-change-its-style?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
 * https://stackoverflow.com/questions/17292176/pass-element-id-to-javascript-function
 * https://stackoverflow.com/questions/14349012/pass-function-argument-into-getelementbyid-id
 * https://www.w3schools.com/jsref/event_onload.asp
*/ 

/** 
 * config is provided by the Firebase console after creating a project
 * It adds Firebase functionality to our web application and is required before any other javascript functions
 */ 
var config = {
    apiKey: "AIzaSyAoQXWgk2RJGrwgIMdJkVpY-N0pb01N2EI",
    authDomain: "laundry-app-test.firebaseapp.com",
    databaseURL: "https://laundry-app-test.firebaseio.com",
    projectId: "laundry-app-test",
    storageBucket: "laundry-app-test.appspot.com",
    messagingSenderId: "356319952276"
};
var firebase = require("firebase");
firebase.initializeApp(config);


/**
 * toggleSignIn handles the sign in button press
 * User must enter a valid, already-registered email and password to access the main page
 */ 
window.toggleSignIn = function() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      initApp();
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);

    });
  }

}
/**
 * handleSignUp handles the sign up button press
 * User must enter a valid email and strong enough password
 * This function calls the sendEmailVerification() function once a new user is created
 */
window.handleSignUp = function() {
  var email = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      sendEmailVerification();
    }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
}
/**
 * sendEmailVerification() is called by the handleSignUp function once a user is created
 * This function sends a verification link to the email provided by the user
 */
 function sendEmailVerification()  {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    alert('Email Verification Sent!');
  });

}
/**
 * toggleSignout handles the sign out button press
 * This function redirects the user back to the login page and changes the user state to signed out. 
 * 
 */ 
window.toggleSignOut = function() {
  firebase.auth().signOut().then(function() {
    window.alert("You have signed out");
    window.location = "index.html";
  }).catch(function(error) {
    alert(error.message)
  });
}

/**
 * initApp directs the user to the main page
 * This function is called once the user successfully signs in.
 */
function initApp() {
  
  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      // User is signed in.
      window.location = "main.html";
    }
  });
}

/**
 * Refresh calls all readFromDatabase functions
 */
window.refresh = function(){
  readFromDatabase1();
  readFromDatabase2();
  readFromDatabase3();
  readFromDatabase4();
  readFromDatabase5();
  readFromDatabase6();
}

/**
 * readFromDatabase1 gets all the information from dryer1
 * it will then change the color of the box that the dryer is in
 * the colors correspond to the if its in-use, available, and broken
 */
function readFromDatabase1() {
  var query = firebase.database().ref("dryer1");
  query.once("value").
  then(function(snapshot) {
    snapshot.forEach(function(childSnap){
      var key = childSnap.key;
      var childData = childSnap.val();
      console.log(key, childData);
      if(key == "available") {
        if(childData == "true") {
          document.getElementById("dryer1").style.borderColor = "#5cb85c";
        }
      }
      if(key == "inuse") {
        if(childData == "true") {
          document.getElementById("dryer1").style.borderColor = "#d9534f";
        }
      }
      if(key == "broken") {
        if(childData == "true") {
          document.getElementById("dryer1").style.borderColor = "#292b2c";
        }
      }
    });
  });
}

/**
 * readFromDatabase2 gets all the information from washer1
 * it will then change the color of the box that the washer is in
 * the colors correspond to the if its in-use, available, and broken
 */
function readFromDatabase2() {
  var query = firebase.database().ref("washer1");
  query.once("value").
  then(function(snapshot) {
    snapshot.forEach(function(childSnap){
      var key = childSnap.key;
      var childData = childSnap.val();
      console.log(key, childData);
      if(key == "available") {
        if(childData == "true") {
          document.getElementById("washer1").style.borderColor = "#5cb85c";
        }
      }
      if(key == "inuse") {
        if(childData == "true") {
          document.getElementById("washer1").style.borderColor = "#d9534f";
        }
      }
      if(key == "broken") {
        if(childData == "true") {
          document.getElementById("washer1").style.borderColor = "#292b2c";
        }
      }
    });
  });
}

/**
 * readFromDatabase3 gets all the information from dryer2
 * it will then change the color of the box that the dryer is in
 * the colors correspond to the if its in-use, available, and broken
 */
function readFromDatabase3() {
  var query = firebase.database().ref("dryer2");
  query.once("value").
  then(function(snapshot) {
    snapshot.forEach(function(childSnap){
      var key = childSnap.key;
      var childData = childSnap.val();
      console.log(key, childData);
      if(key == "available") {
        if(childData == "true") {
          document.getElementById("dryer2").style.borderColor = "#5cb85c";
        }
      }
      if(key == "inuse") {
        if(childData == "true") {
          document.getElementById("dryer2").style.borderColor = "#d9534f";
        }
      }
      if(key == "broken") {
        if(childData == "true") {
          document.getElementById("dryer2").style.borderColor = "#292b2c";
        }
      }
    });
  });
}

/**
 * readFromDatabase4 gets all the information from washer2
 * it will then change the color of the box that the washer is in
 * the colors correspond to the if its in-use, available, and broken
 */
function readFromDatabase4() {
  var query = firebase.database().ref("washer2");
  query.once("value").
  then(function(snapshot) {
    snapshot.forEach(function(childSnap){
      var key = childSnap.key;
      var childData = childSnap.val();
      console.log(key, childData);
      if(key == "available") {
        if(childData == "true") {
          document.getElementById("washer2").style.borderColor = "#5cb85c";
        }
      }
      if(key == "inuse") {
        if(childData == "true") {
          document.getElementById("washer2").style.borderColor = "#d9534f";
        }
      }
      if(key == "broken") {
        if(childData == "true") {
          document.getElementById("washer2").style.borderColor = "#292b2c";
        }
      }
    });
  });
}

/**
 * readFromDatabase5 gets all the information from dryer3
 * it will then change the color of the box that the dryer is in
 * the colors correspond to the if its in-use, available, and broken
 */
function readFromDatabase5() {
  var query = firebase.database().ref("dryer3");
  query.once("value").
  then(function(snapshot) {
    snapshot.forEach(function(childSnap){
      var key = childSnap.key;
      var childData = childSnap.val();
      console.log(key, childData);
      if(key == "available") {
        if(childData == "true") {
          document.getElementById("dryer3").style.borderColor = "#5cb85c";
        }
      }
      if(key == "inuse") {
        if(childData == "true") {
          document.getElementById("dryer3").style.borderColor = "#d9534f";
        }
      }
      if(key == "broken") {
        if(childData == "true") {
          document.getElementById("dryer3").style.borderColor = "#292b2c";
        }
      }
    });
  });
}

/**
 * readFromDatabase6 gets all the information from washer3
 * it will then change the color of the box that the washer is in
 * the colors correspond to the if its in-use, available, and broken
 */
function readFromDatabase6() {
  var query = firebase.database().ref("washer3");
  query.once("value").
  then(function(snapshot) {
    snapshot.forEach(function(childSnap){
      var key = childSnap.key;
      var childData = childSnap.val();
      console.log(key, childData);
      if(key == "available") {
        if(childData == "true") {
          document.getElementById("washer3").style.borderColor = "#5cb85c";
        }
      }
      if(key == "inuse") {
        if(childData == "true") {
          document.getElementById("washer3").style.borderColor = "#d9534f";
        }
      }
      if(key == "broken") {
        if(childData == "true") {
          document.getElementById("washer3").style.borderColor = "#292b2c";
        }
      }
    });
  });
}

/**
 * readUserData reads what the user clicked on from the drop down menu for one of the washers or dryers
 * the user data is sent to the database so that every washer and dryer is up to date
 */
window.readUserData = function(event, machinedata) {
  var machineRef;
  var machine = machinedata;
  window.refresh();
  if(event=="dryer_inuse1") {
    machineRef = firebase.database().ref("dryer1");
    machine.style.borderColor = "#d9534f";
    machineRef.set({
      inuse:"true",
      available: "false",
      broken: "false"
    });
    
  }
  if(event=="washer_inuse1") {
    machineRef = firebase.database().ref("washer1");
    machine.style.borderColor = "#d9534f";
    // readFromDatabase();
    machineRef.set({
      inuse:"true",
      available: "false",
      broken: "false"
    });
  }
  if(event=="dryer_inuse2") {
    machineRef = firebase.database().ref("dryer2");
    machine.style.borderColor = "#d9534f";
    machineRef.set({
      inuse:"true",
      available: "false",
      broken: "false"
    });
  }
  
  if(event=="washer_inuse2") {
    machineRef = firebase.database().ref("washer2");
    machine.style.borderColor = "#d9534f";
    machineRef.set({
      inuse:"true",
      available: "false",
      broken: "false"
    });
  }
  
  if(event=="dryer_inuse3") {
    machineRef = firebase.database().ref("dryer3");
    machine.style.borderColor = "#d9534f";
    machineRef.set({
      inuse:"true",
      available: "false",
      broken: "false"
    });
  }
  
  if(event=="washer_inuse3") {
    machineRef = firebase.database().ref("washer3");
    machine.style.borderColor = "#d9534f";
    machineRef.set({
      inuse:"true",
      available: "false",
      broken: "false"
    });

  }
    
  if(event=="dryer_available1") {
    machineRef = firebase.database().ref("dryer1");
    machine.style.borderColor = "#5cb85c";
    machineRef.set({
      inuse:"false",
      available: "true",
      broken: "false"
    });
  }
  
  if(event=="washer_available1") {
    machineRef = firebase.database().ref("washer1");
    machine.style.borderColor = "#5cb85c";
    machineRef.set({
      inuse:"false",
      available: "true",
      broken: "false"
    });
  }
  
    if(event=="dryer_available2") {
    machineRef = firebase.database().ref("dryer2");
    machine.style.borderColor = "#5cb85c";
    machineRef.set({
      inuse:"false",
      available: "true",
      broken: "false"
    });

  }
  
  if(event=="washer_available2") {
    machineRef = firebase.database().ref("washer2");
    machine.style.borderColor = "#5cb85c";
    machineRef.set({
      inuse:"false",
      available: "true",
      broken: "false"
    });
  }
  
  if(event=="dryer_available3") {
    machineRef = firebase.database().ref("dryer3");
    machine.style.borderColor = "#5cb85c";
    machineRef.set({
      inuse:"false",
      available: "true",
      broken: "false"
    });
  }
  
  if(event=="washer_available3") {
    machineRef = firebase.database().ref("washer3");
    machine.style.borderColor = "#5cb85c";
    machineRef.set({
      inuse:"false",
      available: "true",
      broken: "false"
    });
  }
  
  if(event=="dryer_broken1") {
    machineRef = firebase.database().ref("dryer1");
    machine.style.borderColor = "#292b2c";
    machineRef.set({
      inuse:"false",
      available: "false",
      broken: "true"
    });
  }
  
  if(event=="washer_broken1") {
    machineRef = firebase.database().ref("washer1");
    machine.style.borderColor = "#292b2c";
    machineRef.set({
      inuse:"false",
      available: "false",
      broken: "true"
    });
  }
  
  if(event=="dryer_broken2") {
    machineRef = firebase.database().ref("dryer2");
    machine.style.borderColor = "#292b2c";
    machineRef.set({
      inuse:"false",
      available: "false",
      broken: "true"
    });
  }
  
  if(event=="washer_broken2") {
    machineRef = firebase.database().ref("washer2");
    machine.style.borderColor = "#292b2c";
    machineRef.set({
      inuse:"false",
      available: "false",
      broken: "true"
    });

  }
  
  if(event=="dryer_broken3") {
    machineRef = firebase.database().ref("dryer3");
    machine.style.borderColor = "#292b2c";
    machineRef.set({
      inuse:"false",
      available: "false",
      broken: "true"
    });
  }
  
  if(event=="washer_broken3") {
    machineRef = firebase.database().ref("washer3");
    machine.style.borderColor = "#292b2c";
    machineRef.set({
      inuse:"false",
      available: "false",
      broken: "true"
    });
  }

}






