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

  ngOnInit() {}
  Buscar() {}
  Agregar() {}
  Consultar() {}
}
