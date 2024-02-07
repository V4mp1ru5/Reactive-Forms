import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form:FormGroup<any>;

  formData?: Data;
  constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    chat: ['', [Validators.required, this.myCustomValidator1]],
    oui: ['',[Validators.required, this.myCustomValidator2]],
  }, { validators: this.myCustomValidator3 });

  this.form.valueChanges.subscribe(() => {
    this.formData = this.form.value;
  });

}
  myCustomValidator1(control: AbstractControl): ValidationErrors | null {
    // On récupère la valeur du champs texte
    const chat = control.value;
    // On regarde si le champs est remplis avant de faire la validation
    if (!chat) {
      return null;
    }
    // On fait notre validation
    let formValid = chat == "chat";
    // On mets les champs concernés en erreur
    // Si le formulaire est invalide on retourne l'erreur
    // Si le formulaire est valide on retourne null
    return !formValid?{chatValidator:true}:null;
  }
  myCustomValidator2(control: AbstractControl): ValidationErrors | null {
    // On récupère la valeur du champs texte
    const oui = control.value;
    // On regarde si le champs est remplis avant de faire la validation
    if (!oui) {
      return null;
    }
    // On fait notre validation
    let formValid = oui == "oui";
    // On mets les champs concernés en erreur
    // Si le formulaire est invalide on retourne l'erreur
    // Si le formulaire est valide on retourne null
    return !formValid?{ouiValidator:true}:null;
  }
  myCustomValidator3(form: AbstractControl): ValidationErrors | null {
    // On récupère les valeurs de nos champs textes
    const chat = form.get('chat')?.value;
    const oui = form.get('oui')?.value;
    // On regarde si les champs sont remplis avant de faire la validation
    if (!chat || !oui) {
      return null;
    }
    // On fait notre validation
    let formValid = oui =="oui" && chat =="chat";
    // Si le formulaire est invalide on retourne l'erreur
    // Si le formulaire est valide on retourne null
    return !formValid?{chatIsLife:true}:null;
  }
}
interface Data {
  chat?: string | null ;
  oui?: string | null ;
}


