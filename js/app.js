let $=document
const registerForm=$.querySelector('.register-form')
const nameInput=$.querySelector('.nameInput')
const passwordInput=$.querySelector('.passwordInput')
const emailInput=$.querySelector('.emailInput')
const usersTableElem=$.querySelector('table')

let db=null     //event.target.result
let objectstore=null  //store
window.addEventListener('load',()=>{
    //ساخت دیتابیس به اسم سبز لرن indexedDB.open('name db',version number)
    let dbOpenRequest=indexedDB.open('sabzLear',12)
    dbOpenRequest.addEventListener('error',err=>{
        console.warn('error: ',err);
    })
    dbOpenRequest.addEventListener('success',event=>{
        db=event.target.result
        console.warn('success create db: ',db);
    })
    dbOpenRequest.addEventListener('upgradeneeded',event=>{
        db=event.target.result
        console.log('old:',event.oldVersion);
        console.log('new: ',event.newVersion);

        if(!db.objectStoreNames.contains('users')){
        //ساخت استور db.createObjectStore('name store')
        objectstore=db.createObjectStore('users',{
            keyPath:'userID'
        })
        }
        if(db.objectStoreNames.contains('course')){
        //حذف استور  db.deleteObjectStore('name store)
        db.deleteObjectStore('course')
        }

        console.log('upgrade: ',db.objectStoreNames);
    })
})
registerForm.addEventListener('submit',event=>{
    event.preventDefault()
    let newUser={
        userID:Math.floor(Math.random()*9999),
        name:nameInput.value,
        password:passwordInput.value,
        email:emailInput.value
    }
    let tx=db.transaction('users','readwrite')
    tx.addEventListener('error',err=>{
        console.log('err tx: ',err);
    })
    tx.addEventListener('complete',event=>{
        console.log('complete tx: ',event);
    })

    let store=tx.objectStore('users')
    let request=store.add(newUser)
    request.addEventListener('error',err=>{
        console.log('err request: ',err);
    })
    request.addEventListener('success',event=>{
        console.log('success request: ',event);
        clearInput()
    })

})

function clearInput(){
    nameInput.value=''
    passwordInput.value=''
    emailInput.value=''
}

function getUsers(){
    let tx=db.transaction('users','readonly')
    tx.addEventListener('error get',err=>{
        console.log('err tx: ',err);
    })
    tx.addEventListener('complete',event=>{
        console.log('complete get: ',event);
    })
}