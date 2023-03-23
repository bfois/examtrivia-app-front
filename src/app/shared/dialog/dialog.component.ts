import { Component, Inject} from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone:true,
  imports:[MatDialogModule,MatButtonModule ]
})
export class DialogComponent{
  selectedImage!: any;
  selectedFile!: File;
  currentUser: any;
  constructor(@Inject(
    MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DialogComponent>,
  private afAuth: AngularFireAuth,
    private storage: AngularFireStorage) {
      this.afAuth.authState.subscribe(user => {
        this.currentUser = user;
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
    if (this.selectedFile) {
      const path = `users/${this.currentUser.uid}/profile_picture`;
      const ref = this.storage.ref(path);
      const task = ref.put(this.selectedFile);

      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            this.currentUser.updateProfile({
              displayName: this.data.usuario.displayName,
              photoURL: url
            }).then(() => {
              console.log('Perfil actualizado');
            }).catch((error:any) => {
              console.log(error);
            });
          });
        })
      ).subscribe();
    } else {
      this.currentUser.updateProfile({
        displayName: this.data.usuario.displayName,
        photoURL: this.data.usuario.photoURL
      }).then(() => {
        console.log('Perfil actualizado');
      }).catch((error:any) => {
        console.log(error);
      });
    }

    // Cierra el diálogo
    this.dialogRef.close();
  }
}
