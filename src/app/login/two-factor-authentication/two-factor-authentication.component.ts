import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
  styleUrls: ['./two-factor-authentication.component.css']
})
export class TwoFactorAuthenticationComponent implements OnInit {
  responseData: any;
  Attempts : any;

  errorMessage = ''

  constructor(private router: Router, private service: UserService) {
    this.responseData = this.router.getCurrentNavigation()?.extras.state

    console.log("Data: ");
    console.log(this.responseData);
  }

  ngOnInit() {
    if (!localStorage.getItem('Attempts')) {
      localStorage.setItem('Attempts', '5')
    }
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
  }
  Login(data: any) {
    console.log(data.value);
    const otp = data.value.OTP1 + data.value.OTP2 + data.value.OTP3 + data.value.OTP4
    console.log(otp);

    if (data.valid) {
      this.service.CheckOTP(this.responseData.id, otp).subscribe((item: any) => {
        if (item.success) {
          localStorage.setItem('Token', this.responseData.jwtToken);
          localStorage.setItem('User', this.responseData.name);
          localStorage.setItem('UserEmail', this.responseData.emailId);
          localStorage.setItem('UserRole', this.responseData.roles);
          localStorage.setItem('UserId', this.responseData.id);
          this.router.navigate(['/dashboard'], { state: this.responseData })
        }
        else {
          const attemptsString = localStorage.getItem('Attempts');
          const Attempts = attemptsString ? parseInt(attemptsString, 10) : 0;

          this.Attempts = Attempts - 1
          localStorage.setItem('Attempts', this.Attempts)
          debugger
          if (Attempts != 1) {
            this.errorMessage = "Login Failed, " + this.Attempts + " Attempt(s) Remaining";
            this.shakeInputs();
            this.clearInputFields(data);
          }
          else {
            this.router.navigate(['/signIn'])
          }
        }
      })
    }

  }
  shakeInputs() {
    const inputElements = document.querySelectorAll('.otp-input');
    inputElements.forEach((inputElement: any) => {
      inputElement.classList.add('shake');
      setTimeout(() => {
        inputElement.classList.remove('shake');
      }, 500);
    });
  }

  clearInputFields(data: NgForm) {
    data.reset();
  }
  onKeyUp(event: any, index: number) {
    const inputElement = event.target;
    if (inputElement.value.length === inputElement.maxLength) {
      const nextInput = document.querySelector(`input[name="OTP${index + 1}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }



}
