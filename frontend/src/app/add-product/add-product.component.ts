import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }


lpage()
 {
   this.router.navigateByUrl("/");
 }
update()
 {
   this.router.navigateByUrl("/prodownerupdateprofile");
 }
 account()
 {
   this.router.navigateByUrl("/productownerdashboard")
 }
add()
{
 
}
 
}