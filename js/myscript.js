

let submi=document.getElementById("formButton");
submi.addEventListener('click',viewdata);


function viewdata(e)
{
    e.preventDefault();
    let name=document.getElementById("formName").value;
    let email=document.getElementById("formEmail").value;
    let subject=document.getElementById("formSubject").value;
    let message=document.getElementById("formMessage").value;  

    var objectOfIformation = {
      name: name,
       email: email,
       subject: subject,
      message: message
     };
        

     fetch('http://afternoon-falls-30227.herokuapp.com/api/v1/contact_us',{ 


method : 'POST',
headers: {
  'Content-Type': 'application/json'
  
},
body : JSON.stringify(objectOfIformation),




     }).then(function (resolve) {

       console.log(resolve.json())
      }).catch(function (reject){console.log( reject)});



}



