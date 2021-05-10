import React from 'react';
import styled from 'styled-components'

 const AppContainer = styled.div`
  border: 1px solid green;
  min-height: 100vh;
  box-sizing: border-box;
  margin: auto;
  width: 600px;
  display: flex;
  flex-direction: column;
  background-color: #ECE5DD;
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
    padding: 1.5vw;
    height: 3vh;
  `
  const NomeInput = styled.input`
    width: 100px;
    margin-right: 10px;
  `
  const MensagemInput = styled.input`
    flex-grow: 1;
    margin-right: 10px;

  `

  const MensagemEu = styled.div`
    display:flex;
    justify-content: flex-end;
    margin: 5px;
  `

  const TextoMsgEU = styled.div`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    width: 40%;
    word-break: break-all;
    background-color: #dcf8c6;
    padding: 1rem;
    border-radius: 10px;
    font-weight: 450;
    line-height: 1.3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  `
  
  const MensagemRecebida = styled.div`
    display:flex;
    justify-content: flex-start;
    margin: 5px;
  `

  const TextoRecebido = styled.div`
    display:flex;
    align-items:center;
    width: 40%;
    word-break: break-all;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 10px;
    font-weight: 450;
    line-height: 1.3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);

    strong{
    color: #9AAC8C;
    font-size: 0.8em;
    font-weight: 600;
    margin-bottom: 0.2em;
    line-height: 1.3;
    }
  `
  

  const ApagarBtn = styled.button`
    margin: 0;
    padding: 0;
    width: auto;
    font-size: medium;
    margin-left: 10px;
    margin-bottom: 36px;
    border: none;
    background: none;

    &:hover{
      cursor: pointer;
      color: red;
      }
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
        if(msg.usuarioMensagem.toLowerCase() === "eu"){ // Se usuario = eu,  mensagem recebe MensagemEu 
          return(<div key = {index}> 
            <MensagemEu>
              <TextoMsgEU>{msg.mensagem}</TextoMsgEU>
              <ApagarBtn onDoubleClick=
              {()=>this.deletarMensagem(index)}>x
              </ApagarBtn>
            </MensagemEu>

        </div>
          )
        }
        return(<div key = {index}> 
            <MensagemRecebida>
              <TextoRecebido>

              <p><strong>{msg.usuarioMensagem}</strong><br/>{msg.mensagem}</p>

              </TextoRecebido>
              <ApagarBtn onDoubleClick=
              {()=>this.deletarMensagem(index)}>x
              </ApagarBtn>
            </MensagemRecebida>

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
