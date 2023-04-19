import { MatPaginator } from '@angular/material/paginator';
import  Swal  from 'sweetalert2';
export class Util{

  public static succesaMessage(texto:string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: texto
    })
  }

  public static errorMessage(texto:string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast:any) => {

        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })


    Toast.fire({
      icon: 'error',
      title: texto
    })
  }

  public static errorMessajeNormal(texto:string){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: texto,
      showConfirmButton: true,
      // timer: 2500
    })
  }
  public static succesMessajeNormal(texto:string){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: texto,
      showConfirmButton: true,
      // timer: 2500
    })
  }

  public static cambiarIdiomaPaginacion(paginator: MatPaginator){
    paginator._intl.itemsPerPageLabel="Registros por página";
    paginator._intl.firstPageLabel="Primera página";
    paginator._intl.lastPageLabel="Última página";
    paginator._intl.nextPageLabel="Página siguiente";
    paginator._intl.previousPageLabel="Página anterior";
    paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`; // customize this line
    };
}

}
