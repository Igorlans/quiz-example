import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, User } from "firebase/auth";
import { IUser } from "@/types/entities/user";

/**Actions to authentificate User */
export class Authentificator {
    private constructor() {}

    /**Checks for mandatory User fields */  
    static validateData(authUser: User | null): IUser | void {
        if (!authUser) return;

        // Check mandatory fields: id, email, username
        if (!authUser.uid || !authUser.email || !authUser.displayName) return;
        
        const user = {
            id: authUser.uid,
            email: authUser.email,
            username: authUser.displayName,
            avatar: authUser.photoURL || '',
            tel: ''
        }

        return user;
    }

    /**Logins User with Facebook */
    static async facebookLogin() {

    }

    /**Logins User with Google */
    static async googleLogin(): Promise<IUser | void> {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        
        const user = result?.user;

        return Authentificator.validateData(user);;
    }

    /**Logins User with email and password */
    static async login(email: string, password: string) {
        await signInWithEmailAndPassword(auth, email, password);
        
        const user = auth.currentUser

        return Authentificator.validateData(user)
    }

    /**Registers User with email and password */
    static async register(email: string, password: string, username: string) {
        await createUserWithEmailAndPassword(auth, email, password);

        const user = auth.currentUser

        if (!user) return;

        await updateProfile(user, {
            displayName: username
        })

        return Authentificator.validateData(user)
    }
}
