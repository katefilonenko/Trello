export interface Boards {
    id: number,
    name: string,
    columns: [
        {
            id: number,
            name: string,
            tasks: [
                {
                    id: number,
                    name: string
                }
            ]
        }
    ]
}