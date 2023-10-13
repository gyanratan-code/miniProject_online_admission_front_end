const form = document.getElementById("form")
//Submit Button
document.addEventListener("submit",submit);
function submit(event){
    event.preventDefault();
    //fetching data from form
    const formData = new FormData(form);
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
        objectStore.createIndex('program', 'program', { unique: false });
        objectStore.createIndex('degree', 'degree', { unique: false });
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
            program : formData.get('program'),
            degree : formData.get('degree')
        }
        store.add(entry);
    }
}