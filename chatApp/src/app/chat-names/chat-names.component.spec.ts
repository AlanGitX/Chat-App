import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNamesComponent } from './chat-names.component';

describe('ChatNamesComponent', () => {
  let component: ChatNamesComponent;
  let fixture: ComponentFixture<ChatNamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatNamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
