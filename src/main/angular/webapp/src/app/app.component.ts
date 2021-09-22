import { Component } from '@angular/core';
import { LocalStorageManagerService } from '@services/local-storage-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( localStorageManagerService: LocalStorageManagerService ) {
    localStorageManagerService.initialiseStorageSyncListener();
  }
}
