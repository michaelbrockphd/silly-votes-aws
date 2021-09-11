export interface IDispatchTarget {
    type: string;

    value: any;
}

export class DispatchTarget implements IDispatchTarget {
    type: string;

    value: any;

    constructor(t: string, v: any) {
        this.type = t;
        this.value = v;
    }
}
