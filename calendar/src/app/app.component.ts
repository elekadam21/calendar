import { Component, HostListener } from '@angular/core';
import { DeviceService } from './services/device.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar';
  
  constructor(
    private deviceService: DeviceService
    ) { }

  ngOnInit() {
    this.deviceService.screenWidth = window.innerWidth;
    this.deviceService.screenHeight = window.innerHeight;      
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.deviceService.screenWidth = window.innerWidth;
    this.deviceService.screenHeight = window.innerHeight;
  }
}
