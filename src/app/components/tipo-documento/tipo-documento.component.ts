import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoDocumentoElement } from '../../models/tipo-documento';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { AgregarTipoDocumentoComponent } from './agregar-tipo-documento/agregar-tipo-documento.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrl: './tipo-documento.component.css'
})
export class TipoDocumentoComponent implements OnInit {
  private tipoDocumentoService = inject(TipoDocumentoService);
  public dialog =  inject(MatDialog);
  private snackBar =  inject(MatSnackBar);

  ngOnInit(): void {
      this.getTipoDocumento();
  }
  displayedColumns:string[] = ['id','codigo','descripcion','actions'];
  dataSource = new MatTableDataSource<TipoDocumentoElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getTipoDocumento(){
    this.tipoDocumentoService.getTipoDocumento().subscribe((data:any)=>{
      this.processTipoDocumentoResponse(data);
    },(error:any) => {
      console.log("error",error);
    })
  }

  edit(id:number,codigo:string,descripcion:string){
    const dialogRef = this.dialog.open(AgregarTipoDocumentoComponent , {
      width: '450px',
      data: {id:id,codigo:codigo,descripcion:descripcion}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        Swal.fire({
          icon: "success",
          title: "Registro actualizado con éxito",
          showConfirmButton: true,
          timer: 3500
        });
        //this.openSnackBar("Tipo documento actualizado","Exitosa");
        this.getTipoDocumento();
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al actualizar el tipo de documento","Error");
      }
    });
  }
  delete(id:number){
    Swal.fire({
      title: "¿Esta seguro de eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoDocumentoService.deleteTipoDocumento(id).subscribe((data:any)=>{
          Swal.fire({
            title: "Registro eliminado con éxito",
            icon: "success",
            timer: 3500
          });        
          this.getTipoDocumento();
        })
      }
    });
    /*const dialogRef = this.dialog.open(ConfirmComponent , {
      width: '450px',
      data: {id:id,module:"tipo-documento"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Tipo documento eliminado","Exitosa");
        this.getTipoDocumento();
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al eliminar tipo documento","Error");
      }
    });*/
  }

  processTipoDocumentoResponse(resp:any){
    if(Array.isArray(resp)){
      const dataTipoDocumento: TipoDocumentoElement[] = resp.map((item:any) => ({
        id:item.id,
        codigo:item.codigo,
        descripcion:item.descripcion
      }));
      this.dataSource = new MatTableDataSource<TipoDocumentoElement>(dataTipoDocumento);
      this.dataSource.paginator = this.paginator;
    }else{
      console.log("Respuesta no es un array");
    }
  }
  search(term:string){
    if(term.length === 0){
      return this.getTipoDocumento();
    }
    this.tipoDocumentoService.searchTipoDocumento(term).subscribe((data: any) =>{
      this.processTipoDocumentoResponse(data);
    },(error: any) =>{
      console.log("error: ", error);
    });
  }

  openTipoDocumentoDialog(){
    const dialogRef = this.dialog.open(AgregarTipoDocumentoComponent , {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        Swal.fire({
          icon: "success",
          title: "Registro creado con éxito",
          showConfirmButton: true,
          timer: 3500
        });
        //this.openSnackBar("Tipo documento agregado","Exitosa");
        this.getTipoDocumento();
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al guardar el tipo de documento","Error");
      }


    });
  }
  openSnackBar(message:string,action:string):MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action,{
      duration:2000
    })
  }
}
