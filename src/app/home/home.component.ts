import { Component, OnInit } from "@angular/core";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { setInterval, clearInterval } from "tns-core-modules/timer";
import { Progress } from "tns-core-modules/ui/progress";
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public arr = [];
    public result = "";
    public describe: string = "? + ? = "
    public answer: number = 0;
    public answerArr = [];
    public answerInput = [];
    
    public counter: number = 120;
    public id: number;

    constructor() {
        //
    }

    randomGenerateArray(){
        let randomNum =  Math.floor(Math.random() * Math.floor(10));
        this.answer = randomNum;
        console.log(this.answer);
        for(let x=0; x < 6; x++){
            let yy =  Math.floor(Math.random() * Math.floor(10));
            console.log(this.arr.indexOf(yy))
            if(this.arr.indexOf(yy) < 0){
                this.arr.push(yy);
            }
            
        }
        this.checkTwoSuma();
    }

    againRestartGame(){
        this.randomGenerateArray();
        this.shuffleArray(this.arr);
    }

    ngOnInit(): void {
        this.againRestartGame();
        console.log(">>>>>" + this.arr);
        if(this.arr.length != 6){
            this.arr = [];
            this.againRestartGame();
        }
        this.result = "STARTED"
        this.id = setInterval(() => {
            this.counter--;
            if(this.counter == 0){
                console.log("freeze buttons!");
                clearInterval(this.id);
                this.result = "GAME OVER!";
            }
        }, this.counter);
    }

    onTap(args: EventData) {
        let button = <Button>args.object;
        console.log(button.text);
            
        if(this.answerInput.length < 2){
            this.answerInput.push(+button.text)
        }else{
            console.log(this.answerInput);
            this.answerArr.forEach((result)=>{
                return this.answerInput.join() === result.join();
            })
        }
        console.log("btn" + button);
    }

    onEnd(args: EventData) {
        console.log(this.answerInput);
        let isOk = false;
        this.answerArr.forEach((result)=>{
            if(this.answerInput.join() === result.join()){
                isOk= true;
            }
        })

        if(isOk){
            this.result = "CORRECT!";
            clearInterval(this.id);
        }else{
            this.result = "WRONG!";
            this.answerInput = [];
        }
    }


    restartGame(){
        this.result = "STARTED";
        this.answerInput = [];
        this.answerArr = [];
        this.randomGenerateArray();
        this.shuffleArray(this.arr);
        console.log(this.arr);
        this.counter = 120;
        this.id = setInterval(() => {
            this.counter--;
            if(this.counter == 0){
                console.log("freeze buttons!");
                clearInterval(this.id);
                this.result = "GAME OVER!";
            }
        }, this.counter);
    }

    onRetry(args: EventData) {
        console.log(this.answerInput);
        this.restartGame();
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    binarySearch(sortedArr, diff){
        let min = 0,
        max = sortedArr.length - 1,
        guess;

        while (min <= max) {
            guess = Math.floor((min + max) / 2);

            if (sortedArr[guess] === diff) {
            return guess;
            } else {
            if (sortedArr[guess] < diff) {
                min = guess + 1;
            } else {
                max = guess - 1;
            }
            }
        }
        return false;
    }

    // O(n log n) time
    checkTwoSuma(){
        let sortedArr = this.arr.sort();
        
        for (let i=0; i<sortedArr.length; i++) {
            let diff = this.answer - sortedArr[i],
                binaryIndex = this.binarySearch(sortedArr, diff);
            if (binaryIndex) {
                this.answerArr.push([sortedArr[i], sortedArr[binaryIndex]]);
            }
        }
        console.log(this.answerArr);
        if(this.answerArr.length == 0){
           this.randomGenerateArray(); 
        }
    }

    onValueChanged(args) {
        let progressBar = <Progress>args.object;

        console.log("Value changed for " + progressBar);
        console.log("New value: " + progressBar.value);
    }
    
}
