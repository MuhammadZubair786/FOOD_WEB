console.log(localStorage.getItem('Current_user Uid'))
var a = localStorage.getItem('Current_user Uid')

console.log(a)

const showDishes = () =>{
    firebase.database().ref(`/Resturant/${a}`).child(`Dishes`).once('value', (snapshot) => {

        const data11 = snapshot.toJSON()
        console.log(data11)

        if(data11 == null){
            document.getElementById('show_dish').innerText = `<h1>No Any Dishes Register</h1>`
        }
        else{
            const value = Object.values(data11)
            console.log(value)

            value.map((v,i)=>{
                console.log(v.item_img)
              document.getElementById('show_dish').innerHTML += `   <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                <div class="card" style='margin-top:25px'>
                     <img src=${v.item_img} class="card-img-top" alt=${v.item_name} style='width:95%;margin-top:10px;margin-left:10px;margin-right:10px;height:250px'> 
                    <div class="card-body">
                        <h5 class="card-title">Dishes : ${v.item_name}</h5>
                        <p class="card-text">Dish Price : ${v.item_price} </p>
                        <h5 class="card-title">Cateogry : ${v.select_category}</h5>
                        <h5 class="card-title">Delivery Type : ${v.delivery_type} </h5>
                       
                        
                       
                        
                       
                        <a href="#" class="btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>`

        
            })
        }
    })

}