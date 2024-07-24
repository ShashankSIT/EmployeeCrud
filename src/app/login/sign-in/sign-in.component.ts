import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private service: UserService, private route: Router) { }
  responseData: any;
  ngOnInit(): void {
    (function () {
      'use strict';
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          'submit',
          function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          },
          false
        );
      });
    })();
    localStorage.clear();
  }

  RedirectRegister() {
    this.route.navigate(['signUp']);
  }
  Login(data: any) {

    if (data.valid) {
      this.service.ProceedLogin(data.value).subscribe((item: any) => {
        this.responseData = item.data;
        if (this.responseData != null) {
          console.log(this.responseData);
          if (this.responseData.twoFactor) {
            this.service.SendOTP(this.responseData.emailId).subscribe((item : any)=>{
              console.log(item.otp);
              localStorage.setItem('otp', item.otp)
            })

            const navigationExtras: NavigationExtras = {
              state: {
                responseData: this.responseData
              }
            };
            this.route.navigate(['/verification'], { state: this.responseData });
          } else {
            localStorage.setItem('Token', this.responseData.jwtToken);
            localStorage.setItem('User', this.responseData.name);
            localStorage.setItem('UserEmail', this.responseData.emailId);
            localStorage.setItem('UserRole', this.responseData.roles);
            localStorage.setItem('UserId', this.responseData.id);
            this.route.navigate(['/dashboard'],  { state: this.responseData });
          }
        } else {
          alert('Login Failed');
        }
      });
    }
  }
}
