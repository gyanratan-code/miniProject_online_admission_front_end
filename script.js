const form = document.getElementById("form")
let msg = document.getElementsByClassName("message")[0];
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
        messageBox("Student added successfully.");
        //and prompt the new entry page to be editied for next instruction to be chosen
        document.getElementById("info_new_admit").style= "display: all";
        document.getElementsByClassName("form")[0].style="display:none";
        //reset the form using javascript to perform further info
        const clickedElement = event.target.children;
        const siblings = Array.from(event.target.children).filter(element => element != clickedElement);
        for (let index = 0; index < (siblings.length-1); index++) {
            siblings[index].value="";
        }
    }
    else{
        //prompt user that it is not a valid student to be added in database.
        messageBox("Not a valid student");
        //and prompt the new entry page to be editied for next instruction to be chosen
        document.getElementById("info_new_admit").style= "display: all";
        document.getElementsByClassName("form")[0].style="display:none";
        //reset the form using javascript to perform further info
        const clickedElement= event.target.children;
        const siblings = Array.from(event.target.children).filter(element => element != clickedElement);
        for (let index = 0; index < (siblings.length-1); index++) {
            siblings[index].value="";
        }
    }
}
//subit button for query
document.getElementById("submitEntry").addEventListener("click",queryLocal);
document.getElementById("submitEntry").addEventListener("submit",queryLocal);
function queryLocal(event){
    event.preventDefault();
    const clickedElement = event.target;
    const siblings = Array.from(clickedElement.parentElement.children).filter(element => element != clickedElement);
    let email = siblings[0].value;
    //perform query and publish search results
    const dbRequest = indexedDB.open('myDatabase',1);
    dbRequest.onsuccess = function(event){
        const db = event.target.result;
        const transaction = db.transaction(['entries'],'readonly');
        const objectStore= transaction.objectStore('entries');
        const index= objectStore.index("email");
        let newrequest= index.get(email);
        newrequest.onsuccess= function(event){
            const student = event.target.result;
            if(student){
                //if found print this to message box
                messageBox("Student found in local database.");
            }
            else{
                messageBox("Student not found in local database.");
            }
        }
        newrequest.onerror = function (event){
            messageBox("Error:"+event.target.error);
        }
    }
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
    document.querySelector("h1").textContent="New Admission Entry";
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
//messagebox access
function messageBox(data){
    let message=document.getElementById("mcontent");
        message.textContent=data;
        msg.style="";
        setTimeout(() => {
            msg.style="display:none;"
        }, 1500);
}