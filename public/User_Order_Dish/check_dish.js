console.log(localStorage.getItem('select_resturant'))
var sel = localStorage.getItem('select_resturant')
console.log(sel)

var user = localStorage.getItem('Current_user Uid')
console.log("user Login :", user)

const show_dish = () => {
    firebase.database().ref(`/Resturant`).child(sel).once('value', (snapshot) => {
        var data = snapshot.toJSON()
        if (data == null) {
            document.getElementById('show_dish').innerText = `<h1>No Any Dishes Register</h1>`
        }
        else {
            document.getElementById('show_dish').innerHTML += `
            <div class='text-center'><h1>${data.Name}</h1></div>`

            var dish = data.Dishes
            var value = Object.values(dish)
            // console.log(value)
            Data = ''


            // var order = Object.values(value)
            // console.log(order)
            value.map((v, i) => {


                Data = `
            
            <div  class='col col-lg-4 col-md-6 col-sm-12 col-12' style='margin-top:4%'>
            <div class="card text-center" >
            <img src=${v.item_img} class="card-img-top" alt=${v.item_name} style='width:95%;margin-top:10px;margin-left:10px;margin-right:10px;height:250px'> 
                <div class="card-body">
                    <h4 class="card-title">Dish : ${v.item_name}</h4>
                    <h5 class="card-text">Dish Price : ${v.item_price} </h5>
                    <h5 class="card-title">Cateogry : ${v.select_category}</h5>
                    <h5 class="card-title">Delivery Type : ${v.delivery_type} </h5>
                
                    <b id=${v.key}></b>

                  
                  
                </div>
           
            `

                firebase.database().ref(`/User`).child(`${user}`).once('value', (snap_user) => {
                    var user_data = snap_user.toJSON()

                    if (user_data == null) {
                        console.log("No User")
                        // Data += `

                        // <a href="#" class="btn btn-success" id=${v.key} onclick={order_now(this)}>Order Now</a> </div>
                        // </div></div>`
                    }
                    else {
                        var order = value[i].Order
                        // console.log(order)

                        if (order == undefined) {

                            document.getElementById(`${v.key}`).innerHTML += `

                            <a href="#" class="btn btn-success"  id=${v.key}  onclick={order_now(this)}> Order Now </a> </div>
                            </div></div>`
                        }
                        else {


                            var data = Object.values(order)
                            
                            data.map((v, i) => {    
                                console.log(v.status)                     
                                // console.log(v)
                                // console.log(user_data)
                                // console.log(v.item_name)
                                // console.log(user_data)
                                var data = true

                       
                                if (v.customer_email == user_data.email) {


                                    console.log("Same User")
                                    document.getElementById(`${v.key}`).innerHTML += `
                
                           <div><h6>Status : ${v.status}</h6></div> <a href="#" class="btn btn-danger"  >Already Order</a> </div>
                            </div></div>`
                                    

                                }
                                else {
                                   
                                    console.log(data)

                                    if (i == true) {
                                        console.log("Not Present ", v)
                                        document.getElementById(`${v.key}`).innerHTML += `
                
                        <a href="#" class="btn btn-success" id=${v.key}  onclick={order_now(this)}> Order Now </a> </div>
                        </div></div>`
                                    }
                                    else {
                                        console.log("user:", v)

                                    }
                                    



                                }
                              
                            })
                           
                        }

                    }
                })


                // else if(v.status== 'accept'){
                //     Data +=`

                //     <a href="#" class="btn btn-danger">Already Order</a> </div>`

                // }
                document.getElementById('show_dish').innerHTML += `${Data}`


            })


        }

    })
}

function order_now(e) {
    alert(e.id)
    firebase.database().ref(`/Resturant/${sel}`).child(`Dishes/${e.id}`).once('value', (snapshot) => {
        var data = snapshot.toJSON()
        console.log(data)

        // var user_name = '',
        // var user_email = ''

        firebase.database().ref(`/User`).child(`${user}`).once('value', (snap_user) => {
            var user_data = snap_user.toJSON()
            console.log(user_data)
            var obj = {
                delivery_type: data.delivery_type,
                item_name: data.item_name,
                item_price: data.item_price,
                item_img:data.item_img,
                key: data.key,
                resturant_uid: data.resturant_uid,
                select_category: data.select_category,
                status: "order",
                customer_name: user_data.Name,
                customer_email: user_data.email,
                customer_uid: user_data.uid
            }

            firebase.database().ref(`/Resturant/${sel}`).child(`Dishes/${e.id}/Order/${user}`).set(obj)
            firebase.database().ref(`/User`).child(`${user}/Order/${e.id}`).set(obj)
                .then((data) => {
                    window.location.reload()

                })


        })





    })
}