import { Type } from '@angular/core';

export interface IDynamicComponent {
    //--Inputs 
    id: number;
    isReadOnly: boolean;
    // translation: any;
    
    //--Outputs    

    //--Methods
    // onComponentChanges(): void;
    // getValue(): {type:string, typeID: number, trigger: string, typeIDDisplayname: string};
    // isValid(): boolean;
}

export class ComponentItem {
    constructor(public component: Type<IDynamicComponent>, public key:string) {}
}