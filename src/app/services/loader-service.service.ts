import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderServiceService {

  constructor(private spinner: NgxSpinnerService){

  }

  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  show(): void {
    this.spinner.show();
    this._isLoading = true;
  }

  hide(): void {
    this.spinner.hide();
    this._isLoading = false;
  }

}
