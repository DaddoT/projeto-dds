import React from 'react';

import './styles.css';

import Header from '../Header';


export default function AboutText(props) {

 

  return(
    <div>
      <Header {...props}/>
      
      <div className="dashboardAbout" >
        <div className="img"></div>
        <div className ="box-1">
            <h2>Quem Somos</h2>
            <hr/>
            A Gate Key é a empresa que desenvolve uma solução tecnológica completa de controle de acesso, combinando economia, precisão e segurança.
        
        </div>

        <div className="box-2">
          <h2>Propósito</h2>
          <hr/>
          “Acreditamos que a felicidade é maior quando compartilhada e que o acesso empresarial pode ser mais seguro e agradável. Inovamos para promover o avanço tecnológico através de soluções descomplicadas. Estamos escrevendo a história da evolução dos controles de acessos, melhorando a segurança.”
        </div>
        
        <div className = "box-3">
        
          <h2>Nossa Empresa</h2>
          <hr/>
          A empresa surgiu através da UniFBV, criada para ser uma das iniciativas a serem desenvolvidas no semestre denominado de "projetão",
          atualmente a empresa ainda não possui lucro pois ainda está nos estágios iniciais de seu desenvolvimento, 
          contando com 6 membros na equipe, o negócio visa atender a população a partir do ano de 2021.
        </div>
        
        <div className = "box-4">
          <h2>nosso produto</h2>
          <hr/>
             A GateKey disponibiliza um controle de acesso de clientes para empresariais, 
            a tecnologia é usada para as empresas concederem acesso aos clientes em que irão atender, 
            sem a necessidade de ir para uma fila ao chegar no prédio, 
            apenas com a aproximação do celular na catraca, é feita uma verificação para conceder, 
            ou bloquear o acesso daquele usuário nas instalações do empresarial.
        </div>

        
        
      </div>  
    </div>
  );
}