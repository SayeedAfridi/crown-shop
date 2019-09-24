import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCd1N_6KCKI48cEIHwcO4VlvmBThyHjsZs",
    authDomain: "crown-shop-f4cbd.firebaseapp.com",
    databaseURL: "https://crown-shop-f4cbd.firebaseio.com",
    projectId: "crown-shop-f4cbd",
    storageBucket: "",
    messagingSenderId: "841977368523",
    appId: "1:841977368523:web:07ad0d7587c249cff7704e"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const createUserProfileDoc = async (userAuth, aditionalData) => {
    if(!userAuth) return
    const userRef = firestore.collection('users').doc(`${userAuth.uid}`)
    userRef.get().then(async snapshot =>{
        if(!snapshot.exists){
            const {displayName, email} = userAuth
            const createdAt = new Date()
            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...aditionalData
                })
            } catch (error) {
                console.log('Error creating user ', error.message)
            }
        }
    }).catch(err => {
        console.log('Error getting document', err);
    })

  

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey)
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newRef = collectionRef.doc()
        batch.set(newRef, obj)
    })

    return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections =>{
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();
        return {
            routename: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        }
    })

    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({prompt: 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase