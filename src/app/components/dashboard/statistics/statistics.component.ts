import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {

  id: string;
  loading: boolean = false;
  collectionUserResponse: any[] = [];
  responseQuestionnaire: Subscription = new Subscription();
  bestQuestion: string;
  mostFailedQuestion: string;
  incorrects: number = 0;
  corrects: number = 0;
  updateFlag: boolean = false;
  updateFlagColumn: boolean = false;
  chart: any;
  chartCallback: any;
  chartColumn: any;
  chartCallbackColumn: any;

  MONTH_NAMES_SHORT = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  MONTH_NAMES_LONG = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  collectionData: any[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      zoomType: "x",
    },
    title: {
      text: 'Gráfica de media de puntuación'
    },
    xAxis: {
      type: 'datetime',
      crosshair: {
        width: 8
      }
    },
    yAxis: {
      title: {
        text: 'Total'
      },
      allowDecimals: false
    },
    series: [{
      data: [],
      type: 'line',
    }],
    credits: {
      text: 'Viktorina'
    }
  };

  chartOptionsColumn: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total correctas e incorrectas'
    },
    xAxis: {
      crosshair: {
        width: 8
      },
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Total'
      },
      allowDecimals: false
    },
    series: [
      {
        data: [],
        type: 'column',
        color: 'green',
        name: 'Correctas',
      },
      {
        data: [],
        type: 'column',
        color: 'red',
        name: 'Incorrectas',
      }

    ],
    credits: {
      text: 'Viktorina'
    }
  };

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    this.chartCallback = chart => {
      this.chart = chart;
    };

    this.chartCallbackColumn = chart => {
      this.chartColumn = chart;
    };
  }
  ngOnDestroy(): void {
    this.responseQuestionnaire.unsubscribe();
  }

  ngOnInit() {
    this.getResponseByQuestionnaireId();
  }

  ionViewWillLeave() {
    this.responseQuestionnaire.unsubscribe();
  }

  getResponseByQuestionnaireId() {
    this.loading = true;
    this.responseQuestionnaire = this.quizService.getResponseByQuestionnaireId(this.id).subscribe(res => {
      this.loading = false;
      this.collectionUserResponse = [];

      res.forEach(item => {
        this.collectionUserResponse.push({
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        });
      });

      if (res.length > 0) {
        this.getMostFailedQuestion();
        this.getBestQuestion();
        this.getAllCorrectsAndIncorrects();
      }

    }, error => {
      this.loading = false;
    });
  }

  getMostFailedQuestion() {
    const count = [];
    let lastIndex = 0;

    this.collectionUserResponse.forEach(question => {
      question.collectionIncorrects.forEach(questionIncorrect => {

        let index = count.findIndex(x => x.nameQuestion === questionIncorrect);
        if (index !== -1) {
          count[index].number += 1;
          return
        } else {
          count[lastIndex] = { nameQuestion: questionIncorrect, number: 1 };
          lastIndex++;
        }
      });
    });

    this.mostFailedQuestion = this.sortQuestions(count)[0] ? this.sortQuestions(count)[0].nameQuestion : 'No se ha fallado ninguna';
  }

  getBestQuestion() {
    const count = [];
    let lastIndex = 0;

    this.collectionUserResponse.forEach(question => {
      question.collectionCorrects.forEach(questionCorrect => {

        let index = count.findIndex(x => x.nameQuestion === questionCorrect);
        if (index !== -1) {
          count[index].number += 1;
          return
        } else {
          count[lastIndex] = { nameQuestion: questionCorrect, number: 1 };
          lastIndex++;
        }
      });
    });

    this.bestQuestion = this.sortQuestions(count)[0] ? this.sortQuestions(count)[0].nameQuestion.question : 'No se ha acertado ninguna';
  }

  sortQuestions(questionCollection) {
    questionCollection = questionCollection.sort(function (a, b) {
      if (a.number < b.number) {
        return 1;
      }
      if (a.number > b.number) {
        return -1;
      }
      return 0;
    });

    return questionCollection;
  }

  getAllCorrectsAndIncorrects() {
    this.collectionUserResponse.forEach(question => {
      let totalPoints = 0;

      question.collectionCorrects.forEach(questionPoints => {
        totalPoints += questionPoints.points;
      });

      console.log(totalPoints);

      let totalMedium = totalPoints / (question.collectionAnswerUser.length - 1);

      let date = new Date(question.date.toDate());

      let dateParse = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

      this.collectionData.push({ x: dateParse, y: Math.round(totalMedium * 100) / 100 });
      this.incorrects += question.incorrects;
      this.corrects += question.corrects;
    });



    this.updateChart();
    this.updateChartColumn();
  }

  updateChart() {
    console.log(this.collectionData);
    this.collectionData = this.collectionData.sort((n1, n2) => n1.x - n2.x);

    this.chart.showLoading();
    setTimeout(() => {
      this.chart.hideLoading();

      Highcharts.setOptions({
        lang: {
          loading: 'Cargando...',
          months: this.MONTH_NAMES_LONG,
          weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          shortMonths: this.MONTH_NAMES_SHORT,
          rangeSelectorFrom: "Desde",
          rangeSelectorTo: "Hasta",
          rangeSelectorZoom: "Período",
          downloadPNG: 'Descargar imagen PNG',
          downloadJPEG: 'Descargar imagen JPEG',
          downloadPDF: 'Descargar imagen PDF',
          downloadSVG: 'Descargar imagen SVG',
          printChart: 'Imprimir',
          resetZoom: 'Reiniciar zoom',
          resetZoomTitle: 'Reiniciar zoom',
          thousandsSep: ",",
          decimalPoint: '.'
        }
      });

      this.chartOptions.series = [{
        type: 'line',
        data: this.collectionData,
        name: 'Media',
      },
      ];

      this.updateFlag = true;
      this.chart.redraw();
    }, 2000);

  }

  updateChartColumn() {
    this.chartColumn.showLoading();
    setTimeout(() => {
      this.chartColumn.hideLoading();
      this.chartOptionsColumn.series = [{
        type: 'column',
        data: [this.corrects],
        name: 'Correctas',
        color: 'green'
      }, {
        type: 'column',
        data: [this.incorrects],
        name: 'Incorrectas',
        color: 'red'
      },
      ];

      this.updateFlagColumn = true;
      this.chartColumn.redraw();
    }, 2000);

  }
}
