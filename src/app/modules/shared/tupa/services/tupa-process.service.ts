import { Injectable } from '@angular/core';
import { TupaItemIdEnum, TupaItemTabInterface } from '../interfaces/tupa-item-tab.interface';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TupaProcessService {
  private tabs = new BehaviorSubject<TupaItemTabInterface[]>([]);
  private isContinue = new BehaviorSubject<boolean>(false);
  private isFinished = new BehaviorSubject<boolean>(false);
  private isCancel = new BehaviorSubject<boolean>(false);

  constructor() {
    this.$getTabs().subscribe((data) => {
      const countIsComplete = data.filter((item) => item.isComplete && item.visibled).length;
      const countTabs = data.filter((item) => item.visibled).length;
      this.setIsContinue(countTabs === countIsComplete);
      console.log(data);
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

  public setIsContinue(value: boolean) {
    this.isContinue.next(value);
  }

  public getIsContinue() {
    return this.isContinue.getValue();
  }

  public $getIsContinue() {
    return this.isContinue.asObservable();
  }

  public setIsFinished(value: boolean) {
    this.isFinished.next(value);
  }

  public getIsFinished() {
    return this.isContinue.getValue();
  }

  public $getIsFinished() {
    return this.isContinue.asObservable();
  }

  public setIsCancel(value: boolean) {
    this.isCancel.next(value);
  }

  public getIsCancel() {
    return this.isCancel.getValue();
  }

  public $getIsCancel() {
    return this.isCancel.asObservable();
  }

  public get currentTabKey(): TupaItemIdEnum {
    const tab = this.getTabs().find((item) => item.active);
    return tab?.id || TupaItemIdEnum.PARTE_I;
  }
}
