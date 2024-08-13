import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoDocumentoService } from '../../../services/tipo-documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-documento',
  templateUrl: './agregar-tipo-documento.component.html',
  styleUrl: './agregar-tipo-documento.component.css'
})
export class AgregarTipoDocumentoComponent implements OnInit{

  public tipoDocumentoForm!: FormGroup;
  public data = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private tipoDocumentoService = inject(TipoDocumentoService);
  private dialogRef = inject(MatDialogRef);
  headerFormulario:string = "";

  ngOnInit(): void {
    this.headerFormulario="Agregar";
    this.tipoDocumentoForm = this.fb.group({
      codigo: ['',Validators.required],
      descripcion: ['',Validators.required]
    })

    if (this.data!=null){
      this.updateForm(this.data);
      this.headerFormulario="Actualizar";
    }
  }
  updateForm(data:any){
    this.tipoDocumentoForm = this.fb.group({
      codigo: [this.data.codigo,Validators.required],
      descripcion: [this.data.descripcion,Validators.required]
    })
  }
  onSave(){
    let data = {
      codigo: this.tipoDocumentoForm.get('codigo')?.value,
      descripcion: this.tipoDocumentoForm.get('descripcion')?.value
    }
    console.log("datos inicio",data);
    if (this.data && this.data.id != null) {
      //update registry
      this.tipoDocumentoService.updateTipoDocumento(data, this.data.id).subscribe((data: any) => {
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    } else {
      //create new registry
      this.tipoDocumentoService.saveTipoDocumento(data).subscribe((data: any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    }
  }
  onCancel(){
    this.dialogRef.close(3);

  }
}
