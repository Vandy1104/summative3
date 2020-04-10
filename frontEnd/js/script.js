console.log("summative 3 connected");










// *********  code from Vandy start


//  code from Vandy end



// ******************************  code from Pearly start

//<!-- TO BE DELETED AFTER MERGED FROM HERE -->
// <!-- simulate login to get sessionStorage -->
// $('#log-in-form').submit(function(){
//   event.preventDefault();
//
//   let username = $('#username').val();
//   let password = $('#password').val();
//
//   console.log(username, password);
//
//   if (username == '' || password == ''){
//     alert('Please enter all details');
//   } else {
//
//   $.ajax({
//     url :`${url}/loginUser`,
//     type :'POST',
//     data:{
//       username : username,
//       password : password
//       },
//
//     success : function(user){
//       console.log(user);
//       if (user == 'user not found. Please register'){
//       alert('user not found. Please enter correct data or register a new user');
//
//       } else if (user == 'not authorized'){
//         alert('Please try with correct details');
//         $('#username').val('');
//         $('#password').val('');
//       } else{
//
//         sessionStorage.setItem('uID', user._id);
//         sessionStorage.setItem('username',user.username);
//         console.log(sessionStorage);
//       }
//     },//success
//     error:function(){
//       console.log('error: cannot call api');
//     }//error
//   });//ajax
//
// }//else
// });//submit function for login loginForm
//  <!-- TO BE DELETED AFTER MERGED FINISH HERE-->

// display user profile function
$('nav i').on('click', function () {
//$('#viewProfileBtn').click(function(){
   let uID = sessionStorage.uID;
   console.log(uID);

   //display user information
    $.ajax({
      url :`${url}/user/u=${uID}`,
      type :'GET',
      dataType :'json',
      success : function(displayUser){
        console.log(displayUser);
        document.getElementById('displayProfile').innerHTML = "";

        for(let i=0; i<displayUser.length; i++){
          document.getElementById('displayProfile').innerHTML +=
          `<div class="mr-5 mb-5 px-5 py-3">
            <img class="img-thumbnail img-size" src="https://drive.google.com/thumbnail?id=1BEH4WEXZBjIjIfxuDANpJilnuBoy08th" alt="Image">
            <h3 class="">${displayUser[i].username}</h3>
            <h4 class="">${displayUser[i].businessAbout}</h4>
            <h4 class="">${displayUser[i].email}</h4>
            </div>`;
        }

      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax display user information end

    //display user listing item
    $.ajax({
      url :`${url}/allProducts/u=${uID}`,
      type :'GET',
      dataType :'json',
      success : function(displayProducts){
        console.log(displayProducts);
        document.getElementById('listingCard').innerHTML = "";

        for(let j=0; j<displayProducts.length; j++){
        document.getElementById('listingCard').innerHTML +=
          `<div class="col-3 mr-5 mb-5 px-5 py-3">
            <img class="img-thumbnail" src="${displayProducts[j].productImageUrl}" alt="Image">
            <p class="">${displayProducts[j].productName}</p>
            <p class="">${displayProducts[j].price}</p>
            </div>`;
        }

      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax display user listing item

});//display user profile function end



// retrieve username from sessionStorage and display on edit profile form
$('#editProfileBtn').click(function(){
  document.getElementById('usernameProfile').value =  sessionStorage.username;
  console.log(sessionStorage.username);
});

//update user (Edit User profile Form) function - profile page
$('#updateProfileBtn').click(function(){
  event.preventDefault();

  let fName = $('#editFirstName').val();
  let lName = $('#editLastName').val();
  let email = $('#editEmail').val();
  let bName = $('#editBusinessName').val();
  let bAbout = $('#editBusinessAbout').val();
  let uID = sessionStorage.uID;

  console.log(fName, lName, email, bName, bAbout, uID);

  if (fName == '' || lName == '' || email == '' || bName == '' || bAbout == ''){
    alert('Please enter all details');
  } else {

    $.ajax({
      url :`${url}/updateUser/${uID}`,
      type :'PATCH',
      data:{
        firstName : fName,
        lastName : lName,
        email : email,
        businessName : bName,
        businessAbout : bAbout
        },
      success : function(data){
        console.log(data);
        alert('your profile has been updated!');
        $('#editProfileModal').hide();
        $('.modal-backdrop').hide();
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error

    });//ajax
} //else
});//update user (Edit User Profile Form) function end


// Edit Product listing modal display function
$('#editListingBtn').click(function(){
   let uID = sessionStorage.uID;
   console.log(uID);
    $.ajax({
      url :`${url}/allProducts/u=${uID}`,
      type :'GET',
      dataType :'json',
      success : function(displayProducts){
        console.log(displayProducts);
        document.getElementById('listingCardEdit').innerHTML = "";

        for(let i=0; i<displayProducts.length; i++){
        document.getElementById('listingCardEdit').innerHTML +=
          `<div class="col-sm-6">
            <img class="img-thumbnail" src="${displayProducts[i].productImageUrl}" alt="Image">
            <p class="">${displayProducts[i].productName}</p>
            <p class="">${displayProducts[i].price}</p>
            <button type="button" class="btn btn-primary" id="editProductBtn" data-id="${displayProducts[i]._id}" data-index="${i}" data-toggle="modal" data-target="#updateProductModal">Edit</button>
            <button type="button" class="btn btn-primary" id="deleteProductBtn" data-id="${displayProducts[i]._id}" data-index="${i} data-toggle="modal" data-target="#editListingModal"">Delete</button>
            </div>`;
        }

          console.log(displayProducts[i]._id);

      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax
});// Edit Product listing modal display function end



//update Product (Edit product Form) function
$('#submitUpdateBtn').click(function(){
  event.preventDefault();

  let pID = $(this).attr("data-id");
  let uCategory = $('#updateProductCategory').val();
  let uProductName = $('#updateProductName').val();
  let uFlavour = $('#updateProductFlavour').val();
  let uDesc = $('#updateProductDesc').val();
  let uPrice = $('#updateProductPrice').val();
  let uImage = $('#updateProductImage').val();


  console.log(pID, uCategory, uProductName, uFlavour, uDesc, uPrice, uImage);

  if (uCategory == '' || uProductName == '' || uFlavour == '' || uDesc == '' || uPrice == '' || uImage == ''){
    alert('Please enter all details');
  } else {

    $.ajax({
      url :`${url}/updateProduct/${pID}`,
      type :'PATCH',
      data:{
        category : uCategory,
        productName : uProductName,
        price : uPrice,
        flavour : uFlavour,
        description : uDesc,
        productImageUrl : uImage
        },
      success : function(data){
        console.log(data);
        alert('your product listing has been updated!');
        $('#updateProductModal').hide();
        $('.modal-backdrop').hide();
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error

    });//ajax
} //else
});//update Product (Edit product Form) function


// close bootstrap backdrop
// $('#editModalClose').click(function(){
//  $('.modal-backdrop').hide();
// });

//close edit listing modal and display add new listing form
$('#addProductBtn').click(function(){
  $('#editListingModal').hide();
  $('#addNewListingModal').show();
  // document.getElementById('addUserId').value =  sessionStorage.uID;
  // console.log(sessionStorage.uID);
});

//close add new form, back to edit lisitng display modal
 $('#addNewModalClose').click(function(){
  // $('#editListingModal').show();
  $('.modal-backdrop').hide();
 });

// add new listing function (form)
$('#submitListingBtn').click(function(){
  event.preventDefault();
  let category = $('#addProductCategory').val();
  let productName = $('#addProductName').val();
  let productFlavour = $('#addProductFlavour').val();
  let productDesc = $('#addProductDesc').val();
  let productPrice = $('#addProductPrice').val();
  let productImage = $('#addProductImage').val();
  let uID = sessionStorage.uID;
  // let uID = $('#addUserId').val();

  console.log(category, productName, productFlavour, productDesc, productPrice, productImage ,uID);

  if (category == '' || productName == '' || productFlavour == '' || productDesc == '' || productPrice == '' || productImage == '' || uID == '' ){
    alert('Please enter all details');
  } else {

  $.ajax({
    url :`${url}/addProduct`,
    type :'POST',
    data:{
      category : category,
      productName : productName,
      price : productPrice,
      flavour : productFlavour,
      description : productDesc,
      productImageUrl : productImage,
      // user_id : uID
      user_id : sessionStorage.uID
      },

    success : function(addProduct){
      console.log(addProduct);
      if (!(addProduct == 'Item is already in database. Please try again!')) {
      alert('added listing');
      $('#addNewListingModal').hide();
      $('.modal-backdrop').hide();
      } else {
        alert('Item is already in database. Please try again!');

      }
      $('#addProductCategory').val('');
      $('#addProductName').val('');
      $('#addProductFlavour').val('');
      $('#addProductDesc').val('');
      $('#addProductPrice').val('');
      $('#addProductImage').val('');


    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error

  });//ajax

}//else
});//add new listing function end



// ************************  code from Pearly end




// *********  code from Kristine start



//  code from Kristine end
