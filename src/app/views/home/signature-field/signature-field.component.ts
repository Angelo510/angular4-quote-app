import {
  Component,
  ViewChild,
  ViewChildren,
  forwardRef,
  ElementRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';
import {
  SignaturePad
} from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'signature-field',
  templateUrl: 'signature-field.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref
    useExisting: forwardRef(() => SignatureFieldComponent),
    multi: true,
  }, ],
})
export class SignatureFieldComponent implements ControlValueAccessor {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;

  public options: Object = {};

  public _signature: any = null;

  public propagateChange: Function = null;

  get signature(): any {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    console.log('set signature to ' + this._signature);
    console.log('signature data :');
    console.log(this.signaturePad.toData());
    this.propagateChange(this.signature);
  }

  public writeValue(value: any): void {
    if (!value) {
      return;
    }
    this._signature = value;
    this.signaturePad.fromDataURL(this.signature);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {
    // no-op
  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngAfterViewInit(): void {
    this.signaturePad.clear();
    this.signaturePad.set('canvasWidth', 700);
    this.signaturePad.set('canvasHeight', 300);
  }

  public drawBegin(): void {
    console.log('Begin Drawing');
  }

  public drawComplete(): void {
    this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }
}
