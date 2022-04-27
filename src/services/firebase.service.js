import { getFirestore, collection, getDocs, addDoc, query, where, getDoc, doc, setDoc, limit, startAfter, orderBy, deleteDoc, onSnapshot }
    from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js"

const pageSize = 8;
var gLastDocForPaging = null


export const firebaseService = {
    initFirebase,
    getDocuments,
    getDocument,
    addDocument,
    saveDocument,
    subscribe
}
var app
async function initFirebase() {
    // Get from Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCifK9H3rtH5zM-sx59OVibg0jRccnEf-0",
        authDomain: "mister-tasker-firebase-d4814.firebaseapp.com",
        projectId: "mister-tasker-firebase-d4814",
        storageBucket: "mister-tasker-firebase-d4814.appspot.com",
        messagingSenderId: "253810175964",
        appId: "1:253810175964:web:47641efb19a08530562919"
    };

    // Initialize Firebase
    app = app ? app : initializeApp(firebaseConfig)


    // debug:
    window.tsayriliApp = app
}

async function addDocument(collectionName, document) {
    const db = getFirestore()
    try {
        const docRef = await addDoc(collection(db, collectionName), document)
        // console.log("Doc saved. id: ", docRef.id)
        return docRef
    } catch (err) {
        console.error("Error adding document: ", err)
        throw err
    }
}

async function getDocument(collectionName, id) {
    const db = getFirestore()
    const snap = await getDoc(doc(db, collectionName, id))
    if (!snap.exists()) {
        return null
    }
    const docToReturn = snap.data()
    docToReturn.id = id
    return docToReturn;
}


async function saveDocument(collectionName, document, id) {
    const db = getFirestore()
    // returns undefined
    await setDoc(doc(db, collectionName, id), document, { merge: true })
}

async function getDocuments(collectionName, filterBy) {

    const db = getFirestore()
    var collectionRef = collection(db, collectionName)
    var orderByParams = []

    if (filterBy.byUserId) {
        collectionRef = query(collectionRef, where('byUser.id', '==', filterBy.byUserId))
    }


    // collectionRef = query(collectionRef, limit(pageSize))
    // if (filterBy.pageNo && gLastDocForPaging) {
    //     collectionRef = query(collectionRef, startAfter(gLastDocForPaging))
    // }

    const querySnapshot = await getDocs(collectionRef)
    gLastDocForPaging = querySnapshot.docs[querySnapshot.docs.length - 1]
    const docs = []
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
        docs.push({ id: doc.id, ...doc.data() })
    })
    return docs
}


// Does not work
function subscribe(collectionName, cb) {
    const db = getFirestore()
    const docs = []
    const unsub = onSnapshot(collection(db, collectionName), (querySnapshot) => {
        // console.log("Current data: ", querySnapshot.docs);
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
            docs.push({ id: doc.id, ...doc.data() })
        })
        cb(docs)
    });

}
