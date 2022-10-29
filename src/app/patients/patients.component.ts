import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../services/patients.service';
import { Patients } from '../interfaces/Patients';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  datosPatients: any;
  date: Date = new Date();
  fileName = 'ExcelSheet.xlsx';
  filterPost = '';
  myForm!: FormGroup;



  constructor(private fb: FormBuilder, private PatientsService: PatientsService, private modalService: NgbModal, config: NgbModalConfig,
  ) { }


  arrayPatients = new Array<Patients>();
  ngOnInit(): void {
    this.myForm = this.fb.group({
      nmid: [''],
      nomespecie: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      especie: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      raza: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      fechanaci: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      tipoid: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      iddue: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      nomdue: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      ciudad: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      fecharegis: ['', Validators.required],

    })


    this.PatientsService.getPatients().subscribe(datos => {
      this.datosPatients = datos.data;
      console.log(datos);
    });

  }
  open(content: any) {
    this.myForm.reset();
    this.modalService.open(content);
  }
  openedid(content: any) {

    this.modalService.open(content);
  }
  editar(datos: {
    nmid: any; nomespecie: any; especie: any; raza: any; fechanaci: any;
    tipoid: any; iddue: any; nomdue: any; ciudad: any; direccion: any; telefono: any; fecharegis: any;
  }) {
    this.myForm.setValue({
      nmid: datos.nmid,
      nomespecie: datos.nomespecie,
      especie: datos.especie,
      raza: datos.raza,
      fechanaci: datos.fechanaci,
      tipoid: datos.tipoid,
      iddue: datos.iddue,
      nomdue: datos.nomdue,
      ciudad: datos.ciudad,
      direccion: datos.direccion,
      telefono: datos.telefono,
      fecharegis: datos.fecharegis,

    })
  }

  guardar(form: FormGroup) {
    if (this.myForm.valid) {
      if (form.value.nmid && form.value.nmid !== 0) {
        this.Actualizar(form);
        return;
      }

      this.PatientsService.create(form.value).subscribe(
        data => {
          alert("El paciente se ha creado correctamente!");
          this.myForm.reset();
          this.refresh();
        }
      )

    }

  }
  eliminar(nmid: number) {
    this.PatientsService.delete(nmid)
      .subscribe(datos => {
        this.myForm
        alert("Se elimino con exito!!!")
        this.refresh();

      })

  }
  Actualizar(form: FormGroup) {
    this.PatientsService.update(form.value)
      .subscribe(data => {
        alert("Se actualizó con exito!!!")
        this.refresh();
      });

  }
  errorbutton() {
    if (this.myForm.invalid) {
      alert("Debes llenar todos los campos!")
      return;
    }
  }
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  refresh() {
    this.PatientsService.getPatients().subscribe(datos => {
      this.datosPatients = datos.data;
      console.log(datos);
    });
  }

}
