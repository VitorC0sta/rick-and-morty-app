import { WrapBox } from './components/WrapBox'
import { ContainerMenu } from './Container.menu'
import { ContainerInfo } from './Container.info'
import { CharacterOption } from './components/Box.character'

function App() {

  return (
      <WrapBox>
        <ContainerMenu>
          <CharacterOption>character</CharacterOption>
          <CharacterOption>character</CharacterOption>
          <CharacterOption>character</CharacterOption>
          <CharacterOption>character</CharacterOption>
          <CharacterOption>character</CharacterOption>
        </ContainerMenu>
        <ContainerInfo> Graphic </ContainerInfo>
      </WrapBox>
  )
}

export default App
