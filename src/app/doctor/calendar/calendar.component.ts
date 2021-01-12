import { Consulta } from './../../models/consulta';
import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Calendar } from './calendar.model';
import { MatRadioChange } from '@angular/material/radio';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { CalendarService } from './calendar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import esLocale from '@fullcalendar/core/locales/es';
import ptLocale from '@fullcalendar/core/locales/pt';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseFormComponent implements OnInit {
  @ViewChild('calendar', { static: false })

  calendar: Consulta | null;
  dialogTitle: string;
  calendarData: any;
  locales = [esLocale, ptLocale];


  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
  calendarWeekends = true;
  @ViewChild('callAPIDialog', { static: false }) callAPIDialog: TemplateRef<any>;
  calendarEvents



  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar,

    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private consultaService: ConsultaService,
  ) {
    super();
    this.dialogTitle = 'Adicionar Novo Compromisso';
    this.calendar = new Consulta();

  }

  profissional = this.authService.getUsuarioIdAutenticado();

  getRequestParams() {
    let params = {};
    params[`profissional`] = this.profissional;
    return params;
  }

  public ngOnInit(): void {
   
    this.listarConsultas();
    // criar FORM
    this.cadastroForm = this.fb.group({
      id: [''],
      paciente: this.fb.group({
        id: ['', Validators.required]
      }),
      profissional: this.fb.group({
        id: [this.profissional]
      }),
      dataHora: [],
      localDeAtendimento: ['', [Validators.required]],
      procedimentoEnum: ['', [Validators.required]],
      statusConsultaEnum: [''],
      convenioEnum: ['', [Validators.required]],
      observacoes: ['', [Validators.required]],
    });
  }

  listarConsultas(){
    const params = this.getRequestParams()

    this.consultaService.listSearchList(params)
      .subscribe(
        consultas => {
          this.calendarEvents = consultas
          
        }
      );
  }

  addNewEvent() {

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result === "submit") {
        this.calendarData = this.calendarService.getDialogData();
        console.log(this.calendarData)

        // this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        //   id: this.calendarData.id,
        //   title: this.calendarData.title,
        //   start: this.calendarData.startDate,
        //   end: this.calendarData.endDate,
        //   className: this.calendarData.category,
        //   groupId: this.calendarData.category,
        //   details: this.calendarData.details,
        // })
        this.listarConsultas()
        this.cadastroForm.reset();
      }
    });
  }
  eventClick(consulta) {
    const calendarData: any = {
      id: consulta.event.id
    };


    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: calendarData,
        action: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "submit") {
        //this.calendarData = this.calendarService.getDialogData();
        // this.calendarEvents.forEach(function (element, index) {
        //   if (this.calendarData.id === element.id) {
        //     this.editEvent(index, this.calendarData);
        //   }
        // }, this);
        this.listarConsultas();
        // this.showNotification(
        //   'black',
        //   'Edição efetuada com Sucesso...!!!',
        //   'bottom',
        //   'center'
        // );
        this.cadastroForm.reset();
      } else if (result === "delete") {
        // this.calendarData = this.calendarService.getDialogData();
        // this.calendarEvents.forEach(function (element, index) {
        //   if (this.calendarData.id === element.id) {
        //     this.filterEvent(element);
        //   }
        // }, this);
        this.listarConsultas()
        // this.showNotification(
        //   'snackbar-danger',
        //   'Consulta Excluida com Sucesso...!!!',
        //   'bottom',
        //   'center'
        // );
      }
    });
  }


  editEvent(eventIndex, calendarData) {
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    // singleEvent.title = calendarData.title;
    // singleEvent.start = calendarData.startDate;
    // // singleEvent.end = calendarData.endDate;
    //  singleEvent.className = this.getClassNameValue("AGENDADO");
    // // singleEvent.groupId = calendarData.category;
    // singleEvent.details = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
  }
  handleEventRender(info) {
    // console.log(info)
    // this.todaysEvents = this.todaysEvents.concat(info);
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


  getClassNameValue(status) {
    let className: string;

    if (status === "CONFIRMADO")
      className = "fc-event-success"
    else if (status === "AGENDADO")
      className = "fc-event-warning"
    else if (status === "ESPERANDO")
      className = "fc-event-primary"
    else if (status === "CANCELADO")
      className = "fc-event-danger"
    else if (status === "REAGENDADO")
      className = "fc-event-info"

    return className;
  }
  
}

