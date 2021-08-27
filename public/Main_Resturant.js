console.log(localStorage.getItem('Current_user Uid'))
var a = localStorage.getItem('Current_user Uid')

console.log(a)

firebase.database().ref().child('Resturant').orderByChild('uid').equalTo(a).once('value')
    .then((snap) => {
        var data = snap.toJSON();
        // console.log("Not json",snap)
        // console.log("JSON",data)



        if (data == null) {

            firebase.database().ref().child('User')
                .orderByChild('uid')
                .equalTo(a)
                .once('value')
                .then((snap) => {
                    var data = snap.toJSON();

                    const value = Object.values(data)

                    console.log("user:", value[0].email)

                 
                    // firebase.database().ref('Resturant').once('value')
                    //     .then((data) => {
                    //         var js = data.toJSON()
                    //         console.log(js)
                    //     })
                    //     .catch((err) => {
                    //         console.log(err)
                    //     })

                    firebase.database().ref('Resturant').once('value', (snapshot) => {

                        const data11 = snapshot.toJSON()
                        const value = Object.values(data11)
            
                        console.log("Resturants:",value)
                    })


                })

        }

        else {

            // const key = Object.keys(data)
            // console.log(key)
            const value = Object.values(data)
            console.log(value)

            console.log("Resturant:", value[0].email)

            document.getElementById('email').innerText = value[0].email
            document.getElementById('name').innerText = value[0].Name

           var user_data = []

             var data = document.getElementById("user_data")
           

            firebase.database().ref('User').once('value', (snapshot) => {

                const data11 = snapshot.toJSON()
                const value = Object.values(data11)
                
                value.forEach(v=>
                 
                   user_data.push(v)   
                )

                console.log("User_data:",user_data)

                user_data.map((v,i)=>{
                //  return(
                // //  document.getElementById('render_data').innerHTML =`<div>Hello ${v.email}</div>`
                //  )
                })              
            })
        }
    })

 const adddish = ()=>{
       window.location = 'Added_Dishes/add_dish.html'
 } 

 const showdishes =  () =>{
     window.location = 'Show_Dishes/showdishes.html'
 }

 const pending = () =>{
     window.location='Orders_Status/pending.html'
 }

 const accept_show =()=>{
     window.location = 'Orders_Status/accept.html'
 }

 const delieverd_show =()=>{
    window.location = 'Orders_Status/delievered.html'
}