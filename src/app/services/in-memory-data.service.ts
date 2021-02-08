import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb(){
    const boards = [
      {
        id: 1,
        name: 'Test Board',
        columns: [
          {
            id: 1,
            name: 'Ideas',
            tasks: [
              {
                id: 1,
                name: 'Some random idea'
              },
              {
                id: 2,
                name: 'This is another random idea'
              },{
                id: 3,
                name: 'build an awesome application'
              },
            ]
          },
          {
            id: 2,
            name: 'Research',
            tasks: [
              {
                id: 1,
                name: 'Lorem ipsum'
              },
              {
                id: 2,
                name: 'foo'
              },{
                id: 3,
                name: 'This was in the Research column'
              },
            ]
          },
          {
            id: 3,
            name: 'Todo',
            tasks: [
              {
                id: 1,
                name: 'Get to work'
              },
              {
                id: 2,
                name: 'Pick up groceries'
              },{
                id: 3,
                name: 'Go home'
              },
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Second Board',
        columns: [
          {
            id: 1,
            name: 'To Do',
            tasks: [
              {
                id: 1,
                name: 'Some random idea'
              },
              {
                id: 2,
                name: 'This is another random idea'
              },{
                id: 3,
                name: 'build an awesome application'
              },
            ]
          },
          {
            id: 2,
            name: 'In Pr',
            tasks: [
              {
                id: 1,
                name: 'Lorem ipsum'
              },
              {
                id: 2,
                name: 'foo'
              },{
                id: 3,
                name: 'This was in the Research column'
              },
            ]
          },
          {
            id: 3,
            name: 'Done',
            tasks: [
              {
                id: 1,
                name: 'Get to work'
              },
              {
                id: 2,
                name: 'Pick up groceries'
              },{
                id: 3,
                name: 'Go home'
              },
            ]
          }
        ]
      }
    ];
    return {boards};
  }
}


// {  
//   "id": 4,
//   "name": "Board",
//       "columns": [
//         {
//           "id": 1,
//           "name": "Ideas",
//           "tasks": [
//             {
//               "id": 1,
//               "name": "Some random idea"
//             },
//             {
//               "id": 2,
//               "name": "This is another random idea"
//             },{
//               "id": 3,
//               "name": "build an awesome application"
//             }
//           ]
//         },
//         {
//           "id": 2,
//           "name": "Research",
//           "tasks": [
//             {
//               "id": 1,
//               "name": "Lorem ipsum"
//             },
//             {
//               "id": 2,
//               "name": "foo"
//             },{
//               "id": 3,
//               "name": "This was in the Research column"
//             }
//           ]
//         }
// }]