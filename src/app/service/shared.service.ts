import { Injectable } from '@angular/core';
import { Employee } from '../department-list/department-list.component';

export class Department{

  constructor(
    public id:number,
    public name: string,
    public count: number,
    public totalSalary: number,
    public maxSalary: number,
    public employee:Employee[]){

  }
  
}


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // private dropDownMap: { [key: number]: string } = {};

  private sharedObject!: Department[];
  departmentArray: [number, string][] = [];

  setSharedObject(obj: Department[]) {
    this.sharedObject = obj;
  }

  getSharedObject() {
    return this.sharedObject;
  }

  public getDeptDropDown() {
    const myMap = new Map<number, string>();
    for (let shared of this.sharedObject) {
      myMap.set(shared.id, shared.name);
    }
    const keyValueArray: [number, string][] = Array.from(myMap);
    return keyValueArray;
  }

  
  constructor() { }


}
