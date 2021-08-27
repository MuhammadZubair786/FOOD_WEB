// console.log(localStorage.getItem('Current_user Uid'))
// var a = localStorage.getItem('Current_user Uid')

// console.log(a)

const dishes = () => {
    firebase.database().ref(`/Resturant`).once('value', (snapshot) => {

        const data11 = snapshot.toJSON()
        console.log(data11)

        if (data11 == null) {
            document.getElementById('show_resturant').innerText = `<h1>No Any Dishes Register</h1>`
        }
        else {
            const value = Object.values(data11)

            value.map((v, i) => {
                const data = value[i]['Dishes']
                const dish = Object.values(data)

                document.getElementById('show_resturant').innerHTML += `
                <div class="col col-lg-4">
                <div class="card text-center" >
                <div class="card-body">
                <h5 class="card-title"> ${v.Name}</h5>
                <a href="#" class="btn btn-success" id=${v.uid} onclick=show(this)>Show Dishes</a>
                </div>
                </div>
                </div>
                `



                // dish.map((v, i) => {
                //     // console.log("Dishes Number :",v)
                //     document.getElementById('show_dish').innerHTML += `
                    // <div  style='margin-top:2%;display:block;width:50%;margin-left:auto;margin-right:auto'>
                    // <div class="card text-center" >
                    //     <!-- <img src="..." class="card-img-top" alt="..."> -->
                    //     <div class="card-body">
                    //         <h5 class="card-title">Dishes : ${v.item_name}</h5>
                    //         <p class="card-text">Dish Price : ${v.item_price} </p>
                    //         <h5 class="card-title">Cateogry : ${v.select_category}</h5>
                    //         <h5 class="card-title">Delivery Type : ${v.delivery_type} </h5>
                    //         <a href="#" class="btn btn-success">Order Now</a>
                    //     </div>
                    // </div>
                    // </div>
                // `
                // }





                //    

                //     const key = Object.values(data)
                //    console.log(key[0])
            })
            document.getElementById('show_resturant').innerHTML += '</div>'



        }
    })
}

function show(e){
console.log(e.id)
localStorage.setItem('select_resturant',e.id)
   window.location='User_Order_Dish/check_dish.html'
}