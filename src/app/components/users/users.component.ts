import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
  miusers:User[] = [];
  currentPage:number = 0;
  maxPages:number = 0;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
 
    this.userService.getUsers().subscribe( (data:any ) => {
      this.miusers = data.data;
      this.currentPage=data.page;
     
    });
  }
 
   async deleteUser(pId:number|undefined): Promise<void> {

   if (pId !== undefined) {
 
 let text;
if (confirm(`¿Estas seguro de eliminar el usuario con id ${pId}?`) == true) {
  
  
  let response = await this.userService.delete(pId);

  if(response.id){
    alert('Usuario'+pId+' eliminado');
  }
    else{
      alert(response.error);
    }
  
  
} else {
  text = "se cancelo  eliminar el usuario";
  alert(text);
}
    

  }
  }

pagina(nPage:number=1){
  this.userService.getUsers(nPage).subscribe( (data:any ) => {
    this.miusers = data.data;
    this.currentPage=data.page;
    this.maxPages=data.total_pages;
    console.log(this.maxPages);
    console.log(this.currentPage);
  });
  
}

}
