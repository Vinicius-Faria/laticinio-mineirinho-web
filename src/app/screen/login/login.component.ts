import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/LoginService';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Login } from '../entity/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login;
  success: Boolean = false;
  errors!: String[];
  loading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';

  constructor(    
    private serviceLogin: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { 
      this.login = new Login();
    }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: this.horizontalPosition,
      panelClass: 'panelClass'
    });
  }

  onSubmit() {

    if (this.login.login) {
    this.loading = true;
    this.serviceLogin.verifica(this.login).subscribe(
      success => {
        if (success) {
          this.loading = false;
          this.router.navigate(['/master/painel']);
        } else {
          this.openSnackBar('Login ou Senha incorretos','OK');
          this.loading = false;
        }
      },
    );
    }
  }

}

