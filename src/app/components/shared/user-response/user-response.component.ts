import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { PAGES } from '../../../globalValues';
@Component({
  selector: 'app-user-response',
  templateUrl: './user-response.component.html',
  styleUrls: ['./user-response.component.scss'],
})
export class UserResponseComponent implements OnInit {

  id: string;
  loading = false;
  questionnaireResponse: any;
  user = JSON.parse(localStorage.getItem('user'));
  showMessageCoins: boolean = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getUserResponse();
  }

  getUserResponse() {
    this.loading = true;
    this.quizService.getUserResponse(this.id).subscribe(res => {
      this.loading = false;

      this.questionnaireResponse = res.data();

      if (this.questionnaireResponse.corrects > this.questionnaireResponse.incorrects) {
        this.showMessageCoins = true;
        this.updateCoins();
      }

    }, error => {
      this.loading = false;
    });
  }

  updateCoins() {
    let totalCoins = this.user.coins + 3;
    this.userService.updateCoins(this.user.id, totalCoins).then(() => {
      this.user.coins = totalCoins;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  back() {
    PAGES.forEach(page => {
      if (page.isSelected) {
        this.router.navigate([page.page]);
      }
    });
  }

}
