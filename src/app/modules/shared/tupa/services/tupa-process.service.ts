import { Injectable } from '@angular/core';
import { TupaItemIdEnum, TupaItemTabInterface } from '../interfaces/tupa-item-tab.interface';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { TupaProcessStatusEnum } from '../enum/tupa-process.enum';

@Injectable()
export class TupaProcessService {
  private tabs = new BehaviorSubject<TupaItemTabInterface[]>([]);
  private status = new BehaviorSubject<TupaProcessStatusEnum>(TupaProcessStatusEnum.PROCESS);
  private canAction = new BehaviorSubject<boolean>(false);

  constructor() {
    this.$getTabs().subscribe((data) => {
      const countIsComplete = data.filter((item) => item.isComplete && item.visibled).length;
      const countTabs = data.filter((item) => item.visibled).length;
      this.setCanAction(countTabs === countIsComplete);
    });
  }

  public setTabs(value: TupaItemTabInterface[]) {
    this.tabs.next(value);
  }

  public getTabs() {
    return this.tabs.getValue();
  }

  public $getTabs() {
    return this.tabs.asObservable();
  }

  public findTab(row: number) {
    return this.getTabs().find((_, index) => index === row);
  }

  public currentTab() {
    return this.getTabs().find((item) => item.active);
  }

  public activeTab(currentTab: TupaItemTabInterface) {
    let tmpTabs = this.getTabs().map((item) => {
      item.active = false;
      return item;
    });
    // obtener index
    const currentIndex = tmpTabs.findIndex((item) => item.id === currentTab.id);
    // disabled tab
    tmpTabs = tmpTabs.map((item, index) => {
      if (currentIndex > index) {
        item.disabled = false;
        item.isComplete = true;
      } else if (currentIndex + 1 == index) {
        item.disabled = !currentTab.isComplete;
      } else if (currentIndex + 1 > index) {
        item.disabled = true;
      }
      return item;
    });
    // disabled active
    currentTab.active = true;
    currentTab.disabled = false;
    tmpTabs[currentIndex] = currentTab;
    this.setTabs(tmpTabs);
  }

  public isActiveCurrentTab(row: number) {
    const tab = this.findTab(row);
    if (!tab) return false;
    return this.currentTabKey === tab.id;
  }

  public enabledTab(currentTab: TupaItemTabInterface) {
    const tmpTabs = this.getTabs();
    const currentIndex = tmpTabs.findIndex((item) => item.id === currentTab.id);
    currentTab.visibled = true;
    currentTab.disabled = false;
    tmpTabs[currentIndex] = currentTab;
    this.setTabs(tmpTabs);
  }

  public disabledTab(currentTab: TupaItemTabInterface) {
    const tmpTabs = this.getTabs();
    const currentIndex = tmpTabs.findIndex((item) => item.id === currentTab.id);
    currentTab.isComplete = false;
    currentTab.disabled = true;
    tmpTabs[currentIndex] = currentTab;
    this.setTabs(tmpTabs);
  }

  public completeTab(currentTab: TupaItemTabInterface) {
    const tmpTabs = this.getTabs();
    const currentIndex = tmpTabs.findIndex((item) => item.id === currentTab.id);
    currentTab.isComplete = true;
    tmpTabs[currentIndex] = currentTab;
    this.setTabs(tmpTabs);
  }

  public inCompleteTab(currentTab: TupaItemTabInterface) {
    const tmpTabs = this.getTabs();
    const currentIndex = tmpTabs.findIndex((item) => item.id === currentTab.id);
    currentTab.isComplete = false;
    tmpTabs[currentIndex] = currentTab;
    this.setTabs(tmpTabs);
  }

  public hiddenTab(currentTab: TupaItemTabInterface) {
    const tmpTabs = this.getTabs();
    const currentIndex = tmpTabs.findIndex((item) => item.id === currentTab.id);
    currentTab.visibled = true;
    currentTab.disabled = true;
    tmpTabs[currentIndex] = currentTab;
    this.setTabs(tmpTabs);
  }

  public selectTab(item: TupaItemTabInterface) {
    if (item.disabled) {
      const prevIndex = this.getTabs().findIndex((i) => i.id === item.id) - 1;
      const prevTab = this.getTabs()[prevIndex];
      if (!prevTab) return;
      this.messageErrorSelectTab(prevTab);
    } else {
      this.activeTab(item);
    }
  }

  public activeAllTabs() {
    const tmpTabs = this.getTabs().map((item) => {
      item.visibled = true;
      item.isComplete = true;
      item.disabled = false;
      return item;
    });
    this.setTabs(tmpTabs);
  }

  public messageErrorSelectTab(tab: TupaItemTabInterface) {
    Swal.fire({
      icon: 'info',
      title: 'Aviso',
      html: `Falta completar el tab: <br /> <b>${tab.name}</b>`,
    });
  }

  public messageErrorNextTab() {
    Swal.fire({
      icon: 'warning',
      text: `No hay más opciones`,
    });
  }

  public setStatus(value: TupaProcessStatusEnum) {
    this.status.next(value);
  }

  public getStatus() {
    return this.status.getValue();
  }

  public $getStatus() {
    return this.status.asObservable();
  }

  public setCanAction(value: boolean) {
    this.canAction.next(value);
  }

  public getCanAction() {
    return this.canAction.getValue();
  }

  public $getCanAction() {
    return this.canAction.asObservable();
  }

  public get currentTabKey(): TupaItemIdEnum {
    const tab = this.getTabs().find((item) => item.active);
    return tab?.id || TupaItemIdEnum.PARTE_I;
  }
}
