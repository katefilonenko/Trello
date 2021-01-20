import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardslistComponent } from './boardslist.component';

describe('BoardslistComponent', () => {
  let component: BoardslistComponent;
  let fixture: ComponentFixture<BoardslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
