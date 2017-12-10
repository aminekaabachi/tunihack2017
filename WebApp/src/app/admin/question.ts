

export class Question{
    num:number ;
    type:string;
    ques:string ;
    opt :any=[] ;
    optlabel:any=[] ;
    correction:any=[] ;
    correctiontype2:any ;
    juge:any=[] ;
    bareme:number ;
    note:any="" ;
    constructor (num:number,type:string,ques:string,opt:any=[],optlabel:any=[] , correction:any=[] ,correctiontype2:any="",bareme:number ,juge:any=[],note:any="" ) {
        this.num=num ;
        this.type=type ;
        this.ques=ques;
        this.opt=opt ;
        this.correction=correction ;
        this.correctiontype2=correctiontype2 ;
        this.bareme=bareme ;
        this.juge=juge ;
        this.note=note ;
    }
}
