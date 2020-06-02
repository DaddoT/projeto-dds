import React from 'react';
import './styles.css';
import Header from '../Header';

export default function AboutText(props) {
    return(
        <div>
          <Header {...props}/>

          <div className="dashboardAbout" >
              <div className="box-1">
                <h2>Nosso Produto:</h2>
                A GateKey disponibiliza um controle de acesso de clientes para empresariais, 
                a tecnologia é usada para as empresas concederem acesso aos clientes em que irão atender, 
                sem a necessidade de ir para uma fila ao chegar no prédio, 
                apenas com a aproximação do celular na catraca, é feita uma verificação para conceder, 
                ou bloquear o acesso daquele usuário nas instalações do empresarial.
              </div>
              <hr className="hr"/>
              <div className="box-2">
                <h2>Nossa Empresa:</h2>
               A empresa surgiu através da UniFBV, criada para ser uma das iniciativas a serem desenvolvidas no semestre denominado de "projetão",
              atualmente a empresa ainda não possui lucro pois ainda está nos estágios iniciais de seu desenvolvimento, 
              contando com 6 membros na equipe, o negócio visa atender a população a partir do ano de 2021.
              </div>
              <hr className="hr"/>
              <div className="box-3">
                <h1>Quem Somos:</h1>
                A equipe GateKey consiste em 6 integrantes, todos alunos da UniFBV desenvolvendo a iniciativa de "projetão", sendo eles: <br />
                * Arthur Lins <br />
                * Daddo Cavalcanti <br />
                * Douglas José <br />
                * Jamerson Souza <br />
                * João Felipe <br />
                * João Viktor Lima
              </div>
          </div> 
        </div>
    );
}