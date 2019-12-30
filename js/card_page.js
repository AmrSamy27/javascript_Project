let myCard=JSON.parse(localStorage.getItem('ecommerce'));
let totalCartPrice=0;
console.log(myCard)
myCard.forEach(product => {
    const imageInfoDiv = document.createElement('div');
    const productImg = new Image();
    const InfoDiv = document.createElement('div');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const name = document.createElement('p');
    const h5 = document.createElement('h5');
    const priceTd = document.createElement('td');
    const quantityTd = document.createElement('td');
    const quantity = document.createElement('input');
    const total = document.createElement('td');
    const removeProductTd = document.createElement('td');
    const removeProduct = document.createElement('button');
    const errorSpan = document.createElement('span');
        errorSpan.classList.add('text-danger');
        
            removeProduct.innerHTML = 'Delete';
            removeProduct.classList.add('btn','btn-secondary');
        th.setAttribute('scope','row');
        th.classList.add('border-0');
        imageInfoDiv.classList.add('p-2');
        productImg.src = product.ProductPicUrl;
        InfoDiv.classList.add('ml-3','d-inline-block','align-middle');
        h5.classList.add('mb-0');
        name.classList.add('d-inline-block','align-middle');
        removeProductTd.classList.add('border-0','align-middle');
    quantity.setAttribute('type','number');
    priceTd.classList.add('border-0','align-middle');
    quantityTd.classList.add('border-0','align-middle');
    quantity.classList.add('form-control','input-md');
    total.classList.add('border-0','align-middle');
    productImg.classList.add('img-fluid','rounded','shadow-sm');
    productImg.setAttribute('width','70');
    name.innerHTML = product.name;
    priceTd.innerHTML ='$' + product.price;
    quantity.value = product.counter;
    total.innerHTML = product.totalPrice;
    let initialValueForCurrent = document.getElementById('myTotalCart').innerHTML == ''?0:document.getElementById('myTotalCart').innerHTML
    document.getElementById('myTotalCart').innerHTML = Number(initialValueForCurrent)+  Number(total.innerHTML);
    let tbody =  document.getElementById('myProductsCard');
    tbody.appendChild(tr);
    tr.appendChild(th);
   th.appendChild(imageInfoDiv);
   imageInfoDiv.appendChild(productImg);
   imageInfoDiv.appendChild(InfoDiv);
   InfoDiv.appendChild(h5);
   h5.appendChild(name);
   tr.appendChild(priceTd);
   tr.appendChild(quantityTd);
   quantityTd.appendChild(quantity);
   quantityTd.appendChild(errorSpan);
   tr.appendChild(total);
   removeProductTd.appendChild(removeProduct);
   tr.appendChild(removeProductTd);
   removeProduct.addEventListener('click',function(){
       myCard.splice(myCard.indexOf(product),1);
       if(myCard.length>0){
        localStorage.setItem('ecommerce',JSON.stringify(myCard));
       }else{
           localStorage.removeItem('ecommerce');
       }

        tr.remove(); 
        document.getElementById('myTotalCart').innerHTML = Number(document.getElementById('myTotalCart').innerHTML) - Number(product.totalPrice);      
   })
let oldValue = quantity.value;
quantity.addEventListener('input',function(){
    this.setAttribute('min','1');
         this.setAttribute('max',product.quantity);
     if((Number(this.value) < Number(product.quantity)) && Number(this.value) != 0){
         console.log('noway');
                
         errorSpan.innerHTML = ' ';
     }else if(Number(this.value) >Number(product.quantity)){
         quantity.value = oldValue;
         console.log('noway');
         errorSpan.innerHTML = 'This Product Has Only '+product.quantity+' Available In The Stock';
     }else if(Number(this.value) == 0){
        quantity.value = 1;
        console.log('noway');


     }
     total.innerHTML = Number(this.value) * Number(product.price);
     product.totalPrice = Number(total.innerHTML);
     product.counter = this.value;
     console.log('ajkhfka');
     localStorage.setItem('ecommerce',JSON.stringify(myCard));
        document.getElementById('myTotalCart').innerHTML =   Number(getNewTotalPrice());

     
 });
 
});

function getTotalPriceOfCart(){
    let totalCart =JSON.parse(localStorage.getItem('ecommerce'));
        if(totalCart){

            myCard.forEach(myproduct=>{

            });
        }

}
function getNewTotalPrice(){
let newStorage =JSON.parse(localStorage.getItem('ecommerce'));
let totalPrice=0;
newStorage.forEach(product=>{
            totalPrice+= product.totalPrice;
});
return totalPrice;

}