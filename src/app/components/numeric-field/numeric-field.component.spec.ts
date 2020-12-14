import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { NumericFieldService } from '../../services/numeric-field.service';
import { NumericFieldComponent } from './numeric-field.component';
import { NumericFieldModule } from './numeric-field.module';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('NumericFieldComponent', () => {
  let component: NumericFieldComponent;
  let fixture: ComponentFixture<NumericFieldComponent>;
  let dom: any;
  let getRandomNumberSpy: any;
  const testNumber = 4;

  const writeValueInInput = async (
    value: string
  ): Promise<HTMLInputElement> => {
    fixture.detectChanges();
    await fixture.whenStable();

    const input: HTMLInputElement = dom.querySelector('input');

    input.value = value;
    // Important, n'oublie pas Guillaume de déclencher l'évènement après avoir modifié la valeur.
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    return input;
  };

  beforeEach(async () => {
    const numericFieldService = jasmine.createSpyObj('NumericFieldService', [
      'getRandomNumber',
    ]);
    getRandomNumberSpy = numericFieldService.getRandomNumber.and.returnValue(
      of(testNumber)
    );

    await TestBed.configureTestingModule({
      imports: [
        NumericFieldModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({
          fr: require('../../../assets/i18n/fr.json'),
          en: require('../../../assets/i18n/en.json'),
        }),
      ],
      providers: [
        { provide: NumericFieldService, useValue: numericFieldService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericFieldComponent);
    dom = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  describe('dom', () => {
    describe('input', () => {
      it('should exist', () => {
        const input = dom.querySelector('input');
        expect(input).not.toBeUndefined();
      });

      it('should have an empty value at start', () => {
        const input = dom.querySelector('input');
        expect(input).not.toBeUndefined();
      });

      it('should have a number value after init', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        const input = dom.querySelector('input');
        expect(input.value).toBe('4');
      }));

      it(`should be called 'numericField'`, async () => {
        fixture.detectChanges();
        const input = dom.querySelector('input');
        expect(input.name).toBe('numericField');
      });

      it(`should be have an id of 'numericField'`, async () => {
        fixture.detectChanges();
        const input = dom.querySelector('input');
        expect(input.id).toBe('numericField');
      });

      it('should be required', async () => {
        fixture.detectChanges();
        const input = dom.querySelector('input');
        expect(input.required).toBe(true);
      });

      it('should only accept numbers', () => {
        fixture.detectChanges();
        const input = dom.querySelector('input');
        expect(input.pattern).toBe('[0-9]+');
      });

      it('should not show an error when the text is a number ', async () => {
        await writeValueInInput('4');

        const errorMessage: HTMLDivElement = dom.querySelector(
          'div.alert.alert-danger > div'
        );
        expect(errorMessage).toBeNull();
      });

      describe('validation', () => {
        it('should show required error when field is empty', async () => {
          await writeValueInInput('');

          const errorMessage: HTMLDivElement = dom.querySelector(
            'div.alert.alert-danger > div'
          );
          expect(errorMessage).not.toBeNull();
        });

        it('should show an error when content is not a number', async () => {
          await writeValueInInput('0nf');

          const errorMessage: HTMLDivElement = dom.querySelector(
            'div.alert.alert-danger > div'
          );
          expect(errorMessage).not.toBeNull();
        });
      });
    });
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('randomNumber', () => {
      it('should have a random number to null', () => {
        expect(component.randomNumber).toBeNull();
      });

      it('should change the randomNumber value on init', () => {
        fixture.detectChanges();
        expect(component.randomNumber).toBe(4);
      });
    });
  });

  describe('i18n', () => {
    describe('fr', () => {
      it('Frère tu dois mettre un nombre 😡', async () => {
        const translate = TestBed.inject(TranslateService);
        translate.use('fr');
        await writeValueInInput('');

        const errorMessage: HTMLDivElement = dom.querySelector(
          'div.alert.alert-danger > div'
        );

        expect(errorMessage?.innerText).toBe(
          'Frère tu dois mettre un nombre 😡'
        );
      });

      it("T'es con ou quoi j'ai dit un nombre 🤬", async () => {
        const translate = TestBed.inject(TranslateService);
        translate.use('fr');
        await writeValueInInput('0nf');

        const errorMessage: HTMLDivElement = dom.querySelector(
          'div.alert.alert-danger > div'
        );

        expect(errorMessage?.innerText).toBe(
          "T'es con ou quoi j'ai dit un nombre 🤬"
        );
      });
    });

    describe('en', () => {
      it('Frère tu dois mettre un nombre 😡', async () => {
        const translate = TestBed.inject(TranslateService);
        translate.use('en');
        await writeValueInInput('');

        const errorMessage: HTMLDivElement = dom.querySelector(
          'div.alert.alert-danger > div'
        );

        expect(errorMessage?.innerText).toBe(
          'Bro, you have to enter a number 😡'
        );
      });

      it("T'es con ou quoi j'ai dit un nombre 🤬", async () => {
        const translate = TestBed.inject(TranslateService);
        translate.use('en');
        await writeValueInInput('0nf');

        const errorMessage: HTMLDivElement = dom.querySelector(
          'div.alert.alert-danger > div'
        );

        expect(errorMessage?.innerText).toBe(
          "You're stupid! I said a NUMBER 🤬"
        );
      });
    });
  });
});
