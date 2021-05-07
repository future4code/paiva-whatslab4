import React from 'react';
import './App.css';


class App extends React.Component {

  state = {
    arrayMensagem:[
      {id: 1, usuarioMensagem:'Silvio', mensagem: "Oi!"}
    ],
    inputNome:"",
    inputMensagem: ""

  }

  handleNome = (event) => { //pega o nome do usuario
    this.setState({inputNome: event.target.value}) 
  }

  handleMensagem = (event) => { //pega a mensagem do usuario
    this.setState({inputMensagem: event.target.value})
  }

  enviarMensagem = (event) => { // cria um novo array com informações do novo usuario
    const novaMensagem = {
      id: Math.random(),
      usuarioMensagem: this.state.inputNome,
      mensagem: this.state.inputMensagem
     }
     if( this.state.inputMensagem !== ""  && this.state.inputNome !== ""){ // Se um dos input está vazio, se sim, não envia mensagem
     this.setState({ //arrayMensagem recebe uma cópia do ultimo array com a nova mensagem
       arrayMensagem:[...this.state.arrayMensagem, novaMensagem],
       inputMensagem:  ""
     })
    }
  }
  

  pressEnter = (event) =>{
    if(event.key === 'Enter'){ //Verifica se apertou Enter
     this.enviarMensagem(event) //Envia mensagem apertando enter no input de mensagem
    }
   }
  




  render() {

    const mensagens = this.state.arrayMensagem.map((msg,index) =>{ //transformo o array em um componente
      return(
        <div key = {msg.id}>
          <h1>{msg.usuarioMensagem}</h1>
          <p>{msg.mensagem}</p>

        </div>
      )
    });

    return(
      <div className="App">
        {mensagens}
        <input 
        placeholder = {"Nome"}
        value = {this.state.inputNome}
        onChange = {this.handleNome}
        />
        <input 
        placeholder = {"Enviar Mensagem"}
        value = {this.state.inputMensagem}
        onChange = {this.handleMensagem}
        onKeyPress = {this.pressEnter}
        />
        <button onClick = {this.enviarMensagem} >Enviar Mensagem</button>
      </div>
    );
  }
}

export default App;