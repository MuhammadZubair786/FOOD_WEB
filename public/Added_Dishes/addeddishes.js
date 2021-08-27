console.log(localStorage.getItem('Current_user Uid'))
var a = localStorage.getItem('Current_user Uid')

console.log(a)

var img_url = ''


const add_file_img = ()=>{
    var inp = document.createElement('input')
    inp.type = 'file'
    inp.accept = 'image/*'
   
  
    inp.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();
        console.log(reader.result)
        reader.onload = function(){           
        }
        reader.readAsDataURL(files[0])
        console.log(files[0])
        document.getElementById('upload').removeAttribute('disabled')
    }
    
    inp.click()
  
}

const upload_img = ()=>{

    console.log(files[0])

   
    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef.child(`images/${files[0].name}`).put(files[0]);

    uploadTask.on('state_changed', 
      (snapshot) => {
      
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        if(progress==0){
          alert("Upload Process Star\n Plz Wait For Upload Image In Data Base")
        }

        if(progress==100){
          alert("Upload Process Finish \n Successfully Upload Image In Data Base")
        }
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            img_url =   downloadURL;
          console.log('File available at', downloadURL);
         document.getElementById('add_dish').removeAttribute('disabled')
        });
      }
    );
   

}

function addeddishes(){
    console.log(img_url)
    var item_name = document.getElementById('item_name').value
    var item_price  = document.getElementById('item_price').value
    var select_cat = document.getElementById('select_cat').value
    var delivery_type = document.getElementById('Delivery_type').value
    if(item_name == '' || item_price == '' || select_cat == '' || delivery_type == ''){
        alert("Enter All Values")
    }
    else{
    console.log(item_name,item_price,select_cat,delivery_type)
        console.log('Current_user Uid')

       key =  firebase.database().ref(`/Resturant/${a}`).child('Dishes').push().getKey()

        var obj = {
            item_name:item_name,
            item_price:item_price,
            select_category:select_cat,
            item_img:img_url,
            delivery_type:delivery_type,
            key : key,
            status:"",
            resturant_uid : a,

        }
        firebase.database().ref(`/Resturant/${a}`).child(`Dishes/${key}`).set(obj)
        .then((data)=>{
            console.log("added")
            document.getElementById('item_name').value =''
            document.getElementById('item_price').value=''
             document.getElementById('select_cat').value=''
            document.getElementById('Delivery_type').value=''
            img_url=''
            document.getElementById('upload').setAttribute('disabled',true)
            document.getElementById('add_dish').setAttribute('disabled',true)
           

        })
    }


}


