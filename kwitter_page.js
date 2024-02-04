const firebaseConfig = {
    apiKey: "AIzaSyCVnDXuwoDwAzBouAprmWAm1kvRy3_IgQk",
    authDomain: "kwitter-c93-project.firebaseapp.com",
    databaseURL: "https://kwitter-c93-project-default-rtdb.firebaseio.com",
    projectId: "kwitter-c93-project",
    storageBucket: "kwitter-c93-project.appspot.com",
    messagingSenderId: "419595676669",
    appId: "1:419595676669:web:a67c6b0618ecf0c8fd4794"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

var user_name=localStorage.getItem("user_name")
var room_name=localStorage.getItem("room_name");

function send() {
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
    });
    document.getElementById("msg").value="";
    }
    function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
             firebase_message_id = childKey;
             message_data = childData;
    //Start code
    console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];
name_tag="<h4>"+name+"<img class='user_tick' src='tick.png' style='height:20px'> </h4>";
message_tag="<h4 class='message_h4' style='color:red'>"+message+"</h4>";
like_btn="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_tag="<span class='glyphicon glyphicon-thumbs-up'> Like: "+like+"</span> </button> <hr>";
row=name_tag+message_tag+like_btn+span_tag;
document.getElementById("output").innerHTML+=row;
    //End code
          } });  }); }
    getData();

    function updateLike(message_id) {
        console.log(message_id);
        button_id=message_id;
        likes=document.getElementById(button_id).value;
        updated_likes=Number(likes)+1;
        console.log(updated_likes);
        firebase.database().ref(room_name).child(message_id).update({
        like:updated_likes
        });
        }
    
    function logout() {
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location="index.html";
    }