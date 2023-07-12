import { WrapBox } from './components/WrapBox'
import { ContainerMenu } from './Container.menu'
import { ContainerInfo } from './Container.info'
import { CharacterOption } from './components/Box.character'
import { BoxInfo } from './components/Box.info'
import { DivData } from './components/Div.chardata'
import { DivImg } from './components/Div.img'  
import { useEffect, useState } from 'react'
import { api } from './services/api'
import './styles/style.css'

function App() {
  const [characters, setCharacters] = useState(null); // Lista dos personagens conmsumidos pela API.
  const [characterIndex, setCharacterIndex] = useState(1); //Índice selecionado.
  const [character, setCharacter] = useState({}); // Informações do personagem em relação ao índice selecionado. 

  useEffect(() => { // Resgatando 6 personagens da API.
    api.get('/character/1,2,3,6,16,22').then((response) => {
      if(response.data != null) setCharacters(response.data); //validação se há algum dado de um personagem.
      const tempCharacter = response.data.find(item => item.id === characterIndex);
      if(characterIndex === 1) setCharacter({...tempCharacter, bgcolor: '#85F217'});
      else if(characterIndex === 2) setCharacter({...tempCharacter, bgcolor: '#DFFF00'});
      else if(characterIndex === 3) setCharacter({...tempCharacter, bgcolor: '#FF00EE'});
      else setCharacter({...tempCharacter, bgcolor: '#17EAF2'});
    })
  }, []); //Ao carregar a página.

 useEffect(() => { //Setando o nome do personagem no título principal das informações e cor dos.
    if(characters != null) {
      if(characterIndex === 1) setCharacter({...characters.find(item => item.id === characterIndex), bgcolor: '#85F217'});
      else if(characterIndex === 2) setCharacter({...characters.find(item => item.id === characterIndex), bgcolor: '#DFFF00'});
      else if(characterIndex === 3) setCharacter({...characters.find(item => item.id === characterIndex), bgcolor: '#FF00EE'});
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
                  return (                  //Mudando o background de acordo com o personagem.
                    <CharacterOption style={item.id == characterIndex ? {backgroundColor: character.bgcolor, color:"#121212", fontWeight:"bold"} : {backgroundColor: "#3A3A3A"} } onClick={() => setCharacterIndex(item.id)} key={key}> {item.name} </CharacterOption>
                  )
                })
              }
            </> 
          }
        </ContainerMenu>
          <ContainerInfo> 
            <BoxInfo>
              <DivData>
                {console.log(character)}
                <h1>{character.name}</h1>
                <table>
                  <caption style={{color: character.bgcolor}}>Dados do personagem</caption>
                  <thead>
                    <tr>
                      <th style={{borderRadius:"4px 0px 0px 4px"}}> Status </th>
                      <th> Species </th>
                      <th> Gender </th>
                      <th style={{borderRadius:"0px 4px 4px 0px"}}> Origin </th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr style={{marginTop: "2px"}}>
                      <td style={{borderRadius:"4px 0px 0px 4px"}}> {character.status} </td>
                      <td> {character.species} </td>
                      <td> {character.gender} </td>
                      {
                        characters != null && 
                        <>
                          { characters.map((item,key) => {
                              if(item.id === characterIndex)
                              {
                                const origin = item.origin.name.split(" ");
                                return <td key={key}> {origin[0]} </td> 
                              }
                            })
                          }
                        </>
                      }
                      <td style={{borderRadius:"0px 4px 4px 0px"}}></td>
                    </tr>
                  </tbody>
                </table>
              </DivData>
              <DivImg style={{display: "flex",justifyContent:"center", alignItems: "center"}}>
                <img src={character.image} alt="api.img" style={{borderColor: character.bgcolor, boxShadow: `0px 0px 10px 0.25px ${character.bgcolor}` }}/>
              </DivImg>
            </BoxInfo>
            <BoxInfo>
              <h2 style={{color: character.bgcolor, marginLeft:"5%"}}>Aparições por mês</h2>
              {/* graph */}
            </BoxInfo>
          </ContainerInfo>
      </WrapBox>
  )
}

export default App
