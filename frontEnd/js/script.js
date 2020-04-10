console.log("summative 3 connected");





// *********  code from Vandy start
// Get url and port from config.json


console.log(sessionStorage);


  sessionStorage.clear();

  	// Login Status
  	function checkLoginStatus(){
  		if(sessionStorage.getItem('uID')){
  		// add logout button
  			document.getElementById('logoutUserBtnContainer').innerHTML =
  			`<button id="logoutBtn" class="btn btn-danger btn-block">Logout</button>`;
  		} else{
  			console.log('No user logged in');
  		}
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

    console.log(newUsername, firstName, lastName, email, newPassword);
		// Ensures that the user has made their passwords match
		if(newPassword !== confirmPassword){
			alert('Ensure your passwords are matching');
		} else{
			// Sets the password to the one that the user has inputted
			newPassword = confirmPassword;
			if((newUsername === '') || (firstName === '') || (lastName === '') || (email === '') || (newPassword === '')|| (confirmPassword === '')){
				alert('Please enter all details');
			} else{
				$.ajax({
					url :`${url}/registerUser`,
					type :'POST',
					dataType : 'json',
					data : {
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
          //alert('Congrats you are logged in');
          if (user == 'user not found. Please register'){
				    alert('user not found. Please enter correct data or register a new user');
			    } else if (user == 'not authorized'){
					alert('Please try with correct details');
					$('#username').val('');
					$('#password').val('');
			    } else{
			    	$('#loginUserModal').modal('hide');
					sessionStorage.setItem('uID',user._id);
					sessionStorage.setItem('username', user.username);
					sessionStorage.setItem('email',user.email);
					console.log(sessionStorage);
			    }
				checkLoginStatus();
				logoutBtnClick();
			  }, // success
			  error : function(){
				console.log('error: cannot call api');
			  } // error
			}); // ajax
		} // else
	}); // submit function for login loginForm

  // Logout function called inside of login form submission
  	function logoutBtnClick(){
  		$('#logoutBtn').on('click', function(){
  			sessionStorage.clear();
  			// Removes priviledges from page
  			document.getElementById('logoutUserBtnContainer').innerHTML = '';
  		});//logout Button functionality ends here
  	}


//  code from Vandy end




// *********  code from Pearly start



//  code from Pearly end




// *********  code from Kristine start



//  code from Kristine end
