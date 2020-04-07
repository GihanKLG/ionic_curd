import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClustermapPage } from './clustermap.page';

describe('ClustermapPage', () => {
  let component: ClustermapPage;
  let fixture: ComponentFixture<ClustermapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClustermapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClustermapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
