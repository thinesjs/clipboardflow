import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ClipboardModalPage } from './clipboard-modal.page';

describe('ClipboardModalPage', () => {
  let component: ClipboardModalPage;
  let fixture: ComponentFixture<ClipboardModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClipboardModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
