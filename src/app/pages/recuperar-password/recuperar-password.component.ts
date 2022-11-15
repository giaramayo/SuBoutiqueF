import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogSnackbarComponent } from '../../component/dialog-snackbar/dialog-snackbar.component';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent {

  public logo: string;
  public formLogin: FormGroup;
  private home: string = "/inicio"
  public cargando: boolean;

  constructor(private loginService: LoginService,
    public _snackBar: MatSnackBar,
    private router: Router) {
    this.logo = 'assets/animacionLg.gif';
    this.cargando = false;

    this.formLogin = new FormGroup({
      usuario: new FormControl('', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'))
    });

  }

  enviarMail() {
    this.cargando = true;
    const usuario = this.formLogin.get('usuario')?.value;
    this.loginService.recuperar(usuario)
      .subscribe(resp => {
        // this.loginService.setToken(resp.data.token);
        // this.router.navigateByUrl(this.home);
      },
        err => {
          console.log(err)
          this._snackBar.openFromComponent(DialogSnackbarComponent, {
            data: { icono: 'report', mensaje: "No se encontró el usuario ingresado", titulo: 'Usuario Incorrecto' },
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "bottom",
            panelClass: ["snack-bar-war"]
          });
          this.cargando = false;
        },
        () => {
          this.cargando = false;
        })
  }

}
