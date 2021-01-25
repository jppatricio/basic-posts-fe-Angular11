import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeedComponent } from './feed/feed.component';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [SidebarComponent, FeedComponent, SettingsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent, FeedComponent, SettingsComponent
  ]
})
export class WidgetsModule { }
