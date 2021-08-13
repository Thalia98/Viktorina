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

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private challengeService: ChallengesService,
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
      } else if (this.collectionResponses[0].totalPoints > this.collectionResponses[1].totalPoints) {
        if (this.collectionResponses[0].nameUser === this.user.username) {
          this.messageTitle = '¡Has ganado!';
          this.challengeService.setWinner(this.id, this.user.username).then(() => { }, error => { });
        } else {
          this.messageTitle = '¡Has perdido!';
          this.challengeService.setWinner(this.id, this.collectionResponses[1].nameUser).then(() => { }, error => { });
        }
      }

    }, error => {
      this.loading = false;
    });
  }
}
