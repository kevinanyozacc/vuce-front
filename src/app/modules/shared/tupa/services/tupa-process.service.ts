import { Injectable } from '@angular/core';
import { TupaItemIdEnum, TupaItemTabInterface } from '../interfaces/tupa-item-tab.interface';
import Swal from 'sweetalert2';

@Injectable()
export class TupaProcessService {
  private tabs: TupaItemTabInterface[] = [];
  private canSave: boolean = false;
  // private establishment?: EstablishmentEntityInterface;
  // private technical?: PersonEntityInterface;
  // private detail!: DetalleCreateInterface;
  // private productType!: ProductTypeEnum;
  // private products: ProductCuarentenaEntityInterface[] = [];

  public setTabs(value: TupaItemTabInterface[]) {
    this.tabs = value;
  }

  public getTabs() {
    return this.tabs;
  }

  public findTab(row: number) {
    return this.tabs.find((_, index) => index === row);
  }

  public isActiveCurrentTab(row: number) {
    const tab = this.findTab(row);
    if (!tab) return false;
    return this.currentTabKey === tab.id;
  }

  public activeTab(currentTab: TupaItemTabInterface) {
    this.tabs = this.tabs.map((tab) => {
      if (tab.id === currentTab.id) {
        tab.active = true;
        tab.visibled = true;
        tab.disabled = false;
        return tab;
      } else {
        tab.active = false;
        return tab;
      }
    });
  }

  public enabledTab(currentTab: TupaItemTabInterface) {
    this.tabs = this.tabs.map((tab) => {
      if (tab.id === currentTab.id) {
        tab.visibled = true;
        tab.disabled = false;
      }
      return tab;
    });
  }

  public disabledTab(currentTab: TupaItemTabInterface) {
    this.tabs = this.tabs.map((tab) => {
      if (tab.id === currentTab.id) {
        tab.disabled = true;
      }
      return tab;
    });
  }

  public hiddenTab(currentTab: TupaItemTabInterface) {
    this.tabs = this.tabs.map((tab) => {
      if (tab.id === currentTab.id) {
        tab.visibled = false;
        tab.disabled = true;
      }
      return tab;
    });
  }

  public selectTab(item: TupaItemTabInterface) {
    if (item.disabled) {
      const prevIndex = this.tabs.findIndex((i) => i.id === item.id) - 1;
      const prevTab = this.tabs[prevIndex];
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

  public setCanSave(value: boolean) {
    this.canSave = value;
  }

  public getCanSave() {
    return this.canSave;
  }

  public get currentTab(): TupaItemTabInterface | undefined {
    return this.tabs.find((item) => item.active);
  }

  public get currentTabKey(): TupaItemIdEnum {
    const tab = this.tabs.find((item) => item.active);
    return tab?.id || TupaItemIdEnum.PARTE_I;
  }
}
