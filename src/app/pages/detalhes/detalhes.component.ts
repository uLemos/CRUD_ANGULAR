import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit{

  constructor(private funcionarioService: FuncionarioService, private router: Router, private route: ActivatedRoute){}

  funcionario?: Funcionario;
  id!:number;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.funcionarioService.GetFuncionarioById(this.id).subscribe((data) => {

      const dadosInternos = data.dados;

      dadosInternos.dataDeCriacao = new Date(dadosInternos.dataDeCriacao).toLocaleDateString('pt-BR');
      dadosInternos.dataDeAlteracao = new Date(dadosInternos.dataDeAlteracao).toLocaleDateString('pt-BR');

      dadosInternos

      this.funcionario = data.dados;
    })
  }

  InativaFuncionario(){
    this.funcionarioService.InativaFuncionario(this.id).subscribe((data)=> {
      this.router.navigate(['']);
    });
  }
}
