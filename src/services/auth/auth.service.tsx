import { CreateUser } from '../../models/user/user.dto';
import { GoogleAuthProvider, createUserWithEmailAndPassword, browserLocalPersistence, browserSessionPersistence, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../firebase/firebase.service";
import { createUser, } from "../user/user.service";
import AmityService from '../amity/amity.service';
import { Client } from '@amityco/ts-sdk';

enum SignInStatus {
    SUCCESS,
    AUTH_FIREBASE_FAIL,
    AUTH_1C_FAIL,

}
enum SignInMethod {
    CREDENTIAL,
    FACEBOOK,
    GOOGLE,
    APPLE,

}

const AUTH_PATH = "/auth";

const signIn = async (method: SignInMethod, data?: { email: string, password: string }) => {
    let firebaseUser = null;
    //handle auth state persistence
    await setPersistence(auth, browserLocalPersistence)

    //1: auth with firebase (check method)
    switch (method) {
        case SignInMethod.GOOGLE:
            firebaseUser = await signInWithGoogle();
            break;
        default:
            //check data passing is exist
            if (data) {
                firebaseUser = await signInWithCredentials(data.email, data.password);
            }
            break;
    }
    //handle fail with firebase
    if (!firebaseUser) {
        return SignInStatus.AUTH_FIREBASE_FAIL
    }
    // //2: auth with 1C
    // const user_1C = await getUserByFirebaseUUID(firebaseUser.uid);
    // // check if user created in 1C else create new user
    // const { setUser } = useAuthContext();
    // if (!user_1C) {
    //     const result = await HttpService.post(AUTH_PATH, {
    //         body: {
    //             UUID: firebaseUser?.uid
    //         }
    //     });
    //     console.log("Auth result: " + JSON.stringify(result))
    //     //check user data is created
    //     if (result?.status !== 200) {
    //         const createUser_1C: CreateUser = {
    //             Username: firebaseUser.email ?? '',
    //             Fullname: '',
    //             UUID: firebaseUser.uid,
    //             Password: data?.password,
    //             Email: firebaseUser.email ?? undefined,
    //             Avatar: firebaseUser.photoURL ?? undefined,
    //         };

    //         const result = await createUser(createUser_1C)
    //         if (result) {
    //             console.log("Create new user successfully")
    //             getUserByFirebaseUUID(firebaseUser.uid).then((userData) => setUser(userData))
    //         }
    //     }

    // }
    // else {
    //     setUser(user_1C);
    // }
    // handle amity information    

    return SignInStatus.SUCCESS;
}

//sign in with credential
const signInWithCredentials = async (email: string, password: string) => {
    console.log(auth, "auth  hehehehehe");
    console.log(email, "email  hehehehehe");
    console.log(password, "password  hehehehehe");

    const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
    if (!firebaseUser) {
        return null;
    }
    return firebaseUser.user;
}
// sign in with google
const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const firebaseUser = await signInWithPopup(auth, googleProvider);
    if (!firebaseUser) {
        return null;
    }
    return firebaseUser.user;
}
// sign in with facebook

const logOut = async () => {
    await Client.logout();
    await auth.signOut();
    
}

const signUpFirebase = async (email: string, password: string) => {

    const firebaseUser = await createUserWithEmailAndPassword(auth, email, password)
    if (!firebaseUser) {
        return null;
    }
    return firebaseUser.user;
}

const signUp = async (email: string, password: string, fullname: string) => {
    let firebaseUser = null;
    firebaseUser = await signUpFirebase(email, password);

    const createUser_1C: CreateUser = {
        Username: firebaseUser ? firebaseUser.uid : "",
        Fullname: fullname,
        UUID: firebaseUser ? firebaseUser.uid : "",
        Password: password,
        Email: email,
        Avatar: firebaseUser ? firebaseUser.photoURL : "",
    };

    const result = await createUser(createUser_1C)
}

export {
    SignInStatus,
    SignInMethod,
    signIn,
    logOut,
    signUp
}