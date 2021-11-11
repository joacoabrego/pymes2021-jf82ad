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
      Anio: [null, [Validators.required, Validators.pattern('[0-9]')]],
      FechaAlta: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
          ),
        ],
      ],
      Usado: [null, [Validators.required]],
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
  Consultar(item) {}
  Grabar() {}
}
