console.log("Summative 3 connected");

let url, pID, businessName;

//get url and port from config.json

$.ajax({
  url :'config.json',
  type :'GET',
  dataType :'json',
  success : function(configData){
  console.log(configData);
  url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
  },
  error:function (){
    console.log('oops');
  }

});


$(document).ready(function(){


  // *********  code from Kristine start

  // A function to hide all views except home view
  function showHomeView() {
    $('#views').children().hide();
    $('#homeView').show();
    $('#profilePage').show();

  }

  showHomeView();

  // Logo: Tapping the 'treatme' logo will navigate the user back to the home view
  $('#treatme').click(function() {
    showHomeView();
    $('#homePage').show();
    $('#profilePage').hide();
  });

  // Selected category link: Tapping a category link will navigate the user to the individual selected product view with only the specific category of item displayed
  function categorySelected(selectedButtonValue) {
    // handle view display
    $('#homeView').hide(); // hide home view
    $('#selectedProductsView').show(); // show selected products view

    $('.selected-products-category-filter li').removeClass('isSelected');
    $('*[data-category="' + selectedButtonValue + '"]').addClass('isSelected'); // https://stackoverflow.com/questions/2487747/selecting-element-by-data-attribute

    console.log("Selected category: ", selectedButtonValue);

    $.ajax({
      url :`${url}/allProducts/cat=${selectedButtonValue}`,
      type :'GET',
      dataType :'json',
      success : function(displayProducts){

        $('#selectedProductsView .products').html(""); // clear products container
        for(let i=0; i<displayProducts.length; i++) {

          $('#selectedProductsView .products').append(
            `<div class="productCard col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-5" data-productid="${displayProducts[i]._id}">
                <div class="productCard__image">
                  <img class="img-thumbnail extra-radius" src="${displayProducts[i].productImageUrl}" alt="Image">
                </div>
                <div class="productCard__businessName .text-dark h4">
                  ${displayProducts[i].businessName}
                </div>
                <div class="productCard__productName">
                  ${displayProducts[i].productName}
                </div>
                <div class="productCard__price">
                  $${displayProducts[i].price}
                </div>
             </div>`
          ); // append end
        }//for end

      },//success end
      error:function(){
        console.log('error: Cannot call api');
      }
    });//ajax end
  }//function end

  // Selected category buttons: use categorySelected()
  $('#cakeButton').click(function(){
    let buttonValue = $(this).val();
    categorySelected(buttonValue);
  //  $('#profileIcon').show();
    $('#profilePage').hide();

  });

  $('#donutButton').click(function(){
    let buttonValue = $(this).val();
    categorySelected(buttonValue);
  //  $('#profileIcon').show();
   $('#profilePage').hide();
  });

  $('#cookiesButton').click(function(){
    let buttonValue = $(this).val();
    categorySelected(buttonValue);
  //  $('#profileIcon').show();
    $('#profilePage').hide();
  });

  // hover function for desktop
  $(document).ready(function(){
    $("p").hover(function(){
      $(this).css("background-color", "yellow");
      }, function(){
      $(this).css("background-color", "pink");
    });
  });

  // Selected product catagory: use categorySelected()
  $('.selected-products-category-filter li').click(function(){
    let buttonValue = $(this).data('category');
    categorySelected(buttonValue);
  });

  // // Selected product: Tapping a product will display a modal with specific product information
  function selectedProductModalView(productId){
    $.ajax({
      url :`${url}/allProducts/p=${productId}`, // need to update with path to specific product id
      type :'GET',
      dataType :'json',
      success : function(product){

        $('#exampleModalLongTitle').html(""); // clear exampleModalLongTitle
        $('#selectedProductModalView .modal-body').html(""); // clear modal body

        for(let i=0; i<product.length; i++) {
          // populate exampleModalLongTitle
          $('#exampleModalLongTitle').append(
            `${product[i].productName}`
          );

          // populate modal body
          $('#selectedProductModalView .modal-body').append(
            `<img class="img-thumbnail extra-radius" src="${product[i].productImageUrl}" alt="Image" style="width: 100%; height: auto">
            <h3 class="">${product[i].businessName}</h3>
            <h4 class="">${product[i].price}</h4>
            <button id="submitComment" type="button" class="btn btn-dark px-5 py-2 float-right rounded-pill">Buy</button>`,
            $('#addCommentForm').show()   //Line By Vandy
          );//append end

          $('#selectedProductModalView').modal('toggle'); // show modal

          console.log(product);
        }//for end
      },//success end
      error:function(){
        console.log('error: Cannot call api');
      }//closing error end

    });//ajax end
    addComment(productId);    // Line By Vandy
    allComments(productId);  // Line By Vandy
  }//function end

  // Product cards: Click event
  $(document).on("click", ".productCard" , function() {
    let productId = $(this).data('productid');
    console.log("productId: ", productId);
    selectedProductModalView(productId);
  });

  // Selected category link: Tapping a category link will navigate the user to the selected products view with only the specific category of items displayed


//******* code from Kristine finishes



// *********  code from Vandy start

console.log(sessionStorage);



if (sessionStorage.uID) {
    console.log('You are logged in');
    $('#loginBtn').hide();
    $('#logoutBtn').show();
    $('#registerBtn').hide();
    $('#profileIcon').show();


  } else {
    console.log('Please login');
    $('#logoutBtn').hide();
    $('#loginBtn').show();
    $('#registerBtn').show();
    $('#profielIcon').hide();
  }


  // Register user form submission
$('#business').hide();
$('#customRadio2').click(function(){
  $('#business').show();
});


// $('#business').show();
$('#customRadio1').click(function(){
  $('#business').hide();
});



	$('#registerForm').submit(function(){
		event.preventDefault();
		let newUsername = document.getElementById('newUsername').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
		let email = document.getElementById('email').value;
		let newPassword = document.getElementById('newPassword').value;
		let confirmPassword = document.getElementById('confirmPassword').value;
    let businessName = document.getElementById('businessName').value;
    let businessAbout = document.getElementById('businessAbout').value;
    let defaultProfileImg = document.getElementById('defaultProfileImg').value;


    console.log(newUsername, firstName, lastName, email, newPassword);
		// Ensures that the user has made their passwords match
		if(newPassword !== confirmPassword){
			alert('Ensure your passwords are matching');
		} else{
			// Sets the password to the one that the user has input
			newPassword = confirmPassword;
			if((newUsername === '') || (firstName === '') || (lastName === '') || (email === '') || (newPassword === '')|| (confirmPassword === '')){
				alert('Please enter all details');
			} else{
				$.ajax({
					url :`${url}/registerUser`,
					type :'POST',
					dataType : 'json',
					data : {
            profileImgUrl : defaultProfileImg,
						username : newUsername,
            firstName : firstName,
            lastName : lastName,
						email    : email,
						password : newPassword,
            businessName: businessName,
            businessAbout: businessAbout
					},
					success : function(registerUser){
						console.log(registerUser);
						  $('.registerModal').modal('hide');
					},
					// success
					error : function(){
						console.log('Already an exsisting member, Please login!');
					} // error
				});
				console.log(newUsername, firstName, lastName, email, newPassword, businessName, businessAbout);
			}
		}
	});     //Register ends


  //login

	$('#loginForm').submit(function(){
		event.preventDefault();
    $('#logoutBtn').hide();
    $('#profileIcon').hide();
    let username = $('#username').val();
    let password = $('#password').val();
		console.log(username, password);

		if ((username === '' || password === '')){
			alert('Please enter both');
		} else {

			$.ajax({
				url :`${url}/loginUser`,
				type :'POST',
				data:{
					username : username,
					password : password
				},

				success : function(user){
			    console.log(user);
          if (user == 'user not found. Please register'){
				    Swal.fire('user not found. please enter correct data or register a new user');
            $('#username').val('');
  					$('#password').val('');
			    } else if (user == 'not authorized'){
					Swal.fire('Please try with correct details');
					$('#username').val('');
					$('#password').val('');
			    } else{
			    	$('#loginUserModal').modal('hide');
            $('#logoutBtn').show();
            $('#loginBtn').hide();
            $('#registerBtn').hide();
            $('#profileIcon').show();
					sessionStorage.setItem('uID',user._id);
					sessionStorage.setItem('username', user.username);
					sessionStorage.setItem('email',user.email);
					console.log(sessionStorage);
          Swal.fire('Login successful');
			    }
			   }, // success
			  error : function(){
				console.log('error: cannot call api');
			  } // error
			}); // ajax
		} // else
	}); // submit function for login loginForm


  // Logout function called inside of login form submission
  	// function logoutBtnClick(){
  		$('#logoutBtn').click(function(){
  			sessionStorage.clear();
        console.log('Please login');
  			// Removes priviledges from page
        $('#logoutBtn').hide();
        $('#loginBtn').show();
        $('#registerBtn').show();
        $('#profilePage').hide();
        $('#profileIcon').hide();
        $('#homePage').show();
  		});//logout Button functionality ends here

// add comment start here
    var dateString = new Date();
    dateString = dateString.toUTCString();
    dateString = dateString.split(' ').slice(0, 4).join(' ');
    console.log(dateString);
    var date = dateString;
    console.log(date);
      $('#addCommentForm').hide();
      function addComment(productId){
        $('#addCommentForm').submit(function(){
          event.preventDefault();
          let message = document.getElementById('message').value;
          let postby = sessionStorage.username;
          let date = dateString;
          let user_id = sessionStorage.uID;
          let pID = productId;
          console.log(date);
         //display add comment box
          $.ajax({
            url :`${url}/addComment/p=${productId}`,
            type :'POST',
            data :{
              message : message,
              postby  : postby,
              date    : date,
              user_id : user_id,
              product_id : pID
              },
            success : function(addComment){
              console.log(addComment);
              Swal.fire('Sent');
                $('#message').val(' ');
                allComments(productId);
            },//success
            error:function(){
              console.log('error: cannot call api');
            }//error
          });//ajax end
        }); //Submit function ends
}
//allComments start here

function allComments(productId){
    $.ajax({
      url :`${url}/allComments/p=${productId}`,
      type :'GET',
      dataType :'json',
      success : function(allComments){
        console.log(allComments);
        $('#commentShow').html("");
        //document.getElementById('selectedProductModalView').innerHTML= '';
        for(let i=0; i<allComments.length; i++){
          $('#commentShow').append(
          `<div class="comment-outline col-12 my-2 py-2 px-3 mx-2">
                  <div class="row">
                    <div class="col-6">
                      <h6 class="font-style text-color mb-3 font-italic">${allComments[i].postby}</h6>
                    </div>
                    <div class="col-6">
                      <h6 class="font-style text-color mb-3 font-italic">${allComments[i].date}</h6>
                    </div>
                  </div>

                  <div class="row">
                     <div class="col">
                        <h6 class="font-style mb-3 font-italic">${allComments[i].message}</h6>
                        </div>
                    </div>
            </div>`
          ); //append ends
        } //for ends
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax end

} // allComments function ends

//  code from Vandy end


// ******************************* code from Pearly start

$('#profileIcon').hide();
//$('#profilePage').hide();

// edit listing section
$('#showListingSection').hide();
$('#buyCart').hide();

// buying and selling tab listing hide and show
$('#tab').hide();
$('#showListingBtn').hide();

$('#sellingTab').click(function(){
  $('#buyCart').hide();
  $('#sellCart').show();
  $('#showListingBtn').show();
});

$('#buyingTab').click(function(){
  $('#sellCart').hide();
  $('#buyCart').show();
  $('#showListingBtn').hide();
});

$('#backToProfile').click(function(){
  $('#showListingSection').hide();
  $('#profilePage').show();
  displayListing();
});


// profile icon clicked
// $('nav i').on('click', function () {
$('#profileIcon').click(function(){
  $('#homePage').hide();
  document.getElementById('listingCard').innerHTML = "";
  $('#profilePage').show();
  showProfile();

});


// display user profile function
function showProfile(){
   let uID = sessionStorage.uID;
   console.log(uID);
   $('#tab').show();


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
          ` <div class="container ml-4 col-md-12 col-lg-12 row">
            <div class="flex-container text-center pr-5 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <img class="extra-radius profile-img-size" src="${displayUser[i].profileImgUrl}" alt="image"/>
            <h3 class="font-style text-color vertical-rl my-5 mx-3">${displayUser[i].firstName} ${displayUser[i].lastName}</h3>
            </div><br>
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div class="row">
            <div class="col pt-4">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <div class="col">
            <button id="editProfileBtn" type="button" class="btn text-white my-btn-style rounded-pill hover-effect mt-3" data-index="${i}" data-toggle="modal" data-target="#editProfileModal">Edit Profile</button>
            </div>
            </div><br>
            <h4 class="font-style text-color font-weight-bold">Business Name</h4>
            <h6 class="font-style" id="showBusinessName">${displayUser[i].businessName}</h6>
            <br>
            <h4 class="font-style text-color font-weight-bold">About Seller</h4>
            <h6 class="font-style">${displayUser[i].businessAbout}</h6>
            <br>
            <h4 class="font-style text-color font-weight-bold">Email</h4>
            <h6 class="font-style mb-5 pb-5">${displayUser[i].email}</h6>
            <button id="showListingBtn" type="button" class="btn text-white my-btn-style rounded-pill hover-effect mb-3">Edit Selling Listing</button>
            </div>
            </div>`;
        }
        businessName = $('#showBusinessName').text();
        console.log(businessName);
        // retrieve username and auto display user information
        $('#editProfileBtn').click(function(){
          document.getElementById('usernameProfile').value = sessionStorage.username;
          console.log(sessionStorage.username);
          document.getElementById('profileImg').innerHTML = "";

          let index = $(this).attr('data-index');
          document.getElementById('profileImg').innerHTML +=
          `<img class="extra-radius" src="${displayUser[index].profileImgUrl}" alt="Image">`;

          $('#editProfileImage').val(displayUser[index].profileImgUrl);
          $('#editFirstName').val(displayUser[index].firstName);
          $('#editLastName').val(displayUser[index].lastName);
          $('#editEmail').val(displayUser[index].email);
          $('#editPassword').val(displayUser[index].password);
          $('#editBusinessName').val(displayUser[index].businessName);
          $('#editBusinessAbout').val(displayUser[index].businessAbout);
        });
        //$('#showListingBtn').hide();
        $('#showListingBtn').click(function(){
          $('#showListingSection').show();
          $('#profilePage').hide();
          displayListing();

        });


      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax display user information end

    // display user's product listing on profile page
    $.ajax({
      url :`${url}/allProducts/u=${uID}`,
      type :'GET',
      dataType :'json',
      success : function(displayProducts){
        console.log(displayProducts);
        document.getElementById('listingCard').innerHTML = "";

        for(let j=0; j<displayProducts.length; j++){
        document.getElementById('listingCard').innerHTML +=
          `<div class="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-5">
           <div class="wrapper">
           <img class="img-thumbnail extra-radius mb-2 d-block w-75" src="${displayProducts[j].productImageUrl}" alt="Image">
           <div class="overlay">
           <p class="font-style overlay-text">${displayProducts[j].category}</p>
           </div>
           </div>
           <h4 class="productCard__businessName font-weight-bold font-style text-color">${displayProducts[j].productName}</h4>
           <p class="productCard__productName font-style text-color desktop-display-text pr-5 mr-3 w-75">${displayProducts[j].description}</p>
           <h6 class="productCard__price font-weight-bold font-style text-color">$${displayProducts[j].price}</h6>
           </div>`;
        }

      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax display user listing item

}//display user profile function end



// function for display listing in listing section - profile page
function displayListing(){
  let uID = sessionStorage.uID;
  console.log(uID);
  $.ajax({
    url :`${url}/allProducts/u=${uID}`,
    type :'GET',
    dataType :'json',
    success : function(products){
      console.log(products);
      document.getElementById('listingCardEdit').innerHTML = "";

      for(let i=0; i<products.length; i++){
      document.getElementById('listingCardEdit').innerHTML +=
          `<div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-4 pl-5">
           <div class="row">
           <div class="wrapper">
           <img class="img-thumbnail extra-radius mb-2 d-block w-75" src="${products[i].productImageUrl}" alt="Image">
           <div class="overlay">
           <h4 class="font-weight-bold font-style overlay-text">${products[i].productName} <br> $ ${products[i].price}</h4>
           </div>
           </div>
           </div>
           <div class="row">
           <button type="button" class="btn btn-link text-color editProductBtn" data-id="${products[i]._id}" data-index="${i}" data-toggle="modal" data-target="#updateProductModal"><span>Edit</span></button>
           <button type="button" class="btn btn-link text-color deleteProductBtn mx-2 " data-id="${products[i]._id}" data-index="${i}" data-toggle="modal" data-target="#deleteProductModal">Delete</button>
           </div>
           </div>`;
      }


      $('.editProductBtn').click(function(){
        let index = $(this).attr('data-index');
        pID = $(this).attr("data-id");
        console.log(pID);

        document.getElementById('productImg').innerHTML = "";
        document.getElementById('productImg').innerHTML +=
        `<img class="extra-radius" src="${products[index].productImageUrl}" alt="Image">`;

        $('#updateProductCategory').val(products[index].category);
        $('#updateProductName').val(products[index].productName);
        $('#updateProductFlavour').val(products[index].flavour);
        $('#updateProductDesc').val(products[index].description);
        $('#updateProductPrice').val(products[index].price);
        $('#updateProductImage').val(products[index].productImageUrl);
        //$('#showListingModal').hide();
        $('#showListingModal').modal('hide');
      });

      $('.deleteProductBtn').click(function(){
        let index = $(this).attr('data-index');
        pID = $(this).attr("data-id");
        document.getElementById('deleteInformation').innerHTML = "";

        document.getElementById('deleteInformation').innerHTML +=
        `<img class="img-thumbnail extra-radius" src="${products[index].productImageUrl}" alt="Image">
         <h5 class="font-weight-bold font-style pt-3">${products[index].productName}</h5>
         <br>
         <h4 class="text-color font-style">Would you like to delete this product?</h4>`;

         $('#showListingModal').modal('hide');
         deleteProduct();

      });



    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax display user listing item
} //function for display listing in modal end



$('#updateProductClose').click(function(){
   $('.modal-backdrop').hide();
   $('#showListingModal').modal('hide');
});

$('#deleteProductClose').click(function(){
   $('.modal-backdrop').hide();
   $('#showListingModal').modal('hide');
});

$('#cancelBtn').click(function(){
   $('#deleteProductModal').modal('hide');
   $('.modal-backdrop').hide();
   $('#showListingModal').modal('hide');
});


//update user (Edit User profile Form) function - profile page
$('#updateProfileBtn').click(function(){
  event.preventDefault();
  let profileImg = $('#editProfileImage').val();
  let fName = $('#editFirstName').val();
  let lName = $('#editLastName').val();
  let email = $('#editEmail').val();
  let password = $('#editPassword').val();
  let bName = $('#editBusinessName').val();
  let bAbout = $('#editBusinessAbout').val();
  let uID = sessionStorage.uID;

  console.log(fName, lName, email, bName, bAbout, uID);

  if (profileImg == '' || fName == '' || lName == '' || email == '' || password == '' || bName == '' || bAbout == ''){
    // alert('Please enter all details');
    Swal.fire(
      'Missing Information?',
      'Please enter all details?',
      'question'
    );
  } else {

    $.ajax({
      url :`${url}/updateUser/${uID}`,
      type :'PATCH',
      data:{
        profileImgUrl : profileImg,
        firstName : fName,
        lastName : lName,
        email : email,
        password : password,
        businessName : bName,
        businessAbout : bAbout
        },
      success : function(data){
        console.log(data);
        // alert('your profile has been updated!');
        Swal.fire({
            icon: 'success',
            title: 'Your profile has been updated',
            showConfirmButton: false,
            timer: 1500
          });
        $('#editProfileModal').modal('hide');
        $('.modal-backdrop').hide();
        showProfile();
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error

    });//ajax
} //else
});//update user (Edit User Profile Form) function end



//update Product (Edit product Form) function
$('#submitUpdateBtn').click(function(){
  event.preventDefault();

  let uCategory = $('#updateProductCategory').val();
  let uProductName = $('#updateProductName').val();
  let uFlavour = $('#updateProductFlavour').val();
  let uDesc = $('#updateProductDesc').val();
  let uPrice = $('#updateProductPrice').val();
  let uImage = $('#updateProductImage').val();


  console.log(uCategory, uProductName, uFlavour, uDesc, uPrice, uImage);

  if (uCategory == '' || uProductName == '' || uFlavour == '' || uDesc == '' || uPrice == '' || uImage == ''){
    // alert('Please enter all details');
    Swal.fire(
      'Missing Information?',
      'Please enter all details?',
      'question'
    );
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
        //alert('your product listing has been updated!');
        Swal.fire({
            icon: 'success',
            title: 'Your product listing has been updated',
            showConfirmButton: false,
            timer: 1500
          });
        $('#updateProductModal').modal('hide');
        $('.modal-backdrop').hide();
        displayListing();
        showProfile();
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error

    });//ajax
} //else
});//update Product (Edit product Form) function



// open add new listing form
$('#addProductBtn').click(function(){
  $('#showListingModal').hide();
  $('#addNewListingModal').show();

  document.getElementById('addbusinessName').value = businessName;
  console.log(businessName);
});

//close add new form, back to edit lisitng display modal
 $('#addNewModalClose').click(function(){
  $('#showListingModal').modal('hide');
  $('.modal-backdrop').hide();
 });

// add new product function (form)
$('#submitAddNewBtn').click(function(){
  event.preventDefault();
  let category = $('#addProductCategory').val();
  let bName = $('#addbusinessName').val();
  let productName = $('#addProductName').val();
  let productFlavour = $('#addProductFlavour').val();
  let productDesc = $('#addProductDesc').val();
  let productPrice = $('#addProductPrice').val();
  let productImage = $('#addProductImage').val();
  let uID = sessionStorage.uID;
  // let uID = $('#addUserId').val();

  console.log(category, bName, productName, productFlavour, productDesc, productPrice, productImage ,uID);

  if (category == '' || productName == '' || productFlavour == '' || productDesc == '' || productPrice == '' || productImage == '' || uID == '' ){
    //alert('Please enter all details');
    Swal.fire(
      'Missing Information?',
      'Please enter all details.',
      'question'
    );
  } else {

  $.ajax({
    url :`${url}/addProduct`,
    type :'POST',
    data:{
      category : category,
      businessName :bName,
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
      // addProduct = 'Item is already in database. Please try again!';
      // if (! addProduct) {

      if (!(addProduct == 'Item is already in database. Please try again!')) {
      // alert('added listing');
      Swal.fire({
          icon: 'success',
          title: 'Added new listing',
          showConfirmButton: false,
          timer: 1500
        });

      $('#addNewListingModal').modal('hide');
      $('#showListingModal').modal('hide');
      $('.modal-backdrop').hide();
      displayListing();
      showProfile();

      } else {
        //alert('Item is already in database. Please try again!');
        Swal.fire({
            icon: 'warning',
            title: 'Item name is already in database. Please try another name!',
            showConfirmButton: false,
            timer: 1500
          });
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
});//add new product function end


// function for delete project
function deleteProduct(){
  $('#submitDeleteBtn').click(function(){
    $.ajax({
       url :`${url}/deleteProduct/${pID}`,
       type :'DELETE',
       data:{
         _id : pID
       },
       success : function(data){
         console.log(data);
        // alert('your product has been deleted!');
        Swal.fire({
            icon: 'success',
            title: 'Your product has been deleted',
            showConfirmButton: false,
            timer: 1500
          });
         $('#deleteProductModal').modal('hide');
         $('#showListingModal').modal('hide');
         $('.modal-backdrop').hide();
         displayListing();
         showProfile();

       },
       error:function(err){
         console.log('error: cannot call api');
       } //error
       });//ajax
    });
} //function for delete project end



// filter dropdown clicked
document.getElementById('filterDropdown').addEventListener('click',function(){

    console.log('filterDropdown clicked');
    let flavour = $(this).val();
    filterFlavour(flavour);
    console.log(flavour);
    filterFlavour(flavour);

});

// filter function
function filterFlavour(chosenFlavour){
  console.log(chosenFlavour);


  $.ajax({
    url :`${url}/allProducts/flavour=${chosenFlavour}`,
    type :'GET',
    dataType :'json',
    success : function(displayProducts){

      $('#selectedProductsView .products').html(""); // clear products container
      for(let i=0; i<displayProducts.length; i++) {

        $('#selectedProductsView .products').append(
          `<div class="productCard col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-5" data-productid="${displayProducts[i]._id}">
              <div class="productCard__image">
                <img class="img-thumbnail extra-radius" src="${displayProducts[i].productImageUrl}" alt="Image">
              </div>
              <div class="productCard__businessName .text-dark h4">
                ${displayProducts[i].businessName}
              </div>
              <div class="productCard__productName">
                ${displayProducts[i].productName}
              </div>
              <div class="productCard__price">
                $${displayProducts[i].price}
              </div>
           </div>`
        ); // append end
      }//for end

    },//success end
    error:function(){
      console.log('error: Cannot call api');
    } //error
  });//ajax end
}


// ************************  code from Pearly end

}); // document. ready function ends here
