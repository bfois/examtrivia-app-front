import { Component, Inject} from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone:true,
  imports:[MatDialogModule,MatButtonModule, MatSnackBarModule,FormsModule]
})

export class DialogComponent{
  selectedImage!: any;
  selectedFile!: File;
  currentUser: any;
  newName:string = "";

  constructor(@Inject(
  MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DialogComponent>,
  private afAuth: AngularFireAuth,
  private storage: AngularFireStorage,
  private _snackBar: MatSnackBar) {
      this.afAuth.authState.subscribe(user => {
        this.currentUser = user;
        this.newName = this.currentUser.displayName
      });
    }

  selectFile(event:any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile)

    const reader = new FileReader();
    reader.onload = e => {
      this.selectedImage = e.target?.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  save() {
    const updatedUser = {
      displayName: this.newName,
      photoURL: this.selectedFile ? null : this.data.usuario.photoURL
    };

    if (this.selectedFile) {
      const path = `users/${this.currentUser.uid}/profile_picture`;
      const ref = this.storage.ref(path);
      const task = ref.put(this.selectedFile);

      const image = new Image();
      image.src = URL.createObjectURL(this.selectedFile);
      image.addEventListener('load', () => {
        ref.getDownloadURL().subscribe(url => {
          updatedUser.photoURL = url;
          this.updateUserProfile(updatedUser);
        });
      });
    } else {
      this.updateUserProfile(updatedUser);
    }

    // Cierra el diálogo
    this.dialogRef.close();
  }

  private updateUserProfile(updatedUser:any) {
    this.currentUser.updateProfile(updatedUser).then(() => {
      this._snackBar.open('Perfil actualizado', 'OK', { duration: 3000 })
    }).catch((error: any) => {
      console.log(error);
    });
  }
}
