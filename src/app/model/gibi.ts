export class Gibi{

    Id!: number; 
    Titulo: string;
    Valor: number;
    DataPub: Date;


    constructor(){
        this.Titulo="";
        this.Valor=0;
        this.DataPub= new Date();
    }
}