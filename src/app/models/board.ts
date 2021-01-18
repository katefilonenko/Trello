  
import { Column } from './columns';

export class Board {
    constructor(public name: string, public columns: Column[]) {}
}