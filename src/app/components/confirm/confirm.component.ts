import { Component, inject, OnInit } from '@angular/core';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit{

  private tipoDocumentoService = inject(TipoDocumentoService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  onNoClick(){
    this.dialogRef.close(3);
  }
  delete(){
    if(this.data != null) {
        if(this.data.module == "tipo-documento") {
          this.tipoDocumentoService.deleteTipoDocumento(this.data.id).subscribe((data:any)=>{
          this.dialogRef.close(1);
        },(error:any)=>{
          this.dialogRef.close(2);
        });
    } else if (this.data.module =="product") {
      this.tipoDocumentoService.deleteTipoDocumento(this.data.id).subscribe((data:any)=>{
        this.dialogRef.close(1);
      },(error:any)=>{
        this.dialogRef.close(2);
      });
    }
      }else{
        this.dialogRef.close(2);
      }
  }
}
