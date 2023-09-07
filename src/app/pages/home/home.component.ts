import { Funcionario } from 'src/app/models/Funcionarios';
import { FuncionarioService } from './../../services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/components/excluir/excluir.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];

  conlunas = ['Situacao', 'Nome', 'Sobrenome', 'Departamento', 'Ações', 'Excluir'];

  constructor(private funcionarioService: FuncionarioService, private dialog: MatDialog){}

    ngOnInit(): void{
        this.funcionarioService.GetFuncionarios().subscribe(data => {
            const dadosInternos = data.dados;

            dadosInternos.map((item) => {
              item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleDateString('pt-BR');
              item.dataDeAlteracao = new Date(item.dataDeAlteracao!).toLocaleDateString('pt-BR');
            })
            this.funcionarios = data.dados;
            this.funcionariosGeral = data.dados;
        });
    }

    search(event: Event){
      const target = event.target as HTMLInputElement;
      const value = target.value.toLowerCase();

      this.funcionarios = this.funcionariosGeral.filter(funcionario => {
        return funcionario.nome.toLowerCase().includes(value);
      });
    }

    OpenDialog(id: number){
      this.dialog.open(ExcluirComponent, {
        width: '450px',
        height: '450px',
        data:{
          id: id
        }
      });
    }
}
