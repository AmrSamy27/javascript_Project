let objProductsDataLocalStorage=[];
 

   getAllInfo();
function getAllInfo(){
    let counter = 0;
    let price = 0;
    if(localStorage.getItem('ecommerce')){
        let productObjects = JSON.parse(localStorage.getItem('ecommerce'));
        productObjects.forEach(product => {
            counter += Number(product.counter);
            price += Number(product.totalPrice);
            
        });
    }
   
    let addToContainer = document.getElementById('addToCard');
    let linkCard = document.createElement('a');
    linkCard.setAttribute('href','cart.html');
    linkCard.innerHTML=addToContainer;
     addToContainer.querySelector('#counter').innerHTML = counter;
     addToContainer.querySelector('#price').innerHTML = '$' +price;
}


fetch('https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json')
.then(function(response){
   return response.json();
}).then(function(result){
renderProductsTOHTml(result);
}).catch(function(error){
alert(error);
});


let renderProductsTOHTml= (products) => {    
        let containerDiv=document.getElementById('allData');
        let divRow =document.createElement('div');
     
        divRow.classList.add('row');

        products.ProductCollection.forEach(element => {
            let productInfo={};
            let divFooter =document.createElement('div');
            let divImg =document.createElement('div');
            let divName =document.createElement('div');
    
            let divCol =document.createElement('div');
            divCol.classList.add('col-md-4');
            let name =document.createElement('h3');
            let price =document.createElement('h4');
            let link =document.createElement('a');
            let IMG = new Image();
            let addToCardButton = document.createElement('button');
            IMG.classList.add('image-fluid');   
                addToCardButton.classList.add('btn','btn-secondary');
            link.setAttribute('href','product.html');
                divCol.classList.add('d-flex','flex-column','mt-5');
                name.innerHTML =  element.Name
                price.innerHTML='$' +element.Price;
            divImg.appendChild(IMG);
            divName.appendChild(name);
            divFooter.appendChild(price);
            divFooter.appendChild(addToCardButton);
            divFooter.classList.add('d-flex','justify-content-around','mt-auto');
            IMG.src = element.ProductPicUrl;
            link.appendChild(IMG);
            addToCardButton.innerHTML = "Add";
             if(checkForQuantityAvailability(getLocalStorageData(element.ProductId))){
                 addToCardButton.disabled = true;
             }
            
            addToCardButton.addEventListener('click',function(){
                let product = getLocalStorageData(element.ProductId);
                
                if(product){
                   product.totalPrice = Number(product.totalPrice) + Number(element.Price);
                   product.counter +=1;
                   productInfo.counter = product.counter;
                   objProductsDataLocalStorage.push(product);
                   localStorage.setItem('ecommerce',JSON.stringify(objProductsDataLocalStorage));
                   if(checkForQuantityAvailability(product)){
                    this.disabled = true;
            }
                   
                }else {
                    let myProduct={};
                    myProduct.counter =0;
                    myProduct.price = element.Price;
                    myProduct.totalPrice = element.Price;
                    myProduct.productId = element.ProductId;
                    myProduct.ProductPicUrl = element.ProductPicUrl;
                    myProduct.quantity = element.Quantity;
                    myProduct.counter += 1;
                    productInfo.counter = myProduct.counter;
                    myProduct.name = element.Name;
                    objProductsDataLocalStorage.push(myProduct);
                    localStorage.setItem('ecommerce',JSON.stringify(objProductsDataLocalStorage));
                }
                
               getAllInfo();
              
            
            });
            divCol.classList.add('btn');
            divCol.appendChild(name);
            divCol.appendChild(link);
            divCol.appendChild(divFooter);
            divRow.appendChild(divCol);
            containerDiv.appendChild(divRow);
            link.addEventListener('click',function(){
                 
                productInfo.Category=element.Category;
                productInfo.productName = element.Name;
                productInfo.Description = element.Description;
                productInfo.Price = element.Price;
                productInfo.quantity = element.Quantity;
                productInfo.Status = element.Status;
                productInfo.ProductId = element.ProductId;
                productInfo.ProductPicUrl = element.ProductPicUrl;
                localStorage.setItem('productInfo',JSON.stringify(productInfo));
            });1
            
           
        });
       
}


function getLocalStorageData(productId){
    objProductsDataLocalStorage=[];
    let myProductsObjects =JSON.parse(localStorage.getItem('ecommerce'));
    let wantedProduct;
    if(myProductsObjects){
        for (let i = 0; i < myProductsObjects.length; i++) {
            if(myProductsObjects[i].productId == productId){
              wantedProduct =  myProductsObjects[i];
                continue;
            }
                objProductsDataLocalStorage.push(myProductsObjects[i]);

            
            
        }
    }
   
    





        return wantedProduct;

    
}


function checkForQuantityAvailability(product){
    let myProducts =JSON.parse(localStorage.getItem('ecommerce'));
    let check = false;
    if(myProducts){

        myProducts.forEach(productForCheck=>{
            if(product){
               console.log(productForCheck.quantity,product.counter);
                if(product.quantity == product.counter){
                    console.log('true');
                     check = true;
                    return check;
                } 
            }
            
            
            
    });
    return check;

    }
            
    }   
