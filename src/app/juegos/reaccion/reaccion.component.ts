import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reaccion',
  templateUrl: './reaccion.component.html',
  styleUrls: ['./reaccion.component.css'],
})
export class ReaccionComponent implements OnInit {
  circles: Circle[] = [];
  timer = 0;
  score = 0;
  gameStarted = false;
  gameOver = false;

  ngOnInit() {
    this.timer = 0;
    this.score = 0;
    this.gameStarted = false;
    this.gameOver = false;
  }

  startGame() {
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
    this.timer = 0;
    this.spawnCircle();
    this.updateTimer();
  }

  spawnCircle() {
    const colors = ['green', 'red'];
    const sizes = ['small', 'medium', 'large'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    const circle: Circle = {
      color: randomColor,
      size: randomSize,
    };
    this.circles.push(circle);
    setTimeout(() => {
      this.circles.shift();
      if (this.gameStarted) {
        this.spawnCircle();
      }
    }, Math.random() * 3000 + 1000); // Random delay between 1-4 seconds
  }

  updateTimer() {
    if (this.gameStarted && !this.gameOver) {
      this.timer++;
      setTimeout(() => {
        this.updateTimer();
      }, 1000); // Update timer every second
    }
  }

  hitCircle(circle: Circle) {
    if (circle.color === 'green') {
      this.score++;
    } else if (circle.color === 'red') {
      this.timer += 5;
    }
  }

  gameOverHandler() {
    this.gameStarted = false;
    this.gameOver = true;
  }
}

interface Circle {
  color: string;
  size: string;
}
