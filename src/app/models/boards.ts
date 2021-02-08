export interface Boards {
    id: number,
    name: string,
    columns: [
        {
            id: number,
            colname: string,
            tasks: [
                {
                    id: number,
                    name: string
                }
            ]
        }
    ]
}