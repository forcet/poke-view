import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.css',
})
export class DeleteDialog {

  constructor(private readonly dialogRef: MatDialogRef<DeleteDialog>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    this.dialogRef.close(true);
  }

}
