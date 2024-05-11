import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    constructor(private auth: AngularFireAuth, private db: AngularFirestore, private router: Router) {}

    isAuthenticated() {
        return new Promise(resolve => {
          this.auth.onAuthStateChanged(user => {
            resolve(!!user);
          });
        });
    }

    async login(emailInput: string, password: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            try {
                await this.auth.signInWithEmailAndPassword(emailInput, password);
                resolve(true);
            } catch {
                resolve(false);
            }
        });
    }

    async register(emailInput: string, nameInput: string, addressInput: string, passwordInput: string) {
        let newUser: User;
        try {
        const userAuth = await this.auth.createUserWithEmailAndPassword(emailInput, passwordInput);
        if (userAuth) {
            newUser = {
                id: userAuth.user.uid,
                email: emailInput,
                name: nameInput,
                address: addressInput,
                deleted: false
            }
            await this.db.collection('users').doc(userAuth.user.uid).set(newUser);
          }
    
          return userAuth;
        } catch (error) {
          console.error('Hiba a létrehozás során:', error);
          throw error;
        }
    }

    async modifyUser(editUser: User) {
      await this.db.collection('users').doc(editUser.id).set(editUser);
    }

    getCurrentUser(userId: string) {
        return this.db.collection('users').doc(userId).valueChanges();
    } 
    
    logOut() {
         this.auth.signOut();
         this.router.navigate(['auth/login'])
    }

    async deleteUser(id: string) {
       return await this.auth.currentUser.then(user => {
          user?.delete().then(async () => {
            await this.db.collection("users").doc(id).update({
              deleted: true
            })
            this.router.navigate(['/']);
          }).catch(error => {
            console.log(error);
          });
      }).catch(error => {
        return false;
      });
    }

    

}