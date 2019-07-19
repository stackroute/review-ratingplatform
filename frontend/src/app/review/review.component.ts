import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';
import { Router ,ActivatedRoute} from '@angular/router';
import{ LandingpageService }from '../landingpage.service';
import { Writereview } from '../writereview';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: any;
  products: [];
  writereview:Writereview=new Writereview();
  review:any;
  constructor(private reviewService:ReviewService,private router:Router,private landingservice:LandingpageService,private activatedRoute:ActivatedRoute) { 
    // this.reviews=[];
   }
   productDetails: [];
  // constructor(private reviewService:ReviewService,private router:Router,private landingservice:LandingpageService) { 
  //   this.reviews=[];
  
 

  ngOnInit() {
    console.log(" Data on review page :",JSON.parse(sessionStorage.getItem('data')))
   
    this.landingservice.getAllProducts().subscribe((data:any)=>{
      console.log(data);
      this.productDetails=data;
    })

    this.reviewService.getAllReviews().subscribe((data:any) => {
      console.log(data);
      this.reviews=data;
    })

  }
  
  onSubmit(reviewTitle,reviewDesc){
    let date;
    date=sessionStorage.getItem('uploadedOn');

    this.writereview.reviewTitle=reviewTitle;
    this.writereview.reviewDescription=reviewDesc;
    this.writereview.productName=JSON.parse(sessionStorage.getItem('data')).productName;
    this.writereview.price=JSON.parse(sessionStorage.getItem('data')).price;
    // this.writereview.reviewedOn=JSON.parse(sessionStorage.getItem('data')).uploadedOn;
    this.writereview.reviewerEmail=sessionStorage.getItem('reviewerEmail');
    this.reviewService.addReview(this.writereview).
      subscribe(data=>{
        console.log("data stored successfully");
      });

    this.router.navigateByUrl("/reviewerdash");
  } 

}
