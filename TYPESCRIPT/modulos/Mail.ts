export class Mail {
    private _tipo: string;
    private _direccion: string;
    constructor (a:string, b:string){
        this._tipo = a;
        this._direccion = b;
    }
    public get tipo():string {
        return this._tipo
    }
    public set tipo (value:string){
        this._tipo = value;
    }
    public get direccion():string {
        return this._direccion;
    }
    public set direccion(value:string){
        this._direccion = value;
    }
}