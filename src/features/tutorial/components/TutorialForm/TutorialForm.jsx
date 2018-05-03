import React from 'react'
import styles from './TutorialForm.scss'

class TutorialForm extends React.Component {
  render() {
    const userInput = this.props.userInput

    return (
      <div className={styles.container}>
        <div className={`${styles.tutorialContainer} ${styles.fixedTutorial}`}>
          <div className={styles.header}>
            {this.props.content['header']}
          </div>
          <div className={styles.list}>
            <table className={styles.listItemContainer}>
              {this.props.content['steps'].map(function (contentLine, i){
                let title = contentLine['title']
                if (contentLine['type']) {
                  let replacement = userInput[contentLine['type']]
                  if ('index' in contentLine){
                    replacement = replacement[contentLine['index']]
                  }
                  title = contentLine['title'].replace('STRING', replacement['alias'])
                }
                let rows = [
                  <tr key={`item-title-${i}`}>
                    <td className={styles.listBullet}>{i+1}</td>
                    <td>{title}</td>
                  </tr>
                ]
                if (contentLine['description']) {
                  let descriptionResult = []
                  contentLine['description'].forEach( (descriptionLine, j) => {
                    let description = descriptionLine
                    if (description['line']) { description = description['line'] }

                    if (descriptionLine['type']) {
                      let replacement = userInput[descriptionLine['type']] || descriptionLine['type']
                      if ('index' in descriptionLine){
                        replacement = replacement[descriptionLine['index']]
                      }

                      if (replacement.hasOwnProperty('alias')) {
                        replacement = replacement['alias'] || ''
                      }

                      description.split('STRING').forEach( (item, k, arr) => {
                        descriptionResult.push(item)
                        let replacementText = k < arr.length - 1 && <span key={`item-input-${j}-${k}`} className={styles.userInputData}>"{replacement}"</span>
                        descriptionResult.push(replacementText)
                      })
                    } else {
                      descriptionResult.push(description)
                    }
                  })
                  rows.push(<tr key={`item-description-${i}`} className={styles.listItemDescription}>
                    <td></td>
                    <td>{descriptionResult}</td>
                  </tr>)
                }

                return <tbody key={`item-${i}`} className={styles.listItemGroup}>{rows}</tbody>
              })}
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default TutorialForm
