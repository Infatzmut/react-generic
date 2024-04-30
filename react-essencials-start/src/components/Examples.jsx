import { EXAMPLES } from "../data"
import TabButton from "./TabButton"
import Section from "./Section"

const Examples = ({selectedTopic, onSelect}) => {

    const examples = ["components", "jsx", "props", "state"]
    return (
        <>
        <Section title="Examples" id="examples">
          <menu>
            { examples.map(example => 
              <TabButton 
                key={example} 
                name={example} 
                onClick={onSelect}
                isSelected={selectedTopic === example}> {example}</TabButton>)}
          </menu>
      </Section>
      <div id="tab-content">
          { selectedTopic ? 
          <>
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
              <code>
                {EXAMPLES[selectedTopic].code}
              </code>
            </pre> </> : 
            <p>Please select a topic</p>
          }  
      </div>
      </>
    )
}

export default Examples