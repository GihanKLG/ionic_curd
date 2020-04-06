import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoogleheatmapPage } from './googleheatmap.page';

describe('GoogleheatmapPage', () => {
  let component: GoogleheatmapPage;
  let fixture: ComponentFixture<GoogleheatmapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleheatmapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleheatmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
