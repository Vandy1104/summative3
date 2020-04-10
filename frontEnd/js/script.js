console.log("summative 3 connected");

let url;
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
  // testing
  $('#treatme').click(function(){
    console.log('clicked');
      $('#treatme').css('color', 'blue');
  });



// *********  code from Vandy start



//  code from Vandy end




// *********  code from Pearly start



//  code from Pearly end




// *********  code from Kristine start

// Show #homeView only
// $('#views').children().hide();
// $('#homeView').show();
// $('#productsView').hide();
// Tap #logo and show #homeView only
// $('#logo').click(function() {
//   $('#views').children().hide();
//   $('#homeView').show();
// });

//view cakes button start
  $('#cakeButton').click(function(){
    console.log('cakebuttonclicked');
    // $('#views').children().hide();
    $('#productsView').show();
//
let cake = $('#cakeButton').val();
//     console.log('cakeButton clicked');//checking if button click responds
    $.ajax({
    url :`${url}/allProducts/cat=${cake}`,
    type :'GET',
    dataType :'json',
    success : function(displayProducts){
      console.log(displayProducts);
      document.getElementById('productCards').innerHTML = "";
      for(let i=0; i<displayProducts.length; i++){
        document.getElementById('productCards').innerHTML +=
        `<div class="col-3 mr-5 mb-5 px-5 py-3">
        <img class="img-thumbnail" src="${displayProducts[i].productImageUrl}" alt="Image">
        </div>  <h1>hello<h1>`;
      }
    },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax
  });//view cakes button finish

  //view donuts button start
    $('#donutButton').click(function(){
      console.log('donutButtonclicked');
      // $('#views').children().hide();
      $('#productsView').show();
  //
  let donut = $('#donutButton').val();
  //     console.log('cakeButton clicked');//checking if button click responds
      $.ajax({
      url :`${url}/allProducts/cat=${donut}`,
      type :'GET',
      dataType :'json',
      success : function(displayProducts){
        console.log(displayProducts);
        document.getElementById('productCards').innerHTML = "";
        for(let i=0; i<displayProducts.length; i++){
          document.getElementById('productCards').innerHTML +=
          `<div class="col-3 mr-5 mb-5 px-5 py-3">
          <img class="img-thumbnail" src="${displayProducts[i].productImageUrl}" alt="Image">
          </div>  <h1>hello<h1>`;
        }
      },//success
        error:function(){
          console.log('error: cannot call api');
        }//error
      });//ajax
    });//view donuts button finish
//
// //  code from Kristine end
}); // document. ready function ends here
