import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GooglemapPage } from './googlemap.page';

describe('GooglemapPage', () => {
  let component: GooglemapPage;
  let fixture: ComponentFixture<GooglemapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglemapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GooglemapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
