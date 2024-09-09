import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-box',
  standalone: true,
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class MessageBoxComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string },
    public dialogRef: MatDialogRef<MessageBoxComponent>
  ) {}

  closeMessageBox(): void {
    this.dialogRef.close();
  }
}
