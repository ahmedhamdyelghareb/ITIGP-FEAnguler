import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/1790/500`);
  images = ['../../../assets/cover1.png', '../../../assets/cover2.png', '../../../assets/cover3.png','../../../assets/cover4.png']
// images
  constructor(/*private product :ProductService*/) { }

  ngOnInit() {
      // this.product.getAllProducts().subscribe(res=>{
      //   this.images=res
      //   // this.images = this.images[Math.floor(Math.random() * this.images.length)];
      //   this.images=this.getRandom(this.images,3)
      //   console.log(this.images)
      // })
  }

//   getRandom(arr, n) {
//     var result = new Array(n),
//         len = arr.length,
//         taken = new Array(len);
//     if (n > len)
//         throw new RangeError("getRandom: more elements taken than available");
//     while (n--) {
//         var x = Math.floor(Math.random() * len);
//         result[n] = arr[x in taken ? taken[x] : x];
//         taken[x] = --len in taken ? taken[len] : len;
//     }
//     return result;
// }

}
