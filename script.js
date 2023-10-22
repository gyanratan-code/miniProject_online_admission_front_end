const form = document.getElementById("form")
//Submit Button
document.addEventListener("submit",submit);
function submit(event){
    event.preventDefault();
    //fetching data from form
    const formData = new FormData(form);
    if(formData.get('XIImarks')>60){
        //local database intialisiation
        const dbRequest = indexedDB.open('myDatabase',1);
        dbRequest.onupgradeneeded = function(event){
            const db = event.target.result;
            //create an object store
            const objectStore = db.createObjectStore('entries',{keyPath:'id',autoIncrement:true});
            //define the structure of data stores
            objectStore.createIndex('sname', 'sname', { unique: false });
            objectStore.createIndex('mobile', 'mobile', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('dob', 'dob', { unique: false });
            objectStore.createIndex('XIImarks', 'XIImarks', { unique: false });
        }
        //add data to local storage database
        dbRequest.onsuccess = function(event){
            const db = event.target.result;
            const transaction = db.transaction(['entries'],'readwrite');
            const store= transaction.objectStore('entries');
            const entry ={
                name: formData.get('sname'),
                mobile: formData.get('mobile'),
                email: formData.get('email'),
                dob: formData.get('dob'),
                XIImarks : formData.get('XIImarks'),
            }
            store.add(entry);
        }
        //prompt user that it is added successfully

        //reset the form using javascript to perform further info
        let userInput=document.querySelectorAll("input");
        for (let index = 0; index < userInput.length; index++) {
            userInput[index].value="";
        }
    }
    else{
        //prompt user that it is not a valid student to be added in database.

        //and prompt the new entry page to be editied for next instruction to be chosen
        document.getElementById("info_new_admit").style= "display: all";
        document.getElementsByClassName("form")[0].style="display:none";
    }
}
//subit button for query
document.getElementById("submitEntry").addEventListener("click",queryLocal);
function queryLocal(event){
    event.preventDefault();
    //perform query and publish search results
}
function addNew(){
    //hide the content of info_new_admit and show form
    document.getElementById("info_new_admit").style= "display: none";
    document.getElementsByClassName("form")[0].style="display:all";
}
function newAdmit(event){
    event.preventDefault();
    document.getElementsByClassName("form")[0].style="display:none";
    document.getElementsByClassName("form")[1].style="display:none";
    document.getElementById("info_new_admit").style="";
}
function checkAdmit(event){
    event.preventDefault();
    document.getElementById("info_new_admit").style="display:none";
    document.getElementsByClassName("form")[0].style="display:none";
    document.getElementsByClassName("form")[1].style="";
    document.querySelector("h1").textContent="Check Admission Entry";
}
//handling new entry button
document.getElementById("add_new").addEventListener("click",addNew);
//new admission and check admission button handler
document.getElementById("newAdmit").addEventListener("click",newAdmit);
document.getElementById("checkAdmit").addEventListener("click",checkAdmit);