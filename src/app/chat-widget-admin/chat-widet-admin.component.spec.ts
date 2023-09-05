import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWidetAdminComponent } from './chat-widet-admin.component';

describe('ChatWidetAdminComponent', () => {
  let component: ChatWidetAdminComponent;
  let fixture: ComponentFixture<ChatWidetAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatWidetAdminComponent]
    });
    fixture = TestBed.createComponent(ChatWidetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
