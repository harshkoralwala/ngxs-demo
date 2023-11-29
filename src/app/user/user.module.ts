import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([UserState])],
  declarations: [UserComponent],
  exports: [UserComponent],
})
export class UserModule {}
