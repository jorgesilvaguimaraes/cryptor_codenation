import React, { Component } from 'react';

import Dados from './download/answer.json';
import sha1 from 'js-sha1';

class App extends Component {

  headledClick = (event)=>{
    event.preventDefault();

    // Consumindo a api da codenation
    const dados = Dados;

    // Criando o arquivo no localStory answer com os dados recuperados pela api da codenation
    localStorage.setItem('dados', JSON.stringify(dados));

    
    // Recuperando os dados do localStory para pode descriptografar
    const dataUser = JSON.parse(localStorage.getItem('dados'));
    
    //Realizar a descriptografia
    const message = dataUser['cifrado'].toString().toLocaleLowerCase();
    const number = dataUser['numero_casas'];
    let   new_message = ''
    let   new_letter = '';
    
    for (const letter of message.toString()) {      

      if(letter.search(/^[a-z]/g))
      {
        new_message += letter;        
      }else{      
        new_letter = String.fromCodePoint((letter.codePointAt()+number));                  
        new_message += new_letter;
      }
    }

    dataUser['decifrado'] = new_message;
    dataUser['resumo_criptografico'] = sha1( new_message);
    const new_dataUser = JSON.stringify(dataUser);

    alert(new_message);    
    //Salvar a no arquivo answer 
    localStorage.setItem('new_dados', new_dataUser);    

    console.log(JSON.parse(localStorage.getItem('new_dados')));
    //Enviar um post com os dados do answer


  }

  render() {

    return (
      <div className="App">

        <header className="App-header">          
          <p>Criptor</p>          
        </header>
        
        <form>
          <input name="btn_click" id="btn_click" type="submit" value="Click" onClick={this.headledClick}/>
        </form>
        
       
      </div>
    );

  }
}

export default App;
