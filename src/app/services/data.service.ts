import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private storageService: StorageService) {
    this.loadData();
  }

  private loadData(): void {
    const data = this.storageService.load('myDataKey');
    this.dataSubject.next(data);
  }

  public getData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  public updateData(newData: any): void {
    this.storageService.save('myDataKey', newData);
    this.dataSubject.next(newData);
  }
}
