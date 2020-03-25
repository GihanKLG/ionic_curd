import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentLoginPage } from './student-login.page';

describe('StudentLoginPage', () => {
  let component: StudentLoginPage;
  let fixture: ComponentFixture<StudentLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
