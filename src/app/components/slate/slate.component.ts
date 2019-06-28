import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-slate',
  templateUrl: './slate.component.html',
  styleUrls: ['./slate.component.css']
})
export class SlateComponent implements AfterViewInit {

  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;
  // width = 28;
  // height = 28;

  width = 56;
  height = 56;
  result = 0;

  checking:boolean = false;

  constructor(public mS:MainService) { }

  public check(m){
  	let x = this.cx.getImageData(0,0,this.height,this.width).data;
  	let y = [];
  	let z = [];
  	
  	// console.log(x);
  	let counter = 0;
  	for (var i = 3; i < this.height*this.width*4; i+=4) {
  		y.push(x[i])
  		counter += 1;
  		if (counter == this.width) {
  			counter = 0;
  			z.push(y)
  			y = []
  		}
  	}
  	console.log(z)
  	let limit = this.width * this.height;
  	counter = 0
  	// for(var i = 0; i < this.width; i+=1){
  	// 	for(var j = 0; j < this.height; j=+1){
  	// 		console.log(z[i])
  	// 		// y.push(z[i][j])
  	// 		counter +=1;
  	// 		if (counter > limit) {
  	// 			break;
  	// 			// return;
  	// 		}
  	// 	}
  	// }

  	for(var i=0; i<this.width; i+=2){
			for(var j=0; j<this.height; j+=2){
				// console.log(z[i][j])
				y.push((z[i][j]+z[i+1][j]+z[i][j+1]+z[i+1][j+1])/(255*4))
	    }
		}
  	// console.log(y.toString())


  	// for (var i = 3; i < this.height*this.width*4; i+=((this.width/28)*4)) {
  	// 	console.log(i);
  	// 	y.push(x[i]/256);
  	// }
  	let image = "["+y.toString()+"]";
  	console.log(image);

  	if (m == "ann") {	
  		this.checking = true;
	  	this.mS.predict(image).subscribe((r:any)=>{
	  		this.result = r.op;
	  		this.checking = false;
	  	})
  	}
  	if (m == "dtc") {
  		this.checking = true;
  		this.mS.predictDTC(image).subscribe((r:any)=>{
	  		this.result = r.op;
	  		this.checking = false;
	  	})
  	}



		// console.log(y);

	}

	reset(){
		this.cx.clearRect(0,0,this.width,this.height)
		this.checking = false;
		this.result = 0;
	}


  ngAfterViewInit() {
  	const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');
  	canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    this.captureEvents(canvasEl);
  }


  private captureEvents(canvasEl: HTMLCanvasElement) {
	  // this will capture all mousedown events from the canvas element
	  fromEvent(canvasEl, 'mousedown')
	    .pipe(
	      switchMap((e) => {
	        // after a mouse down, we'll record all mouse moves
	        return fromEvent(canvasEl, 'mousemove')
	          .pipe(
	            // we'll stop (and unsubscribe) once the user releases the mouse
	            // this will trigger a 'mouseup' event    
	            takeUntil(fromEvent(canvasEl, 'mouseup')),
	            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
	            takeUntil(fromEvent(canvasEl, 'mouseleave')),
	            // pairwise lets us get the previous value to draw a line from
	            // the previous point to the current point    
	            pairwise()
	          )
	      })
	    )
	    .subscribe((res: [MouseEvent, MouseEvent]) => {
	      const rect = canvasEl.getBoundingClientRect();

	      // previous and current position with the offset
	      const prevPos = {
	        x: res[0].clientX - rect.left,
	        y: res[0].clientY - rect.top
	      };

	      const currentPos = {
	        x: res[1].clientX - rect.left,
	        y: res[1].clientY - rect.top
	      };

	      // this method we'll implement soon to do the actual drawing
	      this.drawOnCanvas(prevPos, currentPos);
	    });
	}

	private drawOnCanvas(
	  prevPos: { x: number, y: number }, 
	  currentPos: { x: number, y: number }
	) {
	  // incase the context is not set
	  if (!this.cx) { return; }

	  // start our drawing path
	  this.cx.beginPath();

	  // we're drawing lines so we need a previous position
	  if (prevPos) {
	    // sets the start point
	    this.cx.moveTo(prevPos.x, prevPos.y); // from

	    // draws a line from the start pos until the current position
	    this.cx.lineTo(currentPos.x, currentPos.y);

	    // strokes the current path with the styles we set earlier
	    this.cx.stroke();
	  }
	}

	


}
