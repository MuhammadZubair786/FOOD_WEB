const sigup = ()=>{
    var email = document.getElementById("email").value
    var name = document.getElementById("name").value
    var password = document.getElementById("password").value
    var select = document.getElementById("select").value
    // console.log(email,name,password,select)

    if(email==''||name=='' ||password=="" ||select==""){
        alert("Enter Correct Values")
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(email, password )
          .then((result) => {
            var user = result.user;
            console.log("User :",user)
            console.log("User Uid:",user.uid)
   

            var obj = {
                Name : name,
                email : email,
                password :password,
                type : select,
                uid : user.uid
            }

            firebase.database().ref(`/${select}`).child(user.uid).set(obj)
            .then((data)=>{
              alert("Success User Registration")
            window.location='login.html'

            })
            // window.location='login.html'
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            alert(errorMessage)
            // ..
          });
    }

}


const sigin = ()=>{
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    if(email=='' ||password=="" ){
        alert("Enter Correct Values")
    }
    else{
        firebase.auth().signInWithEmailAndPassword(email, password )
        .then((result) => {
          var user = result.user;
          console.log(user)
          console.log("User Email :",user.email)
          console.log("User Uid :",user.uid)

          localStorage.setItem('Current_user Uid',user.uid)

          firebase.database().ref('/Resturant').orderByChild('uid')
            .equalTo(user.uid)
            .once('value')
            .then((snap)=>{
                var data = snap.toJSON()

                if(data == null){
                  firebase.database().ref('/User').orderByChild('uid')
                  .equalTo(user.uid)
                  .once('value')
                  .then((snap)=>{
                    var data = snap.toJSON()

                    if(data == null){
                      alert("Not Presesnt")
                    }
                    else{
                      alert("Success User Login ")
                      window.location = "Main_User_Page.html"

                    }
                  })

                }
                else{
                  alert("Success Resturant Login")
                  window.location="Main_Resturant_Page.html"
                }
  
            })

          // window.location='home.html'

        //   firebase.database().ref().child('Resturant')
        //   .orderByChild('uid')
        //   .equalTo(user.uid)
        //   .once('value')
        //   .then((snap)=>{
        //       console.log("snap",snap.toJSON())

        //   })



        //   var obj = {
        //       Name : name,
        //       email : email,
        //       password :password,
        //       type : select,
        //       uid : user.uid
        //   }

        //   firebase.database().ref(`/${select}`).child(user.uid).set(obj)
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          alert(errorMessage)

          // ..
        });

    }

} 

const Login_Page = ()=>{
  window.location = 'login.html'
}

const create_account = () =>{
  window.location = 'index.html'
}

// console.log("APP.JS",localStorage.getItem('USer_Email'))