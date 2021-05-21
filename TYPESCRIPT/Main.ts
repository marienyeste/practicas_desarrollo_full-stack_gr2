/** Entrega práctica Typescript - Desarrollo Full-Stack (GR2) - 
  * Mª Emilia Fernández López - 53147262N - 
  * UserID: user5f7ecdcd5fe83 */
/** _____________________________________________________
    INSTRUCCIONES DE USO:
      * compilar: tsc
      * ejecutar: ts-node Main.ts
      * Introducir DNI de la persona a modificar 
      * Introducir los datos que queremos modificar 
        (dejar en blanco los campos que no queremos cambiar )
    _____________________________________________________ 
*/

/** Importción de Móduclos */
import { Direccion } from './modulos/Direccion';
import { Mail } from './modulos/Mail';
import { Persona } from './modulos/Persona';
import { Telefono } from './modulos/Telefono';
/** -------------> Fin Importación de Módulos */

/** Se declaran varias direcciones, mails y teléfonos, también cumpleaños */
let telefono1 = new Telefono ('movil', 111111111);
let telefono2 = new Telefono ('movil', 222222222);
let telefono3 = new Telefono ('movil', 333333333);
let mail1 = new Mail ('personal', 'mail1@mail.com');
let mail2 = new Mail ('persona2', 'mail2@mail.com');
let mail3 = new Mail ('persona3', 'mail3@mail.com');
let cumple1 = new Date(1985,10,18);
let cumple2 = new Date(1985,10,19);
let cumple3 = new Date(1985,10,20);
let direccion1 = new Direccion('Calle1', 1, 1, 'a', '02480', 'Yeste', 'Albacete'); 
let direccion2 = new Direccion('Calle2', 2, 2, 'a', '02480', 'Yeste', 'Albacete'); 
let direccion3 = new Direccion('Calle3', 3, 3, 'a', '02480', 'Yeste', 'Albacete'); 

/** Se declara un array de Personas de la clase persona */
let arrayPersonas:Persona [] = [];

/** Se crean las diferentes persona de la clase Persona y se introducen en el array del mismo tipo */
let persona1:Persona = new Persona('Nombre1', 'Apellido1',35, 'DNI1', cumple1, 'color2','mujer', direccion1, mail1, telefono1,'' );
arrayPersonas.push(persona1);
let persona2:Persona = new Persona('Nombre2', 'Apellido2',36, 'DNI2', cumple2, 'color2','mujer', direccion2, mail2, telefono2,'' );
arrayPersonas.push(persona2);
let persona3:Persona = new Persona('Nombre3', 'Apellido3',37, 'DNI3', cumple3, 'color3','mujer', direccion3, mail3, telefono3,'' );
arrayPersonas.push(persona3);

/** Se recorre el array y se muestra por pantalla */
function imprimirArray():void {
for (let persona of arrayPersonas){
  persona.imprimirPersona();
}}
imprimirArray(); 

/** Búsqueda por DNI de una persona: */
function buscaDNI(busquedaDNI:string):any{
  for (let persona of arrayPersonas){
    if (busquedaDNI == persona.dni){
      return persona;
    }
  } 
  return null;
}

// pedimos al usuario el DNI a buscar
var prompt = require('prompt');
let inputDNI:string = '';
prompt.get(['DNI'], function(err:any,result:any){
    inputDNI = result.DNI

    /** MODIFICACIONES DE LA PERSONA ENCONTRADA POR DNI */
    let personaEncontrada:Persona = buscaDNI(inputDNI);
    if (personaEncontrada == null) {
    console.log('No existe esta persona en tu agenda, comprueba el DNI a buscar en el array imprimido arriba ⇈'); // Cuando no exista el dni introducido
    } else {
        // Se modifica la dirección:
        prompt.get([
            'Introduce_calle', 
            'Introduce_número',
            'Introduce_piso',
            'Introduce_letra',
            'Introduce_cp',
            'Introduce_localidad',
            'Introduce_provincia',
            'Introduce_tipo_mail',
            'Introduce_mail',
            'Introduce_tipo_teléfono',
            'Introduce_teléfono'
         ],function(err:any,result:any){
            // Se modifica la dirección:
            personaEncontrada.direccion = new Direccion (
                //↓↓ en caso de introducir un campo vacío no modifica el valor de esa propiedad:
                result.Introduce_calle?result.Introduce_calle:personaEncontrada.direccion.calle, 
                parseInt(result.Introduce_número?result.Introduce_número:personaEncontrada.direccion.numero), 
                parseInt(result.Introduce_piso?result.Introduce_piso:personaEncontrada.direccion.piso), 
                result.Introduce_letra?result.Introduce_letra:personaEncontrada.direccion.letra, 
                result.Introduce_cp?result.Introduce_cp:personaEncontrada.direccion.codigopostal, 
                result.Introduce_localidad?result.Introduce_localidad:personaEncontrada.direccion.poblacion, 
                result.Introduce_provincia?result.Introduce_provincia:personaEncontrada.direccion.provincia 
                );             
            // Se modifica el mail:
            personaEncontrada.mail = new Mail (
                result.Introduce_tipo_mail?result.Introduce_tipo_mail:personaEncontrada.mail.tipo,
                result.Introduce_mail?result.Introduce_mail:personaEncontrada.mail.direccion
            );
            
            // Se modifica el teléfono:
            personaEncontrada.telefono = new Telefono(
                result.Introduce_tipo_teléfono?result.Introduce_tipo_teléfono:personaEncontrada.telefono.tipo,
                parseInt(result.Introduce_teléfono?result.Introduce_teléfono:personaEncontrada.telefono.numero)
            );
            /** SE MUESTRA DE NUEVO TODO EL ARRAY */
            console.log(`Se ha modificado ${personaEncontrada.nombre} y el resultado del array completo es: `);
            imprimirArray();
         })
    }
})




