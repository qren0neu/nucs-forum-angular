import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-all-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatTable,
    MatHeaderCell,
    MatHeaderRow,
    MatCellDef,
    MatRowDef,
    MatCell,
    MatCell,
    MatTable,
    MatHeaderCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderCellDef,
    MatHeaderCellDef,
    MatHeaderCellDef,
    MatRow,
    AsyncPipe
  ],
  templateUrl: './all-page.component.html',
  styleUrl: './all-page.component.css'
})
export class AllPageComponent implements OnInit {
  all: any[] = [];
  user: any; // Adjust based on how you manage user authentication and data
  displayedColumns: string[] = ['first', 'last', 'email', 'school', 'campus', 'company', 'action'];

  constructor(private userService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkUser();
    this.loadAllUsers();
  }

  checkUser() {
    // You need to implement user check based on your authentication logic
    this.user = { username: 'admin' }; // Placeholder for user data
  }

  loadAllUsers() {
    if (this.user && this.user.username === 'admin') {
      this.userService.getAllUsers().subscribe({
        next: (data) => this.all = data,
        error: (err) => console.error(err)
      });
    }
  }

  editUser(username: string) {
    window.location.assign(`/account/adminEdit?username=${username}`);
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
