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
import { ChipListComponent } from './chip-list/chip-list.component';
import { LayoutComponent } from './layout/layout.component';
import { BtnexpandComponent } from './buttons/btnexpand/btnexpand.component';
import { MultipleSelectorGroupComponent } from './multiple-selector-group/multiple-selector-group.component';
import { MultipleSelectorDropdownComponent } from './multiple-selector-dropdown/multiple-selector-dropdown.component';
import { FavoriteIconComponent } from './buttons/favorite-icon/favorite-icon.component';
import { SearchSelectComponent } from './search-select/search-select.component';
import { SelectorDropdownComponent } from './selector-dropdown/selector-dropdown.component';
import { SingleSelectorComponent } from './single-selector/single-selector.component';
import { RatingComponent } from './rating/rating.component';
import { SelectOptionComponent } from './select-option/select-option.component';
// import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

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
    ChipListComponent,
    LayoutComponent,
    BtnexpandComponent,
    MultipleSelectorGroupComponent,
    MultipleSelectorDropdownComponent,
    FavoriteIconComponent,
    SearchSelectComponent,
    SelectorDropdownComponent,
    SingleSelectorComponent,
    RatingComponent,
    SelectOptionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarkdownModule,
    CKEditorModule,
    // SweetAlert2Module
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
    LikeButtonComponent,
    ChipListComponent,
    LayoutComponent,
    BtnexpandComponent,
    MultipleSelectorGroupComponent,
    MultipleSelectorDropdownComponent,
    FavoriteIconComponent,
    SearchSelectComponent,
    SelectorDropdownComponent,
    SingleSelectorComponent,
    RatingComponent,
    SelectOptionComponent

    // SweetAlert2Module
  ]
})
export class UtilitiesModule { }
