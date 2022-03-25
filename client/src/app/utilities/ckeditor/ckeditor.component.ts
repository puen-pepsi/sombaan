import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '../ckCustomBuild/build/ckeditor';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit {
  @ViewChild('editor') editorComponent:CKEditorComponent;
  @Output() editorChanges = new EventEmitter<string>();
  @Input()
  EditorData = '';
  baseApiUrl = environment.apiURL;

  public Editor = ClassicEditor;
  public config = {
      toolbar: [ 'undo', 'redo','|',
                'heading', '|',
                '|', 'outdent', 'indent', '|','alignment:left', 'alignment:center','alignment:right','blockQuote' ,
                'bold', 'italic','horizontalLine',
                '|','fontsize','fontFamily','fontColor', 'fontBackgroundColor',
                '|','imageUpload'],
                fontFamily: {
                  options: [
                      // 'default',
                      // 'Ubuntu, Arial, sans-serif',
                      // 'Ubuntu Mono, Courier New, Courier, monospace',
                      'default',
                      'Arial, Helvetica, sans-serif',
                      'Courier New, Courier, monospace',
                      'Georgia, serif',
                      'Lucida Sans Unicode, Lucida Grande, sans-serif',
                      'Tahoma, Geneva, sans-serif',
                      'Times New Roman, Times, serif',
                      'Trebuchet MS, Helvetica, sans-serif',
                      'Verdana, Geneva, sans-serif'
                  ]
                },
                 simpleUpload: {
                  // The URL that the images are uploaded to.
                  //uploadUrl: 'https://localhost:5001/api/Image',

                  uploadUrl: this.baseApiUrl + 'Image',
                  // Enable the XMLHttpRequest.withCredentials property.
                  // withCredentials: true,

                  // // Headers sent along with the XMLHttpRequest to the upload server.
                  // headers: {
                  //     'X-CSRF-TOKEN': 'CSRF-Token',
                  //     Authorization: 'Bearer <JSON Web Token>'
                  // }
                },
                image:{
                   // Configure the available styles.
                    styles: [
                        'alignLeft', 'alignCenter', 'alignRight'
                    ],

                    // Configure the available image resize options.
                    resizeOptions: [
                        {
                            name: 'resizeImage:original',
                            label: 'Original',
                            value: null
                        },
                        {
                            name: 'resizeImage:50',
                            label: '50%',
                            value: '50'
                        },
                        {
                            name: 'resizeImage:75',
                            label: '75%',
                            value: '75'
                        }
                    ],

                    // You need to configure the image toolbar, too, so it shows the new style
                    // buttons as well as the resize buttons.
                    toolbar: [
                        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                        '|',
                        'resizeImage',
                        '|',
                        'imageTextAlternative'
                    ]
                },
                indentBlock: {
                  offset: 1,
                  unit: 'em'
              },

      // This value must be kept in sync with the language defined in webpack.config.js.
      language: 'en',
      // style:['height:500px']


  };
  constructor() { }

  ngOnInit(): void {
  }
  public onChange() {
    // if(editor.getData() !== undefined){
    //   this.editorChanges.emit(editor.getData());
    // }
    // this.storyChapterService.formData.content = editor.getData();
    
    this.editorChanges.emit(this.editorComponent.editorInstance.getData());
  }
}
