import { UserService } from 'src/app/services/user.service';
import { ChallengesService } from './../../../services/challenges.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-user-response-challenge',
  templateUrl: './user-response-challenge.component.html',
  styleUrls: ['./user-response-challenge.component.scss'],
})
export class UserResponseChallengeComponent implements OnInit {

  id: string;
  loading = false;
  collectionResponses: any[] = [];
  messageTitle: string;
  messageSubtitle: string;
  user: User = JSON.parse(localStorage.getItem('user'));
  showMessageCoins: boolean = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private challengeService: ChallengesService,
    private userService: UserService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getUserResponse();
  }

  getUserResponse() {
    this.loading = true;
    this.quizService.getResponseByQuestionnaireId(this.id).subscribe(res => {
      this.loading = false;

      this.collectionResponses = [];

      this.messageSubtitle = '';

      res.forEach(element => {
        this.collectionResponses.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });

      if (this.collectionResponses.length === 1) {
        this.messageTitle = '¡Has finalizado!';
        this.messageSubtitle = 'Esperando a tu oponente';
      } else if (this.collectionResponses[0].totalPoints === this.collectionResponses[1].totalPoints) {
        this.messageTitle = '¡Habéis empatado!';
        this.challengeService.setWinner(this.id, 'null').then(() => { }, error => { });
      } else {
        if (this.collectionResponses[0].totalPoints > this.collectionResponses[1].totalPoints) {
          this.checkWinner(this.collectionResponses[0].nameUser);
        } else if (this.collectionResponses[1].totalPoints > this.collectionResponses[0].totalPoints) {
          this.checkWinner(this.collectionResponses[1].nameUser);
        }
      }

    }, error => {
      this.loading = false;
    });
  }

  checkWinner(nameUserWinner) {
    if (nameUserWinner === this.user.username) {
      this.messageTitle = '¡Has ganado!';
      this.updateCoins(this.user.id);
      this.showMessageCoins = true;
      this.challengeService.setWinner(this.id, this.user.username).then(() => { }, error => { });
    } else {
      this.messageTitle = '¡Has perdido!';

      this.userService.getUserByUsername(this.collectionResponses[1].nameUser).subscribe(user => {
        this.updateCoins(user[0].payload.doc.id);
      }, error => {});
      this.challengeService.setWinner(this.id, this.collectionResponses[1].nameUser).then(() => { }, error => { });
    }
  }

  updateCoins(id) {
    let totalCoins = this.user.coins + 10;
    this.userService.updateCoins(id, totalCoins).then(res => {
      this.user.coins = totalCoins;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }
}
