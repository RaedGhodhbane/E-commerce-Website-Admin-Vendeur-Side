import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recoverpwd2',
  templateUrl: './recoverpwd2.component.html',
  styleUrls: ['./recoverpwd2.component.scss']
})
export class Recoverpwd2Component implements OnInit {

   // set the currenr year
   year: number = new Date().getFullYear();

   resetForm: FormGroup;
   submitted = false;
   error = '';
   success = '';
   loading = false;
   code ='';

   constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
   this.code = this.route.snapshot.queryParams['oobCode'];
    console.log(this.code);
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      cnfpassword: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.success = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    else{
      this.authenticationService.changePassword(this.code,this.resetForm.value.password).then((result) =>{
        this.position();
        this.router.navigate(['/account/login']);
      })
      .catch(error => {
        this.error = error
      })
    }
    
  }

  position() {
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'password changed successfully',
      showConfirmButton: false,
      timer: 2500
    });
  }

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }
}
