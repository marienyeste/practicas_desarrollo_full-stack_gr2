import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from './../clases/Persona';

//importamos la librería para hacer las llamadas a la API:
import { HttpClient,HttpHeaders } from '@angular/common/http';

//importamos la lib
import *as moment from 'moment';

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
  // Añadimos los errores procedentes de la API:
  erroresAPI:string = '';

  contactos: Array<Persona> = [];

  contacto: Persona = new Persona('','',null,'','','','',''); 

  //Inyectamos la librería de HTTP
  constructor(private http:HttpClient) {

   }

  ngOnInit(): void {
    //Recuperamos las personas de la base de datos a través de la API:
    this.http.get(`http://localhost:3000/`).subscribe(( data: Array<Persona>)=>{
      this.contactos = data;
    })
  }
  add( form : NgForm ){
    let _that = this; //variable para acceder a this dentro del callback 
    this.erroresAPI = ''; // variable para recoger los errores procedentes de la API
    if( this.do === 'insert' ){
      this.errorDNI = '';
      this.errorNombre = '';
      this.errorApellidos = '';
      this.errorColor = '';
      this.errorEdad = '';
      this.erroresAPI = '';
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
      // this.contactos.push( this.contacto ); // Cambiamos este push por la llamada a la API
      this.http.post(`http://localhost:3000`, {
        nombre : this.contacto.nombre,
        apellidos : this.contacto.apellidos,
        edad : this.contacto.edad,
        dni : this.contacto.dni,
        cumple : moment(this.contacto.cumple).format('YYYY-MM-DD'),
        colorFavorito : this.contacto.colorFavorito,
        sexo : this.contacto.sexo,
        notas: this.contacto.notas
      }).subscribe(( res )=>{
      this.http.get(`http://localhost:3000`).subscribe(( data: Array<Persona>)=>{
        _that.contactos = data; 
      })
    }
    //capturamos los errores de la API
    , (error) => {
      error.error.errors.forEach(element => {
        _that.erroresAPI = _that.erroresAPI + element.msg + "\n";
      });
    })
      this.contacto = new Persona('','',null,'','','','',''); //resetea los campos del formulario tras la inserción
      }

    }else{
      // this.contactos[ this.position ] = this.contacto;
      this.http.post(`http://localhost:3000/${this.contacto.id}`, {
        nombre : this.contacto.nombre,
        apellidos : this.contacto.apellidos,
        edad : this.contacto.edad,
        dni : this.contacto.dni,
        cumple : moment(this.contacto.cumple).format('YYYY-MM-DD'),
        colorFavorito : this.contacto.colorFavorito,
        sexo : this.contacto.sexo,
        notas: this.contacto.notas
      }).subscribe(( res )=>{
      this.http.get(`http://localhost:3000`).subscribe(( data: Array<Persona>)=>{
        _that.contactos = data; 
      })
    }
    //capturamos los errores de la API
    , (error) => {
      error.error.errors.forEach(element => {
        _that.erroresAPI = _that.erroresAPI + element.msg + "\n";
      });
    })
      this.do = 'insert';
      this.contacto = new Persona('','',null,'','','','',''); //resetea los campos del formulario tras la inserción
    }
    form.resetForm();
  }
  
  delete( id : string ) : void {
    let _that = this
    this.http.delete(`http://localhost:3000/${id}`).subscribe(( res )=>{
      this.http.get(`http://localhost:3000/`).subscribe(( data: Array<Persona>)=>{
        _that.contactos = data; 
      })
    }) 
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
      return `El ${campo} debe de tener al menos 3 caracteres. Introduce un ${campo} válido please ;)`;
    }
    else {
      return '';
    }
  }

}
