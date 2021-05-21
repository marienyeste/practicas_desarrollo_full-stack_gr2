import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from './../clases/Persona';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit { 
  do: String = 'insert';
  position: any = 0;
  errorDNI:string = '';
  errorNombre:string = '';
  errorApellidos:string = '';
  errorColor:string = '';
  errorEdad:string = '';

  contactos: Array<Persona> = [];

  contacto: Persona = new Persona('','',null,'','','','',''); 

  constructor() { }

  ngOnInit(): void {
  }
  add( form : NgForm ){
    if( this.do === 'insert' ){
      this.errorDNI = '';
      this.errorNombre = '';
      this.errorApellidos = '';
      this.errorColor = '';
      this.errorEdad = '';
      let birthDate  = new Date(this.contacto.cumple);
      let day = birthDate.getDay();
      let month = birthDate.getMonth();
      let year = birthDate.getFullYear();
      let ageNum = this.contacto.edad;

      this.errorDNI = this.validarDNI(this.contacto.dni);
      this.errorNombre = this.validarMinCaracteres(this.contacto.nombre,'nombre');
      this.errorApellidos = this.validarMinCaracteres(this.contacto.apellidos,'apellidos');
      this.errorColor = this.validarMinCaracteres(this.contacto.colorFavorito,'color favorito');
      if(ageNum < 0 || ageNum > 125){ //Se comprobará que la edad esté comprendida entre 0 y 125.
        this.errorEdad = 'La edad tiene que tener un valor entre 0 y 125';
        }

      this.contacto.cumple = `${day}/${month}/${year}`;
      if(this.errorDNI.length == 0 && this.errorNombre.length == 0 && this.errorApellidos.length == 0 && this.errorColor.length == 0 && this.errorEdad.length == 0){ //Si no hay errores se inserta el contacto
      this.contactos.push( this.contacto );
      this.contacto = new Persona('','',null,'','','','',''); //resetea los campos del formulario tras la inserción
      }

    }else{
      this.contactos[ this.position ] = this.contacto;
      this.do = 'insert';
      this.contacto = new Persona('','',null,'','','','',''); //resetea los campos del formulario tras la inserción
    }
    form.resetForm()
  }
  
  delete( indice : number )    : void {
    this.contactos.splice( indice , 1 );
  }
  update( indice : number ) : void {
    this.contacto  = this.contactos[ indice ];
    this.do   = 'update';
    this.position = indice;
  }

  validarDNI(dni:string):any{
    if (dni == null || dni == ""){ //No se debe permitir una entrada vacía
      return 'DNI es un campo obligatorio, introduce un DNI válido please ;)';
    }
    else if (dni.length != 9 ){ // ni valores menores de 9 cifras 
      return 'El DNI tiene que tener una extensión de 9 cifras, introduce un DNI válido please ;)';
    }
    else {
      return '';
    }    
  }

  validarMinCaracteres(valor:string, campo:string):any {
    if (valor.length < 3 ){ // no se permiten valores menores de 3 cifras 
      return `El ${campo} es obligatorio, introduce un ${campo} válido please ;)`;
    }
    else {
      return '';
    }
  }

}
