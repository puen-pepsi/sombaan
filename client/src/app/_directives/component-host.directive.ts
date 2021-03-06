import { ComponentFactory, Directive, Input, ViewContainerRef } from "@angular/core";


@Directive({
    selector: '[componentHost]'
})

export class ComponentHostDirective {
    @Input() set componentHost(factory: ComponentF>) {
      if (factory) {
        console.log('Component factory:', factory.componentType);
        this.viewContainerRef.clear();
        this.viewContainerRef.createComponent(factory);
      } else {
        console.log('no component factory');
      }
    }
  
    constructor(public viewContainerRef: ViewContainerRef) {}
  }