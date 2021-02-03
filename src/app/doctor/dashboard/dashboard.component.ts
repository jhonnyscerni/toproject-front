import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexFill,
} from 'ng-apexcharts';
import {DashboardProfissionalService} from "../../services/dashboard-profissional.service";
import {AuthService} from "../../shared/services/auth.service";
import { EChartOption } from 'echarts';
import {Consulta} from "../../models/consulta";
import {EstatisticaStatus} from "../../models/dto/estatistica-status";
import {log} from "util";
import {EstatisticaSexo} from "../../models/dto/estatistica-sexo";

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
};

export type linechartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
};

export type radialChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public areaChartOptions: Partial<areaChartOptions>;
  public radialChartOptions: Partial<radialChartOptions>;

  numberConsultasConfirmadas = 0;
  numberConsultasAgendadas = 0;
  numberConsultasFinalizadas = 0;
  numberConsultasCanceladas = 0;
  numberTotalPacientesCadastrados;

  dados: EstatisticaStatus[] = [];

  dadosSexo: EstatisticaSexo[] = [];


  constructor(
    private dashboarProfissionalService: DashboardProfissionalService,
    private authService: AuthService
  ) {
  }
  profissionalId = this.authService.getUsuarioIdAutenticado();

  getRequestParams() {
    let params = {};
    params[`profissionalId`] = this.profissionalId;
    return params;
  }

  consultasConfirmadas() {
    const params = this.getRequestParams();
    return this.dashboarProfissionalService.countConsultasConfirmadas(params)
      .subscribe(value => {
        this.numberConsultasConfirmadas = value
        //console.log("CONFIRMADA"+this.numberConsultasConfirmadas)
      });
  }

  consultasAgendadas() {
    const params = this.getRequestParams();
    return this.dashboarProfissionalService.countConsultasAgendadas(params)
      .subscribe(value => {
        this.numberConsultasAgendadas = value
        //console.log("AGENDADA"+this.numberConsultasAgendadas)
      });
  }

  consultasFinalizadas() {
    const params = this.getRequestParams();
    return this.dashboarProfissionalService.countConsultasFinalizadas(params)
      .subscribe(value => {
        this.numberConsultasFinalizadas = value
        //console.log("FINALIZADA"+this.numberConsultasFinalizadas)
      });
  }

  consultasCanceladas() {
    const params = this.getRequestParams();
    return this.dashboarProfissionalService.countConsultasCanceladas(params)
      .subscribe(value => {
        this.numberConsultasCanceladas = value
        //console.log("CANCELADA"+this.numberConsultasCanceladas)
      });
  }

  totalPacienteCadastrador() {
    const params = this.getRequestParams();
    return this.dashboarProfissionalService.countPacientesCadastradosAtivado(params)
      .subscribe(value => {
        this.numberTotalPacientesCadastrados = value
      });
  }

  ngOnInit() {
    this.consultasConfirmadas();
    this.consultasAgendadas();
    this.consultasFinalizadas();
    this.consultasCanceladas();
    this.totalPacienteCadastrador();
    this.buscarEstatisticaStatus();
    this.buscarEstatisticaSexo();
  }

  buscarEstatisticaStatus() {
    const params = this.getRequestParams();

    this.dashboarProfissionalService.consultaEstatisticaStatus(params)
      .subscribe(
        dados => {
          this.dados = dados
        }
      );
  }

  buscarEstatisticaSexo() {
    const params = this.getRequestParams();

    this.dashboarProfissionalService.consultaEstatisticaSexo(params)
      .subscribe(
        dados => {
          this.dadosSexo = dados
        }
      );
  }

  /* Pie Chart */
  pie_chart: EChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      data: [
        'HOMEM',
        'MULHER',
      ],
      textStyle: {
        color: '#9aa0ac',
        padding: [0, 5, 0, 5]
      }
    },

    series: [
      {
        name: 'Dados',
        type: 'pie',
        radius: '55%',
        center: ['50%', '48%'],
        data: [
          {
            value: 335,
            name: 'HOMEM'
          },
          {
            value: 310,
            name: 'MULHER'
          }
        ]
      }
    ],
    color: ['#575B7A', '#DE725C']
  };


  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  legendPosition = 'right';
  timeline = true;
  colorScheme = {
    domain: ['#007bff', '#f9483b', '#ff9800', '#53b958']
  };
  colorSchemeSexo = {
    domain: ['#BF4065', '#007bff']
  };
  showLabels = true;

  //



}
