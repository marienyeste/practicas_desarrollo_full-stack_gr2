import {Direccion} from './Direccion';
import {Telefono} from './Telefono';
import {Mail} from './Mail';
export class Persona {
    private _nombre: string;
    private _apellidos: string;
    private _edad: number;
    private _dni: string;
    private _cumple: Date;
    private _colorFavorito: string;
    private _sexo: string;
    private _direccion: Direccion;
    private _mail: Mail;
    private _telefono: Telefono;
    private _notas: string;
    constructor (a:string , b:string , c:number , d:string , e:Date , f:string , g:string , h:Direccion , i:Mail , j:Telefono , k:string ){
        this._nombre = a;
        this._apellidos = b;
        this._edad = c;
        this._dni = d;
        this._cumple = e;
        this._colorFavorito = f;
        this._sexo = g;
        this._direccion = h;
        this._mail = i;
        this._telefono = j;
        this._notas = k;
    }
    public get nombre():string {
        return this._nombre;
    }
    public set nombre(value:string){
        this._nombre = value;
    }
    public get apellidos():string {
        return this._apellidos;
    }
    public set apellidos(value:string){
        this._apellidos = value;
    }
    public get edad():number {
        return this._edad;
    }
    public set edad(value:number){
        this._edad = value;
    }
    public get dni():string {
        return this._dni;
    }
    public set dni(value:string){
        this._dni = value;
    }
    public get cumple():Date {
        return this._cumple;
    }
    public set cumple(value:Date){
        this._cumple = value;
    }
    public get colorFavorito():string {
        return this._colorFavorito;
    }
    public set colorFavorito(value:string){
        this._colorFavorito = value;
    }
    public get sexo():string {
        return this._sexo;
    }
    public set sexo(value:string){
        this._sexo = value;
    }
    public get direccion():Direccion {
        return this._direccion;
    }
    public set direccion(value:Direccion){
        this._direccion = value;
    }
    public get mail():Mail {
        return this._mail;
    }
    public set mail(value:Mail){
        this._mail = value;
    }
    public get telefono():Telefono {
        return this._telefono;
    }
    public set telefono(value:Telefono){
        this._telefono = value;
    }
    public get notas():string {
        return this._notas;
    }
    public set notas(value:string){
        this._notas = value;
    }
    public imprimirPersona(){
        console.log(this);
    }
}
