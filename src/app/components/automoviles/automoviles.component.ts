import { Component, OnInit } from '@angular/core';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Automovil } from '../../models/automovil';
import { AutomovilesService } from '../../services/automoviles.service';

@Component({
  selector: 'app-automoviles',
  templateUrl: './automoviles.component.html',
  styleUrls: ['./automoviles.component.css'],
})
export class AutomovilesComponent implements OnInit {
  TituloAccionABMC = {
    A: '(Agregar)',
    B: '(Eliminar)',
    M: '(Modificar)',
    C: '(Consultar)',
    L: '(Listado)',
  };
  OpcionesUsado = [
    { Id: null, Nombre: '' },
    { Id: true, Nombre: 'SI' },
    { Id: false, Nombre: 'NO' },
  ];
  AccionABMC = 'L'; // inicialmente inicia en el listado de articulos (buscar con parametros)
  Mensajes = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...',
  };
  submitted: boolean = false;
  Items: Automovil[] = null;
  FormRegistro: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private automovilesService: AutomovilesService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormRegistro = this.formBuilder.group({
      Marca: ['', [Validators.required, Validators.maxLength(100)]],
      Modelo: ['', [Validators.required, Validators.maxLength(100)]],
      Anio: [null, [Validators.required, Validators.pattern('[0-9]{1,4}')]],
      FechaAlta: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          ),
        ],
      ],
      Usado: [true, [Validators.required]],
    });
  }
  Buscar() {
    this.automovilesService.get().subscribe((res: any) => {
      this.Items = res;
    });
  }
  Agregar() {
    this.FormRegistro.reset();
    this.AccionABMC = 'A';
    this.submitted = false;
    this.FormRegistro.markAsUntouched();
  }
  Volver() {
    this.AccionABMC = 'L';
  }
  Consultar(item) {
    window.scroll(0, 0);
    const itemCopy = { ...item };
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split('-');
    itemCopy.FechaAlta = arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0];
    this.AccionABMC = 'C';
    this.FormRegistro.patchValue(itemCopy);
  }
  Grabar() {
    this.submitted = true;
    if (this.FormRegistro.invalid) {
      return;
    }
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormRegistro.value };
    console.log(itemCopy);
    //convertir fecha de string dd/MM/yyyy a ISO para que la entienda webapi
    var arrFecha = itemCopy.FechaAlta.substr(0, 10).split('/');
    if (arrFecha.length == 3) {
      itemCopy.FechaAlta = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();
    }
    if (this.AccionABMC == 'A') {
      this.automovilesService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.Buscar();
      });
    }
  }
}
