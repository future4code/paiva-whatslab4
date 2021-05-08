import React from 'react';
import styled from 'styled-components'

 const AppContainer = styled.div`
  border: 1px solid green;
  height: 100vh;
  box-sizing: border-box;
  margin: auto;
  width: 600px;
  display: flex;
  flex-direction: column;
  `
  const MensagemContainer = styled.div`
    box-sizing: border-box;
    flex-grow: 1;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;
    p {
      margin: 4px;
    }
  `
  const InputContainer = styled.div`
    display: flex;
  `
  const NomeInput = styled.input`
    width: 100px;
    padding: 4px;
  `
  const MensagemInput = styled.input`
    flex-grow: 1;
    padding-left: 4px;
  `

class App extends React.Component {

  state = {
    arrayMensagem:[],
    inputNomeValue:"",
    inputMensagemValue: ""

  }

  handleNome = (event) => { //pega o nome do usuario
    this.setState({inputNomeValue: event.target.value}) 
  }

  handleMensagem = (event) => { //pega a mensagem do usuario
    this.setState({inputMensagemValue: event.target.value})
  }

  enviarMensagem = (event) => { // cria um novo array com informações do novo usuario
    const novaMensagem = {
      usuarioMensagem: this.state.inputNomeValue,
      mensagem: this.state.inputMensagemValue
     }
     if( this.state.inputMensagemValue !== ""  && this.state.inputNomeValue !== ""){ // Se um dos input está vazio, se sim, não envia mensagem
     this.setState({ //arrayMensagem recebe uma cópia do ultimo array com a nova mensagem
       arrayMensagem:[novaMensagem, ...this.state.arrayMensagem],
       inputMensagemValue:  "",
     })
    }
  }
  
  pressEnter = (event) =>{
    if(event.key === 'Enter'){ //Verifica se apertou Enter
     this.enviarMensagem(event) //Envia mensagem apertando enter no input de mensagem
    }
   }

   deletarMensagem = (index) => {
     const novoArrayMensagem = [...this.state.arrayMensagem]
     novoArrayMensagem.splice(index, 1);
     this.setState({arrayMensagem: novoArrayMensagem})
   }
  
  render() {

    const mensagens = this.state.arrayMensagem.map((msg,index) =>{ //transformo o array em um componente
      return(
        <div key = {index} onDoubleClick={ () => this.deletarMensagem(index)}>
          <p><strong>{msg.usuarioMensagem}</strong>: {msg.mensagem}</p>

        </div>
      )
    });

    return(
      <AppContainer>
        <MensagemContainer>
        {mensagens}
        </MensagemContainer>

        <InputContainer>
        <NomeInput 
        placeholder = {"Nome"}
        value = {this.state.inputNomeValue}
        onChange = {this.handleNome}
        />
        <MensagemInput 
        placeholder = {"Mensagem"}
        value = {this.state.inputMensagemValue}
        onChange = {this.handleMensagem}
        onKeyPress = {this.pressEnter}
        />
        <button onClick = {this.enviarMensagem} >Enviar</button>
        </InputContainer>

      </AppContainer>
    );
  }
}

export default App;
