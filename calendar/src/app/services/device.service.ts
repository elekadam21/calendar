import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class DeviceService {
    screenWidth: number = 0;
    screenHeight: number = 0;
  }