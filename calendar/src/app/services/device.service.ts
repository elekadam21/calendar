import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class DeviceService {
    private _screenWidth: number = 0;
    public get screenWidth(): number {
        return this._screenWidth;
    }
    public set screenWidth(value: number) {
        this._screenWidth = value;
    }
    private _screenHeight: number = 0;
    public get screenHeight(): number {
        return this._screenHeight;
    }
    public set screenHeight(value: number) {
        this._screenHeight = value;
    }
    
  }