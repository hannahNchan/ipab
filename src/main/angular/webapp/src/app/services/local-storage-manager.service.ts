import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

/**
 * Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows:
 * https://www.ebenmonney.com/sharing-sessionstorage-data-across-browser-tabs/
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageManagerService {

  static readonly DBKEY_USER_DATA = 'user_data';

  private static syncListenerInitialised = false;
  private static readonly DBKEY_SYNC_KEYS = 'sync_keys';
  private syncKeys: string[] = [];
  private initEvent$ = new Subject();

  private reservedKeys: string[] =
    [
      'sync_keys',
      'addToSyncKeys',
      'removeFromSyncKeys',
      'getSessionStorage',
      'setSessionStorage',
      'addToSessionStorage',
      'removeFromSessionStorage',
      'clearAllSessionsStorage'
    ];

  initialiseStorageSyncListener(): void {
    if (LocalStorageManagerService.syncListenerInitialised === true) {
      return;
    }

    LocalStorageManagerService.syncListenerInitialised = true;
    window.addEventListener('storage', this.sessionStorageTransferHandler, false);
    this.syncSessionStorage();
  }

  deinitialiseStorageSyncListener(): void {
    window.removeEventListener('storage', this.sessionStorageTransferHandler, false);
    LocalStorageManagerService.syncListenerInitialised = false;
  }

  clearAllStorage(): void {
    this.clearAllSessionsStorage();
    this.clearLocalStorage();
  }

  clearAllSessionsStorage(): void {
    this.clearInstanceSessionStorage();
    localStorage.removeItem(LocalStorageManagerService.DBKEY_SYNC_KEYS);

    localStorage.setItem('clearAllSessionsStorage', '_dummy');
    localStorage.removeItem('clearAllSessionsStorage');
  }

  clearInstanceSessionStorage(): void {
    sessionStorage.clear();
    this.syncKeys = [];
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  saveSessionData(data: any, key: string = LocalStorageManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    this.removeFromSyncKeys(key);
    localStorage.removeItem(key);
    this.sessionStorageSetItem(key, data);
  }

  saveSyncedSessionData(data: any, key: string = LocalStorageManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    localStorage.removeItem(key);
    this.addToSessionStorage(data, key);
  }

  savePermanentData(data: any, key: string = LocalStorageManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    this.localStorageSetItem(key, data);
  }

  moveDataToSessionStorage(key: string = LocalStorageManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    const data = this.getData(key);

    if (data === null) {
      return;
    }

    this.saveSessionData(data, key);
  }

  moveDataToSyncedSessionStorage(key: string = LocalStorageManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    const data = this.getData(key);

    if (data === null) {
      return;
    }

    this.saveSyncedSessionData(data, key);
  }

  moveDataToPermanentStorage(key: string = LocalStorageManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    const data = this.getData(key);

    if (data === null) {
      return;
    }

    this.savePermanentData(data, key);
  }

  exists(key: string = LocalStorageManagerService.DBKEY_USER_DATA): boolean {
    let data = sessionStorage.getItem(key);

    if (data === null) {
      data = localStorage.getItem(key);
    }

    return data !== null;
  }

  getData(key: string = LocalStorageManagerService.DBKEY_USER_DATA): any {
    this.testForInvalidKeys(key);

    let data = this.sessionStorageGetItem(key);

    if (data === null) {
      data = this.localStorageGetItem(key);
    }

    return data;
  }

  getDataObject<T>(key: string = LocalStorageManagerService.DBKEY_USER_DATA, isDateType: boolean = false): T {
    let data = this.getData(key);

    if (data !== null) {
      if (isDateType) {
        data = new Date(data);
      }
      return <T>data;
    }
    return null;
  }

  deleteData(key: string = LocalStorageManagerService.DBKEY_USER_DATA): void {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    localStorage.removeItem(key);
  }

  getInitEvent(): Observable<{}> {
    return this.initEvent$.asObservable();
  }

  private sessionStorageTransferHandler = (event: StorageEvent) => {
    if (!event.newValue) {
      return;
    }

    if (event.key === 'getSessionStorage') {
      if (sessionStorage.length) {
        this.localStorageSetItem('setSessionStorage', sessionStorage);
        localStorage.removeItem('setSessionStorage');
      }
    } else if (event.key === 'setSessionStorage') {

      if (!this.syncKeys.length) {
        this.loadSyncKeys();
      }
      const data = JSON.parse(event.newValue);
      console.info('Set => Key: Transfer setSessionStorage,  data: ', data);

      for (const key in data) {
        if (this.syncKeysContains(key)) {
          this.sessionStorageSetItem(key, JSON.parse(data[key]));
        }
      }
      this.onInit();
    } else if (event.key === 'addToSessionStorage') {

      const data = JSON.parse(event.newValue);

      // console.warn("Set => Key: Transfer addToSessionStorage" + ",  data: " + JSON.stringify(data));

      this.addToSessionStorageHelper(data.data, data.key);
    } else if (event.key === 'removeFromSessionStorage') {

      this.removeFromSessionStorageHelper(event.newValue);
    } else if (event.key === 'clearAllSessionsStorage' && sessionStorage.length) {
      this.clearInstanceSessionStorage();
    } else if (event.key === 'addToSyncKeys') {
      this.addToSyncKeysHelper(event.newValue);
    } else if (event.key === 'removeFromSyncKeys') {
      this.removeFromSyncKeysHelper(event.newValue);
    }
  }

  private syncSessionStorage(): void {
    localStorage.setItem('getSessionStorage', '_dummy');
    localStorage.removeItem('getSessionStorage');
  }

  private addToSessionStorage(data: any, key: string): void {
    this.addToSessionStorageHelper(data, key);
    this.addToSyncKeysBackup(key);

    this.localStorageSetItem('addToSessionStorage', { key, data });
    localStorage.removeItem('addToSessionStorage');
  }

  private addToSessionStorageHelper(data: any, key: string): void {
    this.addToSyncKeysHelper(key);
    this.localStorageSetItem(key, data)
  }

  private removeFromSessionStorage(keyToRemove: string): void {
    this.removeFromSessionStorageHelper(keyToRemove);
    this.removeFromSyncKeysBackup(keyToRemove);

    localStorage.setItem('removeFromSessionStorage', keyToRemove);
    localStorage.removeItem('removeFromSessionStorage');
  }

  private removeFromSessionStorageHelper(keyToRemove: string): void {

    sessionStorage.removeItem(keyToRemove);
    this.removeFromSyncKeysHelper(keyToRemove);
  }

  private testForInvalidKeys(key: string): void {
    if (!key) {
      throw new Error('key cannot be empty');
    }

    if (this.reservedKeys.some(x => x === key)) {
      throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
    }
  }

  private syncKeysContains(key: string): boolean {

    return this.syncKeys.some(x => x === key);
  }

  private loadSyncKeys(): void {
    if (this.syncKeys.length) {
      return;
    }

    this.syncKeys = this.getSyncKeysFromStorage();
    console.info('result of loadSyncKeys: ', this.syncKeys);
  }

  private getSyncKeysFromStorage(defaultValue: string[] = []): string[] {
    const data = this.localStorageGetItem(LocalStorageManagerService.DBKEY_SYNC_KEYS);

    if (data === null) {
      return defaultValue;
    }
    return <string[]>data;

  }

  private addToSyncKeys(key: string): void {
    this.addToSyncKeysHelper(key);
    this.addToSyncKeysBackup(key);

    localStorage.setItem('addToSyncKeys', key);
    localStorage.removeItem('addToSyncKeys');
  }

  private addToSyncKeysBackup(key: string): void {
    const storedSyncKeys = this.getSyncKeysFromStorage();

    if (!storedSyncKeys.some(x => x === key)) {
      storedSyncKeys.push(key);
      this.localStorageSetItem(LocalStorageManagerService.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }

  private removeFromSyncKeysBackup(key: string): void {
    const storedSyncKeys = this.getSyncKeysFromStorage();

    const index = storedSyncKeys.indexOf(key);

    if (index > -1) {
      storedSyncKeys.splice(index, 1);
      this.localStorageSetItem(LocalStorageManagerService.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }

  private addToSyncKeysHelper(key: string): void {
    if (!this.syncKeysContains(key)) {
      this.syncKeys.push(key);
    }
  }

  private removeFromSyncKeys(key: string): void {
    this.removeFromSyncKeysHelper(key);
    this.removeFromSyncKeysBackup(key);

    localStorage.setItem('removeFromSyncKeys', key);
    localStorage.removeItem('removeFromSyncKeys');
  }

  private removeFromSyncKeysHelper(key: string): void {
    const index = this.syncKeys.indexOf(key);

    if (index > -1) {
      this.syncKeys.splice(index, 1);
    }
  }

  private localStorageSetItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private sessionStorageSetItem(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  private localStorageGetItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  private sessionStorageGetItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  private onInit(): void {
    setTimeout(() => {
      this.initEvent$.next();
      this.initEvent$.complete();
    });
  }
}
