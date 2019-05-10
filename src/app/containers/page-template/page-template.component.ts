import { Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { AuthenticationService } from '../../authentication.service';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.css']
})

export class PageTemplateComponent implements OnInit {

  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public authService: AuthenticationService;
  public socketService: SocketService;

  constructor(authService: AuthenticationService, socketService: SocketService) {

    this.authService = authService;
    this.socketService = socketService;

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit(): void {
     this.socketService.initClient();
  }

}

