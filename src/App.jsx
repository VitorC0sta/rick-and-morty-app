import { WrapBox } from './components/WrapBox'
import { ContainerMenu } from './Container.menu'
import { ContainerInfo } from './Container.info'
import { CharacterOption } from './components/Box.character'
import { BoxInfo } from './components/Box.info'
import { DivData } from './components/Div.chardata'
import { DivImg } from './components/Div.img'  
import { useEffect, useState } from 'react'
import { api } from './services/api'


function App() {
  // const [nome, setNome] = useState(0);'
  const [characters, setCharacters] = useState(null); // Lista dos personagens conmsumidos pela API
  const [characterIndex, setCharacterIndex] = useState(1); //Indice selecionado.
  const [character, setCharacter] = useState({}); // Informaç~~oes do personagem em relação ao indice selecionado.

  // useEffect(() => {
  //   api.get('/character/1,3,2,4,5,6').then((response) => {
  //     if(response.data) setCharacters(response.data);
  //     setCharacter(response.data.find(item => item.id === characterIndex))
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }, [])


  // useEffect(() => {
  //   console.log('Carregar toda vez que acontecer alguma mudança na pagina')
  // })

  // useEffect(() => {
  //  if(characters != null) setCharacter(characters.find(item => item.id === characterIndex))
  // }, [characterIndex])

  useEffect(() => { // resgatando 6 personagens da API
    api.get('/character/1,2,3,4,5,6').then((response) => {
      if(response.data != null) setCharacters(response.data); //validação se há algum dado de um personagem.
      const tempCharacter = response.data.find(item => item.id === characterIndex);
      if(characterIndex === 1) setCharacter({...tempCharacter, bgcolor: '#85F217'});
      else if(characterIndex === 2) setCharacter({...tempCharacter, bgcolor: '#FF00EE'});
      else if(characterIndex === 3) setCharacter({...tempCharacter, bgcolor: '#DFFF00'});
      else setCharacter({...tempCharacter, bgcolor: '#17EAF2'});
    })
  }, []); //ao carregar a página.

 useEffect(() => { //Setando o nome do personagem no titulo principal das informações.
    if(characters != null) {
      if(characterIndex === 1) setCharacter({...characters.find(item => item.id === characterIndex), bgcolor: '#85F217'});
      else if(characterIndex === 2) setCharacter({...characters.find(item => item.id === characterIndex), bgcolor: '#FF00EE'});
      else if(characterIndex === 3) setCharacter({...characters.find(item => item.id === characterIndex), bgcolor: '#DFFF00'});
      else setCharacter({...characters.find(item => item.id === characterIndex), bgcolor: '#17EAF2'});
    }
  }, [characterIndex]); //quando alterar o índice do personagem.

  return (
      <WrapBox>
        <ContainerMenu>
          {
            characters != null && 
            <>               
              {characters.map((item, key) => {
                  return (
                    <CharacterOption style={item.id == characterIndex ? {backgroundColor: character.bgcolor, color:"#121212"} : {backgroundColor: "#3A3A3A"} } onClick={() => setCharacterIndex(item.id)} key={key}> {item.name} </CharacterOption>
                  )
                })
              }
            </> 
          }
        </ContainerMenu>
          <ContainerInfo> 
            <BoxInfo>
              <DivData>  
                <h1 style={{color: character.bgcolor}}> Dados do personagem</h1> 
                <h2 ></h2>
              </DivData>
              <DivImg>
                Imagem
              </DivImg>
            </BoxInfo>
            <BoxInfo>
              <h2 style={{color: character.bgcolor}}>Aparições por mês</h2>
              {/* graph */}
            </BoxInfo>
          </ContainerInfo>
      </WrapBox>
  )
}

export default App
