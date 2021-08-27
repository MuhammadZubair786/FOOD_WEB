// console.log("pending")
var resturant_uid = localStorage.getItem('Current_user Uid')

console.log("Resturant Uid :", resturant_uid)



const render_data = () => {
    firebase.database().ref(`/Resturant/${resturant_uid}`).child('Dishes').once('value', (snap) => {
        var data = snap.toJSON()
        // console.log(data)
        if (data == null) {
            console.log("No Any Dishes Aviable")
        }
        else {
            var value = Object.values(data)

            value.map((v, i) => {
                var user_order = value[i].Order

                // console.log(user_order)

                if (user_order == undefined) {
                    // console.log("No order")
                }
                else {
                    var ordervalue = Object.values(user_order)
                    ordervalue.map((v,i)=>{
                        if(v.status == 'Delieverd'){
                                  document.getElementById('render_data').innerHTML += `   <div class="col-lg-4">
                <div class="card" >
                <img src=${v.item_img} class="card-img-top" alt=${v.item_name} style='width:95%;margin-top:10px;margin-left:10px;margin-right:10px;height:250px'> 
                    <div class="card-body">
                        <h5 class="card-title">Dishes : ${v.item_name}</h5>
                        <p class="card-text">Dish Price : ${v.item_price} </p>
                        <h5 class="card-title">Customer Id : ${v.customer_email} </h5>
                        <h5 class="card-title">Customer Id : ${v.customer_name} </h5>
                        <p class="card-title">Cateogry : ${v.select_category}</p>
                        <p class="card-title">Delivery Type : ${v.delivery_type} </p>
                        <p class="card-title">Status : ${v.status} </p>
                       
                        <a href="#" class="btn btn-danger" id=${v.key} onclick=delete_order(this)>Delete Order</a>
                    </div>
                </div>
            </div>`
                      }  })
                
          

                }


            })

            console.log(value)
        }
    })

}

const delete_order = (e)=>{
    console.log("Accept",e.id)
    firebase.database().ref(`/Resturant/${resturant_uid}`).child(`Dishes`).once('value',(snap)=>{
        var data = snap.toJSON()
       
        
        if(data == null){
            console.log("Null")
        }
        else{
            var key = Object.keys(data)
            // console.log(key)
            var val =Object.values(data)
            console.log(val)
            val.map((v,i)=>{
                var order = val[i].Order 
                // console.log(order)
                if(order==null){
                    // console.log("Null")
                }
                else{
                    var data2 = Object.values(order)
                    // console.log(data)
                    data2.map((v,i)=>{
                        // console.log(v)
                        if(v.key == e.id){
                            console.log("Same",e.id)

                            // var obj = {
                            //     delivery_type: v.delivery_type,
                            //     item_name: v.item_name,
                            //     item_price: v.item_price,
                            //     key: v.key,
                            //     item_img:v.item_img,
                            //     resturant_uid: v.resturant_uid,
                            //     select_category: v.select_category,
                            //     status: "Delievered",
                            //     customer_name: v.customer_name,
                            //     customer_email: v.customer_email,
                            //     customer_uid: v.customer_uid

                            // }

                            firebase.database().ref(`/Resturant/${v.resturant_uid}`).child(`Dishes/${v.key}/Order/${v.customer_uid}`).remove()
                            firebase.database().ref(`/User`).child(`${v.customer_uid}/Order/${v.key}`).remove()
                            .then((data)=>{
                                window.location.reload()
                            })
                        }
                    })
                }


            })
        }
    })
}