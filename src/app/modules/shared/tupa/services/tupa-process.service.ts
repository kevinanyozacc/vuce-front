import { inject, Injectable } from '@angular/core';
import { TupaItemIdEnum, TupaItemTabInterface } from '../interfaces/tupa-item-tab.interface';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { TupaProcessStatusEnum } from '../enum/tupa-process.enum';
import { BpmDeleteService } from 'src/app/core/bpm/services/bpm-delete.service';
import { BpmFinishedRequest, BpmFinishedService } from 'src/app/core/bpm/services/bpm-finished.service';
import { BpmProfileService } from 'src/app/core/bpm/services/bpm-profile.service';
import { BpmTaskInterface } from 'src/app/core/bpm/interfaces/bpm-task.interface';

@Injectable()
export class TupaProcessService {
  private tabs = new BehaviorSubject<TupaItemTabInterface[]>([]);
  private status = new BehaviorSubject<TupaProcessStatusEnum>(TupaProcessStatusEnum.PROCESS);
  private canAction = new BehaviorSubject<boolean>(false);
  public bpmTask!: BpmTaskInterface;
  private bpmDeleteService = inject(BpmDeleteService);
  private bpmFinishedService = inject(BpmFinishedService);
  public bpmProfileService = inject(BpmProfileService);

  constructor() {
    this.bpmProfileService.$getData().subscribe((data) => {
      if (!!data) this.bpmTask = data;
    });
    // listen tabs
    this.$getTabs().subscribe((data) => {
      const countComplete = data.filter((item) => item.isComplete);
      const countTotal = data.filter((item) => item.visibled);
      const isCanAction = countComplete >= countTotal;
      this.setCanAction(isCanAction);
    });
  }

  public getCurrentTab() {
    return this.getTabs().find((item) => item.active);
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

  public selectTab(item: TupaItemTabInterface) {
    if (item.disabled) {
      const prevIndex = this.getTabs().findIndex((i) => i.id === item.id) - 1;
      const prevTab = this.getTabs()[prevIndex];
      if (!prevTab) return;
      this.messageErrorSelectTab(prevTab);
    } else {
      item.active = true;
      item.disabled = false;
      item.visibled = true;
      const tmpTabs = this.getTabs().map((tab) => {
        if (tab.id === item.id) return item;
        tab.active = false;
        return tab;
      });
      this.setTabs(tmpTabs);
    }
  }

  public nextTab() {
    const nextIndex = this.getTabs().findIndex((item) => item.active) + 1;
    const nextTab = this.getTabs().find((_, index) => index == nextIndex);
    if (nextTab) this.selectTab(nextTab);
  }

  public isActiveCurrentTab(row: number) {
    const tab = this.findTab(row);
    if (!tab) return false;
    return this.currentTabKey === tab.id;
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

  public completeTab() {
    const currentIndex = this.getTabs().findIndex((item) => item.active);
    let currentTab = this.getTabs()[currentIndex];
    if (!currentTab) return;
    const tmpTabs = this.getTabs().map((item, index) => {
      if (currentIndex + 1 == index) {
        item.disabled = false;
        currentTab = item;
        return item;
      } else if (currentIndex < index) {
        item.disabled = !currentTab.isComplete;
        return item;
      } else {
        item.disabled = false;
        item.isComplete = true;
        return item;
      }
    });
    this.setTabs(tmpTabs);
  }

  public inCompleteTab() {
    const currentIndex = this.getTabs().findIndex((item) => item.active);
    const currentTab = this.getTabs()[currentIndex];
    if (!currentTab) return;
    const tmpTabs = this.getTabs().map((item, index) => {
      if (index === currentIndex) {
        item.isComplete = false;
        return item;
      } else if (currentIndex < index) {
        item.disabled = true;
        return item;
      } else {
        return item;
      }
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

  public bpmCancel() {
    return this.bpmDeleteService.api(this.bpmTask);
  }

  public bpmCancelLoading() {
    return this.bpmDeleteService.getLoading();
  }

  public bpmComplete(payload: BpmFinishedRequest) {
    return this.bpmFinishedService.api(this.bpmTask, payload);
  }

  public bpmCompleteLoading() {
    return this.bpmFinishedService.getLoading();
  }
}
