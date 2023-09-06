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

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.funcionarioService.GetFuncionarioById(id).subscribe((data) => {

      const dadosInternos = data.dados;

      // dadosInternos.map((item) => {
      //   item.dataDeCadastro = new Date().toLocaleDateString('pt-BR');

      // });

      this.funcionario = data.dados;
    })
  }
}
