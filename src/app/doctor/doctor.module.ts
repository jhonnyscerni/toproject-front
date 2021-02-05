import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ChartsModule as chartjsModule} from 'ng2-charts';
import {NgxEchartsModule} from 'ngx-echarts';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {NgApexchartsModule} from 'ng-apexcharts';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {UserRoutingModule} from './doctor-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ProfissionalProfileComponent} from "./profissional-profile/profissional-profile.component";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [DashboardComponent, ProfissionalProfileComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        chartjsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        PerfectScrollbarModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        NgApexchartsModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatSortModule,
        MatTabsModule,
        MatMenuModule,
        MatDatepickerModule,
        MatTableModule,
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule,
        MatTooltipModule,
        MatRadioModule,
        DragDropModule,
        NgxChartsModule,

        HttpClientModule,
        SharedModule,
    ],
})
export class UserModule { }
