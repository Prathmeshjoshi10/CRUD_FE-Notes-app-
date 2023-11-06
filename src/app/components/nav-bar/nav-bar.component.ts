import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  isUserLoggedIn = false;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.userService.isLoggedInUser();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  onLogOut() {
    this.userService.logout();
  }
}
