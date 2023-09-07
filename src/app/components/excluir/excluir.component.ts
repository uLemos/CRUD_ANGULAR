import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css'],
})
export class ExcluirComponent implements OnInit{

  constructor(private funcionarioService: FuncionarioService, private router: Router, private route: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ref: MatDialogRef<ExcluirComponent>
  ){}

  inputData: any;
  funcionario!: Funcionario;

ngOnInit(): void {
  this.inputData = this.data;
  this.funcionarioService.GetFuncionarioById(this.inputData.id).subscribe((data) => {
    this.funcionario = data.dados;
  });
}

  DeleteFuncionario(){
    this.funcionarioService.DeleteFuncioario(this.inputData.id).subscribe((data) => {
      this.ref.close();
      window.location.reload();
    });
  }

  VoltarClose(){
    this.ref.close();
  }
}
