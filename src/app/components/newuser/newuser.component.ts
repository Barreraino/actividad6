import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/interfaces/user';


@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  userForm: FormGroup;
  word :string = 'NUEVO USUARIO';
  wordButton:string = 'GUARDAR';
  myUser : User | any;
  
  constructor(
    private router:Router,
    private userservice: UserService,
    private activatedRoute: ActivatedRoute) {

    this.userForm = new FormGroup({
      first_name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.required] ),
      last_name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.required]),
      username: new FormControl('',[Validators.required,Validators.minLength(3),Validators.required]),
      email: new FormControl('',[Validators.required,Validators.minLength(3),Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      image: new FormControl('',[Validators.required,Validators.pattern('^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$') ]),


    },[]);
  
}

ngOnInit(): void {

  this.activatedRoute.params.subscribe(async(params:any) => {
    let id :number = parseInt(params.id);
    if(id){
      
      this.word = 'EDITAR USUARIO';
      this.wordButton = 'ACTUALIZAR';
    let response = await this.userservice.getUserById(id);
    this.myUser = response;
    //console.log(this.myUser);
    
    this.userForm = new FormGroup({


     
      first_name: new FormControl(this.myUser?.first_name,[Validators.required,Validators.minLength(3),Validators.required] ),
      last_name: new FormControl(this.myUser?.last_name,[Validators.required,Validators.minLength(3),Validators.required]),
      username: new FormControl(this.myUser?.username,[Validators.required,Validators.minLength(3),Validators.required]),
      email: new FormControl(this.myUser?.email,[Validators.required,Validators.minLength(3),Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      image: new FormControl(this.myUser?.image,[Validators.required,Validators.pattern('^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$') ]),
       id: new FormControl(this.myUser?.id),

    },[]);



  }
  })
  
    }
    
  

  async getDataForm(): Promise<void> {
 let newUser= this.userForm.value;
 //console.log(newUser);
    
 
 if(newUser.id){
  let response = await this.userservice.update(newUser);
      if (response.id) {
    
    this.router.navigate(['/home']);
    alert('Usuario actualizado');
      }
      else{
        alert(response.error);
      }

}//end getDataForm



else 
{
  
  let newuser= this.userForm.value;
  let response = await this.userservice.addUser(newuser);

  if (response.id){

  this.router.navigate(['/home']);
  alert('Usuario creado correctamente');
  console.log(response);

  }

  else {
    alert('error');
  }}//end else
}
}
