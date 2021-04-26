import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BoardsService } from './boards.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BoardsService', () => {
  let service: BoardsService;
  let httpMock: HttpTestingController;

  const dummyBoard = [
    {id: 1, name: "string"},
    {id: 2, name: "string"}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [BoardsService]
    });
    service = TestBed.inject(BoardsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET HTTP request and return all data', () => {
    service.getBoards().subscribe(res => {
      expect(res).toEqual(dummyBoard);
    });
    const req = httpMock.expectOne('http://localhost:7070/boards2');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(dummyBoard);
    httpMock.verify();
  });

  it('should make a DELETE HTTP request with id appended to end of url', () => {
    service.deleteBoard(1).subscribe(res => {
      expect(res).toBe(1);
    });
    const req = httpMock.expectOne('http://localhost:7070/boards2/1', 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpMock.verify();
  });

  it('should make a PUT HTTP request with id appended to end of url and resource as body', () => {
    const updateObj = {id: 1, name: "updatedName"};
    service.updateBoard(1, updateObj).subscribe(res => {
      expect(updateObj.name).toBe('updatedName');
    });
    const req = httpMock.expectOne('http://localhost:7070/boards2/1', 'put to api');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(updateObj);
    httpMock.verify();
  });

  it('create should make a POST HTTP request with resource as body', () => {
    const createObj = {id: 3, name: "updatedName"};
    service.addBoard(createObj).subscribe(res => {
      expect(createObj.id).toBe(3);
      expect(createObj.name).toBe("updatedName");
    });
    const req = httpMock.expectOne('http://localhost:7070/boards2', 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(createObj);
    httpMock.verify();
  });
});
