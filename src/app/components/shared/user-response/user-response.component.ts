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

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
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

      console.log(this.questionnaireResponse);

    }, error => {
      this.loading = false;
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
