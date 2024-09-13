let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let category=document.getElementById('category')
let submit=document.getElementById('submit')
let mood='create';
let result1;
let temp;
// console.log(title,price,taxes,ads,discount,total,count,category,submit)

function getTotal(){
    if (price.value!=''){
        let result=+price.value + +taxes.value+ +ads.value- +discount.value;
        total.innerHTML=result;
        total.style.background='#c15823';
        total.style.color='#ffffff';
    }else{
        total.innerHTML='';
        total.style.background= '#fd9c6b';
    }
}
  let datapro;
if(localStorage.product!=null){
   datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}

submit.onclick=function(){
   let newpro={
    title:title.value.toLowerCase(),
    price:price.value, 
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
   }

   if(title.value !=''&&price.value !=''&&category.value!=''&&newpro.count<100){
    if(mood==='create'){
        if(newpro.count>=1){
                datapro.push(newpro);    
        }
         // how change the mood to temp!!!!
       }else{
               datapro[temp]=newpro;
               mood='create';
               submit.innerHTML='Create'
               count.style.display='block';
       }
       cleardata()
   }
 


   if(title.value !=''&&price.value !=''&&category.value!=''&&newpro.count<100){
    if(mood==='create'){
        if(newpro.count>=1){
           // for(let i=0;i<newpro.count;i++){
           //     datapro.push(newpro);
           // }
           
        // }else{
            datapro.push(newpro);
         }
         // how change the mood to temp!!!!
       }else{
               datapro[temp]=newpro;
               mood='create';
               submit.innerHTML='Create'
               count.style.display='block';
       }
       cleardata()
   }
 
  
   localStorage.setItem('product',JSON.stringify(datapro))
   console.log(datapro);
   

   showdata()

}
// clear data 
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
   count.value='';
   category.value='';
}
// show data 
function showdata(){
    getTotal();
    sumcount();
   let table='';
   for(let i=0;i< datapro.length;i++){
    table += `
    <tr>
       <td>${i+1}</td>
     <td>${datapro[i].title}</td>
     <td>${datapro[i].price}</td>
     <td>${datapro[i].taxes}</td>
     <td>${datapro[i].ads}</td>
     <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].count}</td>
     <td>${datapro[i].category}</td>
    <td><button onclick="update(${i})" id="update">update</button></td>
     <td><button onclick="deletedata(${i})" id="delete">delete</button></td>                           
    </tr> 
    `
   }
   
    document.getElementById('tbody').innerHTML=table;

function sumcount(){
    result1 = 0;  // Initialize result1
    for(let i=0; i < datapro.length; i++){
        result1 += parseInt(datapro[i].count);
    }
    localStorage.setItem('resultid', result1);
    console.log(result1);
   // document.getElementById('totalcount').textContent = result1;
}

let deleteall=document.getElementById('deleteall');
if(datapro.length>0){
    deleteall.innerHTML=`
    <button onclick="deleteall()">delete All (${result1})</button>
    `
}else{
    deleteall.innerHTML='';
}




}
showdata()

function deletedata(i){
          datapro.splice(i,1);  // to delete element with index i

          localStorage.product=JSON.stringify(datapro);
          showdata()    //to update the data
}

function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata()
}

//count.style.display='none';
function update(i){
title.value=datapro[i].title;
price.value=datapro[i].price;
taxes.value=datapro[i].taxes;
ads.value=datapro[i].ads;
discount.value=datapro[i].discount;
count.value=datapro[i].count;
getTotal();
category.value=datapro[i].category;

submit.innerHTML='Update';
mood='update';
temp=i;

scroll({
    top:0,
    behavior:'smooth'

})


}
//                        SEARCH
let searchmood='title';
 function getsearchmood(id){
      let search=document.getElementById('search'); 
         if (id=='searchtitle'){
            searchmood='title';
          //  search.placeholder='Search By Title';
         }else{
            searchmood='category';
          //  search.placeholder='Search By Category';
         }
         search.placeholder='Search By '+searchmood;
         search.focus()
        // console.log(searchmood)
search.value='';
showdata()
 }

function searchdata(value){
    let table='';
    for(let i=0;i<datapro.length;i++){
    if( searchmood=='title')
    {
         
            if(datapro[i].title.includes(value))
            {
                 table += `
             <tr>
                <td>${i+1}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].count}</td>
              <td>${datapro[i].category}</td>
             <td><button onclick="update(${i})" id="update">update</button></td>
              <td><button onclick="deletedata(${i})" id="delete">delete</button></td>                           
             </tr> 
             `;
            }
    }
    else{
            if(datapro[i].category.includes(value.toLowerCase()))
            {
                 table += `
             <tr>
                <td>${i+1}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].count}</td>
              <td>${datapro[i].category}</td>
             <td><button onclick="update(${i})" id="update">update</button></td>
              <td><button onclick="deletedata(${i})" id="delete">delete</button></td>                           
             </tr> 
             `;
             }
    }
}
    document.getElementById('tbody').innerHTML=table;
}

































