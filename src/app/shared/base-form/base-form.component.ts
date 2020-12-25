import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  template: ''
})
export abstract class BaseFormComponent implements OnInit {

  cadastroForm: FormGroup;

  formResult: string = '';

  errors: any[] = [];

  mudancasNaoSalvas: boolean;

  constructor() { }

  ngOnInit() {
  }

  abstract submit();

 
  onSubmit() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.formResult = JSON.stringify(this.cadastroForm.value);
      console.log(this.formResult);
      this.submit();
    } else {
      console.log('formulario invalido');
      //this.verificaValidacoesForm(this.cadastroForm);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.cadastroForm.reset();
  }


  verificaValidTouched(campo: string) {
    return (
      !this.cadastroForm.get(campo).valid &&
      (this.cadastroForm.get(campo).touched || this.cadastroForm.get(campo).dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.cadastroForm.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  verificaRequired(campo: string) {
    return (
      this.cadastroForm.get(campo).hasError('required') &&
      (this.cadastroForm.get(campo).touched || this.cadastroForm.get(campo).dirty)
    );
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }


}