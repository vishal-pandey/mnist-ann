import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public mS:MainService) { }

  
  cell = []

  state = 0;

  digit = [];
  result = 0;
  loading = false;

  ngOnInit() {
  	this.reset()
  }


  reset(){
  	this.cell = []
	this.state = 0;
	this.digit = [];
	this.result = 0;
	for (var i = 0; i < 784; i++) {
  		this.cell.push(i)
  		this.digit.push(0)
  	}
  	for (var i = 0; i < window.document.getElementsByClassName('cell').length; i++) {
	  	// document.getElementsByClassName('cell')[i].style.backgroundColor = 'white';
  	}
  		
  	console.log('reset called');
  }

  draw(thecell, x){
  	console.log(thecell);
  }

  mdown(thecell, x){
  	this.state = 1
  }
  mup(thecell, x){
  	this.state = 0
  	console.log(this.digit);
  }
  
  mmove(thecell, x){
  	if (this.state) {
  		this.digit[x] = 1
  		// this.digit[x+1] = 0.4
  		// this.digit[x-1] = 0.4
  		// this.digit[x+28] = 0.4
  		// this.digit[x-28] = 0.4
  		thecell.style.backgroundColor='green'
  	}
  }
  mleave(){
  	this.state = 0;
  }

  check(){
  	this.loading = true;
  	this.mS.predict(this.digit).subscribe((r:any)=>{
  		this.result = r.op;
  		console.log(this.result);
  		this.loading = false;
  	})
  }

}
