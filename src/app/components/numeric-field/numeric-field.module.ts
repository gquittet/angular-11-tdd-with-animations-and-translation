import { NgModule } from '@angular/core';
import { NumericFieldService } from '../../services/numeric-field.service';
import { NumericFieldComponent } from './numeric-field.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [NumericFieldComponent],
  providers: [NumericFieldService],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  exports: [NumericFieldComponent],
})
export class NumericFieldModule {}
