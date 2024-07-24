import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Service/user.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  ngOnInit(): void {

    this.getUserData();
    this.States();
    this.Cities();
    this.addEmptyAddressFormGroup();
    this.ProfileToggle = 1;
    this.UserName = localStorage.getItem('User');
    this.UserRole = localStorage.getItem('UserRole');
  }

  constructor(private service: UserService, private formBuilder: FormBuilder) { }

  ProfileToggle: any;
  UserData: any;
  CityList: any[] = [];
  CityList2: any[] = [];
  StateList: any[] = [];
  UserName: any;
  UserRole: any;
  formValue: any;
  haveAddress: any;
  inputDisable = true;
  editImage = false;
  ProfilePic = 'User.jpg'
  updatedPic: any;
  CityName2: any;
  ImageChanged = false;
  selectedImageSrc: any
  

  @ViewChild('imageInput') imageInput: any;

  selectImage(): void {
    this.imageInput.nativeElement.click();
  }


  onImageSelected(event: Event): void {
    debugger
    const inputElement = event.target as HTMLInputElement;
    const file: File = (inputElement.files as FileList)[0];
    this.ProfilePic = file.name
    this.updatedPic = file
    this.ImageChanged = true
    this.selectedImageSrc = URL.createObjectURL(file);
  }

  reactiveFormGroup: any = this.formBuilder.group({
    id: [''],
    name: [{ value: '', disabled: this.inputDisable }, Validators.required],
    emailId: [{ value: '', disabled: this.inputDisable }, [Validators.email, Validators.required]],
    mobile: [{ value: '', disabled: this.inputDisable }, Validators.required],
    roles: [{ value: '', disabled: this.inputDisable }, Validators.required],
    address: this.formBuilder.array([])
  });

  createAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      Id: [''],
      Address: [{ value: '', disabled: this.inputDisable }, Validators.required],
      City: [{ value: '', disabled: this.inputDisable }, Validators.required],
      State: [{ value: '', disabled: this.inputDisable }, Validators.required],
      Country: [{ value: '', disabled: this.inputDisable }, Validators.required],
      Postal: [{ value: '', disabled: this.inputDisable }, Validators.required],
      IsDeleted: ['']
    });
  }

  getAddressesControls(): any {
    const address = this.reactiveFormGroup.get('address') as FormArray;
    return address.controls;
  }

  addRow() {
    const addressFormGroup = new FormGroup({
      address: new FormControl(''),
      state: new FormControl(7),
      city: new FormControl(),
      postal: new FormControl('')
    });
    (this.reactiveFormGroup.get('address') as FormArray).push(addressFormGroup);
  }

  removeAddress(index: number): void {
    if (confirm("Are You Sure You Want To Remove This Field")) {

      const addressesFormArray = this.reactiveFormGroup.get('address') as FormArray;
      const addressFormGroup = addressesFormArray.at(index) as FormGroup;

      if (!addressFormGroup.contains('isDeleted')) {
        addressFormGroup.addControl('isDeleted', new FormControl(true));
      } else {
        addressFormGroup.patchValue({ isDeleted: true });
      }
    }
  }

  getAddressValue(index: number, controlName: string): boolean {
    const addressesFormArray = this.reactiveFormGroup.get('address') as FormArray;
    const addressFormGroup = addressesFormArray.at(index) as FormGroup;
    const x = addressFormGroup.get(controlName)?.value;
    return x
  }

  SaveDetials() {
    if (this.reactiveFormGroup.valid) {
      this.formValue = this.reactiveFormGroup.value
      this.service.updateUser(this.formValue, this.updatedPic).subscribe((item: any) => {
        this.getUserData()
        this.toggle(1)
      })
    }
  }

  async getUserData() {
    try {
      const item: any = await this.service.getUserById(localStorage.getItem('UserId'));
      this.UserData = item.data;
      if (this.UserData.address.length > 0) {
        this.haveAddress = true
      }
      else {
        this.haveAddress = false
      }
      if (this.UserData.image) {
        this.ProfilePic = this.UserData.image;
        this.ImageChanged = false;  
        console.log(this.ProfilePic);
        
      }
      this.reactiveFormGroup.patchValue({
        id: this.UserData.id,
        name: this.UserData.name,
        emailId: this.UserData.emailId,
        mobile: this.UserData.mobile,
        roles: this.UserData.roles
      });
      const addressArray = this.reactiveFormGroup.get('address') as FormArray;

      addressArray.clear();

      if (this.UserData.address.length > 0) {
        this.UserData.address.forEach((address: any) => {
          const addressFormGroup = this.formBuilder.group({
            address: [{ value: address.address, disabled: this.inputDisable }, Validators.required],
            state: [{ value: address.state, disabled: this.inputDisable }, Validators.required],
            city: [{ value: address.city, disabled: this.inputDisable }, Validators.required],
            postal: [{ value: address.postal, disabled: this.inputDisable }, Validators.required],
            isDeleted: [address.isDeleted],
            id: [address.id]
          });
          addressArray.push(addressFormGroup);
        });
      } else {
        this.addEmptyAddressFormGroup();
      }
    } catch (error) {
      console.error('Error occurred while fetching user data:', error);
    }
  }
  addEmptyAddressFormGroup(): any {
    const addressFormGroup = this.formBuilder.group({
      address: [{ value: '', disabled: this.inputDisable }, Validators.required],
      state: [{ value: '', disabled: this.inputDisable }, Validators.required],
      city: [{ value: '', disabled: this.inputDisable }, Validators.required],
      postal: [{ value: '', disabled: this.inputDisable }, Validators.required],
      isDeleted: [false],
      id: ['']
    });
    const addressArray = this.reactiveFormGroup.get('address') as FormArray;
    addressArray.push(addressFormGroup);
  }


  async States() {
    try {
      const item: any = await this.service.StateList();
      this.StateList = item.data;
    } catch (error) {
      console.error('Error occurred while fetching states:', error);
    }
  }


  async Cities() {
    await this.service.CityList().then((item: any) => {
      this.CityList = item.data
      this.CityName()
    })
  }

  SelectedState(event: any, i: any) {
    this.service.CityByState(event.target.value).subscribe((item: any) => {
      this.CityList2[i] = item.data
    })
  }

  filterCities(index: number): any[] {
    const selectedStateId = this.reactiveFormGroup.get('address').get(`${index}`).get('state').value;
    return selectedStateId
  }

  CityName(): void {
    if (this.CityList.length > 0 && this.StateList.length > 0) {
      const city = this.CityList.find(city => city.cityId === this.UserData.address[0].city);
      const state = this.StateList.find(state => state.stateId === this.UserData.address[0].state);
      this.CityName2 = city.cityName + ', ' + state.stateName;
    }
  }

  toggle(data: any) {
    this.ProfileToggle = data;

    if (this.ProfileToggle === 1) {
      this.inputDisable = true;
      this.editImage = false

    } else if (this.ProfileToggle === 2) {
      this.inputDisable = false;
      this.editImage = false;
    }
    if (this.ProfileToggle === 3) {
      this.editImage = true
      this.inputDisable = false;
    }

    const formControls: any = this.reactiveFormGroup.controls;
    for (const controlName in formControls) {
      if (controlName != 'emailId' && controlName != 'roles') {
        const control = formControls[controlName];
        if (this.inputDisable) {
          control.disable();
        } else {
          control.enable();
        }
      }
    }
    const addresses = this.reactiveFormGroup.get('address') as FormArray;
    if (this.inputDisable) {
      addresses.disable();
    } else {
      addresses.enable();
    }
  }
}
