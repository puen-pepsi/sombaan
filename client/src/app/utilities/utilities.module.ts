import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_modules/shared.module';
import { DisplayErrorsComponent } from '../utilities/display-errors/display-errors.component';
import { GenericListComponent } from './generic-list/generic-list.component';
import { InputImgComponent } from './input-img/input-img.component';
import { InputMarkdownComponent } from './input-markdown/input-markdown.component';
import {MarkdownModule} from 'ngx-markdown';
import { MultipleSelectorComponent } from './multiple-selector/multiple-selector.component';
import { TagAutocompleteComponent } from './tag-autocomplete/tag-autocomplete.component';
import { InputMultiImgComponent } from './input-multi-img/input-multi-img.component';
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LabelNameComponent } from './label-name/label-name.component';
import { InputCommentComponent } from './input-comment/input-comment.component';
import { LabelMetaComponent } from './label-meta/label-meta.component';
import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component';
import { LikeButtonComponent } from './buttons/like-button/like-button.component';


@NgModule({
  declarations: [
    DisplayErrorsComponent,
    GenericListComponent,
    InputImgComponent,
    InputMarkdownComponent,
    MultipleSelectorComponent,
    TagAutocompleteComponent,
    InputMultiImgComponent,
    CkeditorComponent,
    LabelNameComponent,
    InputCommentComponent,
    LabelMetaComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
    LikeButtonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarkdownModule,
    CKEditorModule
  ],
  exports:[
    DisplayErrorsComponent,
    GenericListComponent,
    InputImgComponent,
    InputMarkdownComponent,
    MultipleSelectorComponent,
    TagAutocompleteComponent,
    InputMultiImgComponent,
    MarkdownModule,
    CKEditorModule,
    CkeditorComponent,
    LabelNameComponent,
    InputCommentComponent,
    LabelMetaComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
    LikeButtonComponent
  ]
})
export class UtilitiesModule { }
