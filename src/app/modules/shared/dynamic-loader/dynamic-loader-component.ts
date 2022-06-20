import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, Output, SimpleChanges, Type, ViewChild } from '@angular/core';
import { TaskComponent } from '../../task/task.component';
import { ComponentItem, IDynamicComponent  } from './contracts/dynamic-component';
import { DynamicLoaderComponentsDictionary } from './contracts/dynamic-loader-component-dictionary';
import { ComponentHostDirective } from './directives/component-host.directive';

@Component({
  selector: 'app-dynamic-loader',
  template: `
      <div>
        <ng-template component-host></ng-template>
      </div>
    `
})
export class DynamicLoaderComponent implements OnInit, OnChanges {
  
  @Input() public componentKey: string;

  @Input() public id: number;
  @Input() public isReadOnly: boolean;
  // @Input() public translation: string;

  @Input() componentDictionary: ComponentItem[];

  public innerComponentInstance: IDynamicComponent;

  @ViewChild(ComponentHostDirective, { static: true })
  componentHostDirective: ComponentHostDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
     private dynamicComponentDictionary : DynamicLoaderComponentsDictionary) {
  }

  ngOnChanges(): void {
    if (!this.componentKey) return;

    this.AddComponent(this.componentKey);
  }

  ngOnInit(): void {
  }

  AddComponent(key: string) {
    let componentsDictionary = this.componentDictionary || this.dynamicComponentDictionary.getDynamicComponents();

    let DesiredComponent : ComponentItem = componentsDictionary.find(item => item.key == key) as ComponentItem;

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(DesiredComponent.component);
    this.componentHostDirective.viewContainerRef.clear();
    let viewContainerRef = this.componentHostDirective.viewContainerRef;
    let componentRef = viewContainerRef.createComponent(componentFactory);
    this.innerComponentInstance = componentRef.instance;

    this.innerComponentInstance.id = this.id;
    this.innerComponentInstance.isReadOnly = this.isReadOnly;
    // this.innerComponentInstance.translation = this.translation;
    
  }
}