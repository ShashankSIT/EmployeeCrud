import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return localStorage.getItem('Token') != null
  }
  ProceedLogin(data: any) {
    return this.http.post('http://localhost:5219/api/LoginApi/Login', data);
  }

  ForgotPassword(email: any) {
    const formData = new FormData();
    formData.append('emailId', email)
    return this.http.post('http://localhost:5219/api/LoginApi/ForgotPassword', formData);
  }

  SendOTP(email: any) {
    const formData = new FormData();
    formData.append('emailId', email)
    return this.http.post('http://localhost:5219/api/LoginApi/SendOTP', formData);
  }

  CheckOTP(id: any, OTP: any){
    const formData = new FormData();
    formData.append('Id', id)
    formData.append('Otp', OTP)
    return this.http.post('http://localhost:5219/api/UserApi/CheckOTP', formData);
  }

  ChangePassword(data: any, id: any) {
    const formData = new FormData();
    formData.append('password', data)
    formData.append('encryptedId', id)
    debugger
    return this.http.post('http://localhost:5219/api/LoginApi/ChangePassword', formData);
  }


  SignUp(data: any) {
    return this.http.post('http://localhost:5219/api/UserApi/AddUser', data);
  }
  twoFactorAuth(value: any, id: any) {
    const formData = new FormData();
    formData.append('id', id)
    formData.append('twoFactor', value)
    return this.http.post(`http://localhost:5219/api/UserApi/TwoFactorAuth`, formData)
  }
  async getUserById(data: any) {
    var res = await this.http.post(`http://localhost:5219/api/UserApi/GetUserByid/${data}`, data).toPromise();
    return res
  }
  async CityList() {
    var res = await this.http.get('http://localhost:5219/api/CityStateApi/GetCityList').toPromise();
    return res;
  }

  // CityList() {
  //   return this.http.get('http://localhost:5219/api/CityStateApi/GetCityList')
  // }

  async StateList() {
    try {
      const res: any = await this.http.get('http://localhost:5219/api/CityStateApi/GetStateList').toPromise();
      return res;
    } catch (error) {
      console.error('Error occurred while fetching state list:', error);
      throw error; // You can choose to throw the error or handle it as per your requirement
    }
  }

  // StateList() {
  //   return this.http.get('http://localhost:5219/api/CityStateApi/GetStateList')
  // }
  CityByState(data: any) {
    return this.http.get(`http://localhost:5219/api/CityStateApi/GetCityList?id=${data}`)
  }
  StateByCity(data: any) {
    return this.http.get(`http://localhost:5219/api/CityStateApi/GetStateByCity?id=${data}`)
  }
  // updateUser(data: any, file: any) {
  //   debugger
  //   return this.http.put(`http://localhost:5219/api/UserApi/update-user`, {data, file})
  // }
  updateUser(data: any, file?: any) {

    const formData = new FormData();
    debugger
    formData.append('UserRequestModel', data);
    formData.append('name', data.name);
    formData.append('mobile', data.mobile);
    formData.append('id', data.id);

    if (data.address && data.address.length > 0) {
      data.address.forEach((address: any, index: number) => {
        for (const key in address) {
          if (address.hasOwnProperty(key)) {
            formData.append(`address[${index}].${key}`, address[key]);
          }
        }
      });
    }
    if (file !== undefined) {
      formData.append('file', file);
    }
    return this.http.put(`http://localhost:5219/api/UserApi/update-user`, formData);
  }

}
