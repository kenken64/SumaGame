import { Component, OnInit } from "@angular/core";
import { EventData } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { setInterval, clearInterval } from "tns-core-modules/timer";
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    arr = [7, 0, -4, 5, 2, 3];
    public result = "";
    public answer: number = 5;
    public answerArr = [];
    public answerInput = [];
    
    public counter: number = 120;
    public id: number;

    constructor() {
        //
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.shuffleArray(this.arr);
        console.log(this.arr);
        this.checkTwoSuma();
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
    }
    
}
