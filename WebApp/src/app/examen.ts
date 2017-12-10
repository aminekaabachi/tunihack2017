export class Examen{
    id:any ; 
    titre:string ; 
    description:string ; 
    duree:any ;
    note:any ; 
    constructor(id:any ,titre:string,description:string,duree:any,note:any=0) {
        this.id=id ;
        this.titre=titre ; 
        this.description=description ; 
        this.duree=duree ; 
        this.note=note ;
    }
}