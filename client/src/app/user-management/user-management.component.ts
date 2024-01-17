import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

interface User {
  _id?: string,
  username: string,
  email: string,
  password?: string,
  active?: boolean,
};

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  users: any[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selectUser(user: User | null = null) {
    if (user) this.selectedUser = { ...user };
    else this.selectedUser = { username: '', email: '', password: '' };
  }

  createUser(user: User) {
    this.userService.createUser(user).subscribe(
      (newUser) => {
        this.users.push(newUser);
        this.selectedUser = null;
      },
      (error) => console.error(error)
    );
  }

  updateUser(user: User) {
    if (this.selectedUser && this.selectedUser._id) {
      this.userService.updateUser(this.selectedUser._id, {
        username: user.username,
        email: user.email,
      }).subscribe(
        (updatedUser) => {
          const index = this.users.findIndex(u => u._id === updatedUser._id);
          this.users[index] = updatedUser;
          this.selectedUser = null;
        },
        (error) => console.error(error)
      );
    }
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter(user => user._id !== userId);
        },
        (error) => console.error(error)
      );
    }
  }
}
