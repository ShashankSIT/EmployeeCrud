import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  UserId: any;
  constructor(private route: ActivatedRoute, private service: UserService, private routing: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.UserId = params['id'];
    });


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
    if (data.valid) {
      const email = data.value.EmailId
      this.service.ForgotPassword(email).subscribe((item: any) => {
        if (item.success) {
          // this.routing.navigate(['/signIn'])
          alert('Reset Password Link Has Been Sent To Your Email')
        }
      })
    }
  }
}
