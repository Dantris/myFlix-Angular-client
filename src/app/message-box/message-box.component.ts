/**
 * @fileoverview This file defines the MessageBoxComponent, which is a dialog box
 * used to display messages with a title and content to the user.
 * @module MessageBoxComponent
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

/**
 * @component
 * @description A dialog component used to display a message to the user, with a title and content.
 * The dialog can be closed by the user.
 */
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
  /**
   * Injected data into the dialog, containing the title and content of the message.
   * @type {{ title: string, content: string }}
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string },
    public dialogRef: MatDialogRef<MessageBoxComponent>
  ) {}

  /**
   * Closes the message box dialog.
   * 
   * @function closeMessageBox
   * @returns {void}
   */
  closeMessageBox(): void {
    this.dialogRef.close();
  }
}
