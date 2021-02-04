import { Component, OnInit, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts';
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
import {DashboardClinicaService} from "../../services/dashboard-clinica.service";
import {AuthService} from "../../shared/services/auth.service";
import {EstatisticaStatus} from "../../models/dto/estatistica-status";
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
  public linechartOptions: Partial<linechartOptions>;

  dados: EstatisticaStatus[] = [];

  dadosSexo: EstatisticaSexo[] = [];

  numberPacientesAtivo = 0;
  numberProfissionaisAtivo = 0;
  numberConsultasTotais = 0;
  numberConsultasFinalizadas = 0;

  constructor(
    private dashboarClinicaService: DashboardClinicaService,
    private authService: AuthService
  ) {}

  clinicaId = this.authService.getUsuarioIdAutenticado();

  getRequestParams() {
    let params = {};
    params[`clinicaId`] = this.clinicaId;
    return params;
  }

  ngOnInit() {
    this.countPacientesAtivo();
    this.countProfissionaisAtivo();
    this.countConsultasTotais();
    this.countConsultasFinalizadas();
    this.buscarEstatisticaStatus();
    this.buscarEstatisticaSexo();
  }

  countPacientesAtivo() {
    const params = this.getRequestParams();
    return this.dashboarClinicaService.countPacientesAtivo(params)
      .subscribe(value => {
        this.numberPacientesAtivo = value
      });
  }

  countProfissionaisAtivo() {
    const params = this.getRequestParams();
    return this.dashboarClinicaService.countProfissionaisAtivo(params)
      .subscribe(value => {
        this.numberProfissionaisAtivo = value
      });
  }

  countConsultasTotais() {
    const params = this.getRequestParams();
    return this.dashboarClinicaService.countConsultasTotais(params)
      .subscribe(value => {
        this.numberConsultasTotais = value
      });
  }

  countConsultasFinalizadas() {
    const params = this.getRequestParams();
    return this.dashboarClinicaService.countConsultasFinalizadas(params)
      .subscribe(value => {
        this.numberConsultasFinalizadas = value
      });
  }

  buscarEstatisticaStatus() {
    const params = this.getRequestParams();

    this.dashboarClinicaService.consultaEstatisticaStatus(params)
      .subscribe(
        dados => {
          this.dados = dados
        }
      );
  }

  buscarEstatisticaSexo() {
    const params = this.getRequestParams();

    this.dashboarClinicaService.consultaEstatisticaSexo(params)
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
    domain: ['#007bff', '#f9483b', '#ff9800', '#53b958','#BF4065']
  };
  colorSchemeSexo = {
    domain: ['#BF4065', '#007bff']
  };
  showLabels = true;


}
